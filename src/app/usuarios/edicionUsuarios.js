import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';

const URI = process.env.REACT_APP_API_URL+'usuario'
const URIemp= process.env.REACT_APP_API_URL+'afiliada'

const CompEdicionUsuario = () => {
    const navigate =  useNavigate();//metodo para redireccionar
    const id = useParams();//metodo para traer el id de los parametros desde la URL

    //estado para pestañas
    const [tabActiva, setTabActiva]=useState(1)

    const [empresasList, setEmpresasList]=useState([])

    //metodo para llamar a la lista de empresas
    const llamarEmpresas=async()=>{
        await axios.post(URIemp, 
          {'opcion':0
          })
          .then(response=>{
            setEmpresasList(response.data)
          })
          .catch(error=>{
            console.log(error);
          })
        }

        //options y estado del Select

    const empresas=empresasList.map(elemento=>(
      {value: elemento.idAfiliada,
      label: `${elemento.nombre}`
      }
    ))

    const validarCorreo = async(e) => {
        try {
          var respuesta = await axios.post(URI, 
          {'opcion':3,
          'correo': e          
          })
          if(respuesta.data.length===0){
            console.log("Correo válido")
          }else{
            console.log("Correo inválido")
          }
        } catch (error) {
            console.log(error);
        }
      }

      const [seleccionadas, setSeleccionadas] = useState([])


        //metodo para traer la info de la API
        const getInfo = async() => {
            try {
            const InfoUsuario = await axios.post(URI, 
                {'opcion':1,
                'id':id.id
                })
            if(InfoUsuario.data[0].length===0){
                navigate('/dashboard')
            }else{
                return InfoUsuario.data[0]
            }
            } catch (error) {
            console.log(error)
            }
        }

        const desplegarInfo = async() =>{
           const InfoUsuario = await getInfo()
           document.getElementById('nombre').value=InfoUsuario.nombre
           document.getElementById('apellido').value=InfoUsuario.apellido
           document.getElementById('correo').value=InfoUsuario.correo
           document.getElementById('Rol').value=InfoUsuario.rol
           document.getElementById('estado').value=InfoUsuario.estado
        }

      //metodo para submit final
        const submitInfoUsuario = async(e) => {
        e.preventDefault();
        var conf = window.confirm('La informacion será cambiada permanentemente.\nContinuar?')
        if (conf){
        try {
            await axios.post(URI, 
                {'opcion':5,
                'nombre':document.getElementById('nombre').value,
                'apellido':document.getElementById('apellido').value,
                'correo':document.getElementById('correo').value,
                'rol':document.getElementById('Rol').value,
                'estado':document.getElementById('estado').value,
                'id':id.id
                })
                window.alert('Usuario modificado exitosamente')
                navigate('/administracion/usuarios')
        } catch (error) {
            console.log(error)
        }
        }
      }

      useEffect(()=>{
        document.title = 'Editar Usuario';
        //llamarEmpresas();
        desplegarInfo()
      },[])

      return (
        <div> 
          
            <center> <h1>Editar Usuario</h1> </center>
            <hr size="8px" color="white" />
            <div className="card">
            <div className="card-body">
            <Tabs
              activeKey={tabActiva}
              id="tabEmpresa"
              className="mb-3"
              onSelect={(key) => setTabActiva(key)}
            >
                <Tab eventKey={1} title="Datos Usuario" disabled>
                <div className="col-12 grid-margin">
            
            <Form className="form-crear-empresa" onSubmit={submitInfoUsuario}>
              
                <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Nombre:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="nombre" required/>
                    </div>
                  </Form.Group>
                </div>
                {//no estoy seguro de si será necesario modificar empresas

                /* <div className="col-md-6">
                <Form.Group className="row">
                <label className="col-sm-3 col-form-label">Empresa:</label>
                <div className="col-sm-9">
                  <Select
                    isMulti= {true}
                    classNamePrefix='seleccion'
                    id="seleccionEmpresa"
                    options={empresas}
                    placeholder="Seleccionar"
                    noOptionsMessage={()=>"No hay opciones"}
                    onChange={e=>setSeleccionadas(e)}
                    >
                  </Select>
                  </div>
                </Form.Group>
                </div> */}
                </div>
                <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Apellido:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="apellido" required/>
                    </div>
                  </Form.Group>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Correo:</label>
                    <div className="col-sm-9">
                    <Form.Control type="input" id="correo" onBlur={e=>validarCorreo(e.target.value)} required/>
                    </div>
                  </Form.Group>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Rol:</label>
                    <div className="col-sm-9">
                    <select id="Rol">
                        <option value="0">Administrador del sistema</option>
                        <option value="1">Operaciones Rescobranzas</option>
                        <option value="2">Administrador</option>
                        <option value="3">Funcionario</option>
                        <option value="4">Consulta</option>
                    </select>
                    </div>
                  </Form.Group>
                </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Estado:</label>
                    <div className="col-sm-9">
                    <select id="estado">
                        <option value="0">Inactivo</option>
                        <option value="1">Activo</option>
                    </select>
                    </div>
                  </Form.Group>
                </div>
                </div>
                <div className="row justify-content-end">
                <button type="submit" className="btn btn-warning btn-fw" >
                    Modificar Usuario
                </button>
                </div>
            </Form>
            </div>
            </Tab>
            </Tabs>
            </div>
            </div>        
        </div>
    )
}

export default CompEdicionUsuario