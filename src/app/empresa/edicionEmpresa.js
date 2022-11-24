import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import Select from 'react-select'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import CompListaContactosEditar from './listaContactosEditar';
import CompListaRequisitosEditar from './listaRequisitosEditar';

const URIpaises = process.env.REACT_APP_API_URL+'paises-ciudades'
const URIemp = process.env.REACT_APP_API_URL+'afiliada'

const CompEdicionEmpresa = () => {
    
    const navigate =  useNavigate();//metodo para redireccionar
    const id = useParams();//metodo para traer el id de los parametros desde la URL
    const date = new Date()

    const [infoGeneral, setInfoGeneral] = useState([])
    const [contactos,setContactos] = useState([]) //estados para extraer la informacion del componente hijo
    const [requisitos,setRequisitos] = useState([])//estados para extraer la informacion del componente hijo

    //variables para guardar los ids de las direcciones
    const [valuePais, setValuePais] = useState('')
    const [valueProvincia, setValueProvincia] = useState('')
    const [valueCiudad, setValueCiudad] = useState('')

    //variables para guardar los labels de las direcciones
    const [labelPais, setLabelPais] = useState('')
    const [labelProvincia, setLabelProvincia] = useState('')
    const [labelCiudad, setLabelCiudad] = useState('')

    //variables para guardar los datos checkbox del sri
    const [contEspecial, setcontEspecial] = useState(0)
    const [microempresa, setMicroempresa] = useState(0)
    const [rimpe, setRimpe] = useState(0)
    const [agRetencion, setAgRetencion] = useState(0)
    const [obContabilidad, setObContabilidad] = useState(0)
    //metodo para el cambio de los check
    const handleCheckChange = (e, idcheckbox, setidcheckbox) => {
        if(idcheckbox===0){
        setidcheckbox(1)
        }else{
        setidcheckbox(0)
        }
    }

    //creacion de estados de los paises,etc
    const [paisesList, setPaisesList]=useState([])
    const [provinciasList, setProvinciasList]=useState([])
    const [ciudadesList, setCiudadesList]=useState([])

    //estado para pestañas
    const [tabActiva, setTabActiva]=useState(1)

    //metodo para las ciudades-paises
    const llamarPaises=async()=>{
        await axios.post(URIpaises, 
        {'opcion':0
        })//llamado a la api para consultar los paises
        .then(response=>{
            setPaisesList(response.data.Paises)
            
        })
        .catch(error=>{
            console.log(error);
        })
        }

    //metodo para seleccionar provincias
    const llamarProvincias=async(e)=>{
        setValuePais(e)
        await axios.post(URIpaises, 
        {'opcion':1,
        'idPais':e
        })//llamado a la api para consultar las provincias
        .then(response=>{
            setProvinciasList(response.data.Provincias)
            
        })
        .catch(error=>{
            console.log(error);
        })
    }
    //metodo para seleccionar ciudades
    const llamarCiudades=async(e)=>{
        setValueProvincia(e)
        await axios.post(URIpaises, 
        {'opcion':2,
        'idProvincia':e
        })//llamado a la api para consultar las Ciudades
        .then(response=>{
        setCiudadesList(response.data.Ciudades)
        
        })
        .catch(error=>{
        console.log(error);
        })
    }

    const paises=paisesList.map(elemento=>(
        {value: elemento.idPais,
        label: `${elemento.nombre}`,
        }
      ))
    
    const provincias=provinciasList.map(elemento=>(
        {value: elemento.idProvincia,
        label: `${elemento.nombre}`
        }
      ))
    
    const ciudades=ciudadesList.map(elemento=>(
        {value: elemento.idCiudad,
        label: `${elemento.nombre}`
        }
      ))


    //metodo para editar la info y subir al backend
    const handleEditarAfiliada=async()=>{
        try {
        await axios.post(URIemp, 
            {'opcion': 3, 
            'nombre':document.getElementById('nombreEmpresa').value,
            'nombre_comercial':document.getElementById('nombreComercial').value,
            'ruc':document.getElementById('RUC').value,
            'idPais':valuePais,
            'idProvincia':valueProvincia,
            'idCiudad':valueCiudad,
            'direccion':document.getElementById('direccion').value,
            'telefono1':document.getElementById('telefono1').value,
            'telefono2':document.getElementById('telefono2').value,
            'celular1':document.getElementById('celular1').value,
            'email1':document.getElementById('email1').value,
            'email2':document.getElementById('email2').value,
            'representante':document.getElementById('representante').value,
            'ciRepresentante':document.getElementById('CIrepresentante').value,
            'fechaCreacion':(date.getFullYear())+'-'+(date.getMonth()+1)+'-'+(date.getDate()),
            'contribuyenteEspecial':contEspecial,
            'codigoContribuyente':document.getElementById('codContribuyente').value,
            'microempresa':microempresa,
            'notamicroempresa':document.getElementById('notaMicroempresa').value,
            'rimpe':rimpe,
            'notaRimpe':document.getElementById('notaRimpe').value,
            'agenteRetencion':agRetencion,
            'nResolucion':document.getElementById('nResolucion').value,
            'obligadaCont':obContabilidad,
            'tipoFirma':document.getElementById('tipoFirma').value,
            'Imagen':'',
            'estado':document.getElementById('estado').value,
            'idAfiliada':id.id,
          })
        } catch (error) {
        console.log(error);
        }
    }

    //metodo para traer la info de la API
    const getInfo = async() => {
      try {
        const InfoAfiliada = await axios.post(URIemp, 
          {'opcion':1,
          'idAfiliada':id.id
          })
        if(InfoAfiliada.data[0].length===0){
            navigate('/dashboard')
        }else{
          return InfoAfiliada
        }
      } catch (error) {
        console.log(error)
      }
    }

    //metodo para extraer el label de los paises, provincias, ciudades
    const getLabels = async(idPais, idProvincia, idCiudad) => {
      try {
        const labelPais = await axios.post(URIpaises, 
          {'opcion':3,
            'idPais':idPais
          })
        const labelProvincia = await axios.post(URIpaises, 
          {'opcion':4,
            'idProvincia':idProvincia
          })
        const labelCiudad = await axios.post(URIpaises, 
          {'opcion':5,
            'idCiudad':idCiudad
          })
          
          setLabelPais(labelPais.data.pais[0].nombre)
          setLabelProvincia(labelProvincia.data.provincia[0].nombre)
          setLabelCiudad(labelCiudad.data.ciudad[0].nombre)

        return [labelPais.data.pais[0].nombre,labelProvincia.data.provincia[0].nombre,labelCiudad.data.ciudad[0].nombre]
      } catch (error) {
        console.log(error)
      }
    }

    //metodo para cambiar los checkbox con la info
    const cambiarCheckbox = (valor, id) => {
      if(valor===1){
      document.getElementById(id).checked=true
      }else{
      document.getElementById(id).checked=false
      }
    }
    

    //metodo para desplegar la info de la API en los formularios
    const desplegarInfo = async() => {
      try{
      const InfoAfiliada = await getInfo();
      const info1 = InfoAfiliada.data[0];
      document.getElementById('nombreEmpresa').value=info1[0].nombre
      document.getElementById('nombreComercial').value=info1[0].nombre_comercial
      document.getElementById('RUC').value=info1[0].RUC

      //apartado para los select de direccion
      llamarPaises();
      setValuePais(info1[0].idPais)
      llamarProvincias(info1[0].idPais)
      setValueProvincia(info1[0].idProvincia)
      llamarCiudades(info1[0].idProvincia)
      setValueCiudad(info1[0].idCiudad)
      const labels=await getLabels(info1[0].idPais, info1[0].idProvincia, info1[0].idCiudad)
      document.getElementsByClassName('seleccionPais__single-value')[0].innerHTML=labels[0]
      document.getElementsByClassName('seleccionProvincia__single-value')[0].innerHTML=labels[1]
      document.getElementsByClassName('seleccionCiudad__single-value')[0].innerHTML=labels[2]
      ///////////

      document.getElementById('direccion').value=info1[0].direccion
      document.getElementById('telefono1').value=info1[0].telefono1
      document.getElementById('telefono2').value=info1[0].telefono2
      document.getElementById('celular1').value=info1[0].celular1
      document.getElementById('email1').value=info1[0].email1
      document.getElementById('email2').value=info1[0].email2
      document.getElementById('representante').value=info1[0].representante
      document.getElementById('CIrepresentante').value=info1[0].ciRepresentante

      //seccion de los checkbox
      setcontEspecial(info1[0].contribuyenteEspecial)
      cambiarCheckbox(info1[0].contribuyenteEspecial, "contEspecial")
      document.getElementById('codContribuyente').value=info1[0].codigoContribuyente
      setMicroempresa(info1[0].microempresa)
      cambiarCheckbox(info1[0].microempresa, "microempresa")
      document.getElementById('notaMicroempresa').value=info1[0].notamicroempresa
      setRimpe(info1[0].rimpe)
      cambiarCheckbox(info1[0].rimpe, "rimpe")
      document.getElementById('notaRimpe').value=info1[0].notaRimpe
      setAgRetencion(info1[0].agenteRetencion)
      cambiarCheckbox(info1[0].agenteRetencion, "agRetencion")
      document.getElementById('nResolucion').value=info1[0].nResolucion
      setObContabilidad(info1[0].obligadaCont)
      cambiarCheckbox(info1[0].obligadaCont, "obligado")
      document.getElementById('tipoFirma').value=info1[0].tipoFirma
      //////////

      document.getElementById('imagen').value=info1[0].Imagen
      document.getElementById('estado').value=info1[0].estado
      }catch(e){
        console.log(e)
      }
    }
    ////// no se usaron los metodos para extraer el id ni guardar contactos y requisitos

    useEffect(()=>{
        document.title = 'Editar Afiliada';
        desplegarInfo();
        //Telefono internacional
        const phoneInputField = document.getElementsByClassName("telefono")[0];
        if(phoneInputField !== null){
        var phoneInput = window.intlTelInput(phoneInputField, {
            preferredCountries:["ec"],
            utilsScript:
              "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          });
        }
      },[])

      const submitEdicionInfo = async(e) => {
        var conf=window.confirm('Los datos de la empresa serán modificados. Continuar?')
        if(conf){
        e.preventDefault();
        await handleEditarAfiliada();
        window.alert('Los datos han sido modificados exitosamente');
        }
      }

      const submitFinal = async(e) => {
        console.log(paises.find(e=>e.value===valuePais))
      }

  return (
    <div> 
          <center> <h1>Crear nueva Empresa Afiliada</h1> </center>
          <div className="card">
                <div className="card-body">
          <Tabs
            activeKey={tabActiva}
            id="tabEmpresa"
            className="mb-3"
            onSelect={(key) => setTabActiva(key)}
          >
            <Tab eventKey={1} title="Datos Generales">
          <div className="col-12 grid-margin">
              
                  <Form className="form-crear-empresa" onSubmit={e=>submitEdicionInfo(e)}>
                    <h4 className="card-description"> Información de la empresa </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Nombre Empresa:</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="nombreEmpresa" required/>
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">RUC:</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="RUC" required/>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Nombre Comercial:</label>
                          <div className="col-sm-9">
                          <Form.Control type="input" id="nombreComercial" required/>
                          </div>
                        </Form.Group>
                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Teléfono 1:</label>
                          <div className="col-sm-9">
                          <Form.Control type="input" id="telefono1" required/>
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Teléfono 2:</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="telefono2"/>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Celular 1:</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="celular1" className="telefono"/>
                          </div>
                          </Form.Group>
                      </div>
                      
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Email 1:</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="email1" required/>
                          </div>
                          </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Email 2:</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="email2" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-4 col-form-label">Representante Legal:</label>
                          <div className="col-sm-8">
                          <Form.Control type="text" id="representante" required/>
                          </div>
                          </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-4 col-form-label">CI Representante:</label>
                          <div className="col-sm-8">
                          <Form.Control type="text" id="CIrepresentante" required/>
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-4 col-form-label">Imagen Empresa:</label>
                          <div className="col-sm-8">
                          <Form.Control type="text" id="imagen" />
                          </div>
                          </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-4 col-form-label">Estado Empresa:</label>
                          <div className="col-sm-8">
                          <select id='estado'>
                            <option value="0">Inactiva</option>
                            <option value="1">Activa</option>
                          </select>
                          </div>
                          </Form.Group>
                      </div>
                    </div>
                    <h4 className="card-description"> Dirección </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Dirección</label>
                          <div className="col-sm-9">
                          <Form.Control as="textarea" rows={3} id="direccion" required/>
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">País</label>
                          <div className="col-sm-9">
                            <Select
                            classNamePrefix='seleccionPais'
                            id="seleccionPais"
                            options={paises}
                            onChange={(e)=> llamarProvincias(e.value)}
                            placeholder="Seleccionar"
                            noOptionsMessage={()=>"No hay opciones"}
                            defaultValue={{label: labelPais ,value: valuePais}}
                            >
                            </Select>
                          {/* <select 
                          className="form-control" 
                          id="seleccionPais" 
                          onFocus={(e)=> e.target.value=-1}
                          onChange={ (e)=> llamarProvincias(e.target.value)}
                          >
  
                          {paisesList.map(elemento=>(
                              <option key={elemento.idPais} value={elemento.idPais}>{elemento.nombre}</option>
                          )
                          )}
                          </select> */}
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Provincia / Estado</label>
                          <div className="col-sm-9">
                          <Select
                            classNamePrefix='seleccionProvincia'
                            id="seleccionProvincia"
                            options={provincias}
                            onChange={(e)=> llamarCiudades(e.value)}
                            placeholder="Seleccionar"
                            noOptionsMessage={()=>"No hay opciones"}
                            defaultValue={{label: labelProvincia ,value: valueProvincia}}
                            >
                          </Select>
                          {/* <select 
                          className="form-control" 
                          id="seleccionProvincia" 
                          onFocus={(e)=> e.target.value=-1}
                          onChange={ (e)=> llamarCiudades(e.target.value)}
                          >
                          {provinciasList.map(elemento=>(
                              <option key={elemento.idProvincia} value={elemento.idProvincia}>{elemento.nombre}</option>
                          )
                          )}
                          </select> */}
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Cantón / Ciudad</label>
                          <div className="col-sm-9">
  
                          <Select
                            classNamePrefix='seleccionCiudad'
                            id="seleccionCiudad"
                            options={ciudades}
                            placeholder="Seleccionar"
                            onChange={(e)=> setValueCiudad(e.value)}
                            noOptionsMessage={()=>"No hay opciones"}
                            defaultValue={{label: labelCiudad ,value: valueCiudad}}
                            >
                          </Select>
  
                          {/*  <select 
                          className="form-control" 
                          id="seleccionCiudad" 
                          >
                          {ciudadesList.map(elemento=>(
                              <option key={elemento.idCiudad} value={elemento.idCiudad}>{elemento.nombre}</option>
                          )
                          )}
                          </select> */}
                          </div>
                        </Form.Group>
                      </div>
                      </div>
                      
                    <h4 className="card-description"> Datos S.R.I </h4>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Contribuyente especial</label>
                          <div className="col-sm-9 row align-items-center justify-content-center">
                              <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                  <input type="checkbox" id="contEspecial" className="form-check-input" onChange={(e) => handleCheckChange(e, contEspecial, setcontEspecial)}/> 
                                  <i className="input-helper"></i>
                              </label>
                              </div>
                          </div>   
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Código Contribuyente</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="codContribuyente" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
  
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Microempresa</label>
                          <div className="col-sm-9 row align-items-center justify-content-center">
                              <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                  <input type="checkbox" id="microempresa" className="form-check-input" onChange={(e) => handleCheckChange(e, microempresa, setMicroempresa)} /> 
                                  <i className="input-helper"></i>
                              </label>
                              </div>
                          </div>   
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Nota Microempresa</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="notaMicroempresa" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
  
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Rimpe</label>
                          <div className="col-sm-9 row align-items-center justify-content-center">
                              <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                  <input type="checkbox" id="rimpe" className="form-check-input" onChange={(e) => handleCheckChange(e, rimpe, setRimpe)}/> 
                                  <i className="input-helper"></i>
                              </label>
                              </div>
                          </div>   
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Nota Rimpe</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="notaRimpe" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
  
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Agente de Retención</label>
                          <div className="col-sm-9 row align-items-center justify-content-center">
                              <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                  <input type="checkbox" id="agRetencion" className="form-check-input" onChange={(e) => handleCheckChange(e, agRetencion, setAgRetencion)}/> 
                                  <i className="input-helper"></i>
                              </label>
                              </div>
                          </div>   
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Número de resolución</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="nResolucion" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
  
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Obligado a llevar contabilidad</label>
                          <div className="col-sm-9 row align-items-center justify-content-center">
                              <div className="form-check form-check-primary">
                              <label className="form-check-label">
                                  <input type="checkbox" id="obligado" className="form-check-input" onChange={(e) => handleCheckChange(e, obContabilidad, setObContabilidad)}/> 
                                  <i className="input-helper"></i>
                              </label>
                              </div>
                          </div>   
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Tipo Firma</label>
                          <div className="col-sm-9">
                          <Form.Control type="text" id="tipoFirma" />
                          </div>
                        </Form.Group>
                      </div>
                    </div>
                    
                    <div className="container">
                      <div className="row justify-content-end">
                        <div className="col-sm-2">
                        <a href="/administracion/afiliadas">
                        <button type="button" className="btn btn-light btn-fw">Cancelar</button>
                        </a>
                        </div>
                        <div className="col-sm-2">
                        <button type="submit" className="btn btn-warning btn-fw">
                          Guardar</button>
                        </div>
                      </div>
                    </div>
                  
                  </Form>
                
              
            </div>
            </Tab>
            <Tab eventKey={2} title="Contactos de la empresa">
            
                <CompListaContactosEditar contactos={contactos} setContactos={setContactos}/> {/* traemos informacion del componente hijo */}
                
            </Tab>
            <Tab eventKey={3} title="Requisitos">
            
                <CompListaRequisitosEditar requisitos={requisitos} setRequisitos={setRequisitos}/> {/* traemos informacion del componente hijo */}
                
            </Tab>
            </Tabs>
            </div>
          </div>
      </div>
    )
  }
    
export default CompEdicionEmpresa
