import React, {useEffect, useState} from 'react';
import { Form, Modal } from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';

const URIemp = process.env.REACT_APP_API_URL+'afiliada'

function CompListaContactosEditar(props) {

    const navigate =  useNavigate();//metodo para redireccionar
    const id = useParams();//metodo para traer el id de los parametros desde la URL

    useEffect(()=>{
        /* if(props.contactos){
      setDatos(props.contactos)
        } */
        actualizarContactos();
    },[])

    //columnas de la tabla
    const columns = [
        {
            name: 'Id',
            selector: row => row.idContacto,
            omit: true
            
        },
        {
            name: 'Cargo',
            selector: row => row.cargo,
            
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            wrap: true
        },
        {
            name: 'Telefono',
            selector: row => row.telefono,
        },
        {
            name: 'Celular',
            selector: row => row.celular,
        },
        {
            name: 'Correo',
            selector: row => row.email,
            wrap: true
        },
        {
            cell: row => <div> 
                        <button type="button" onClick={(e) =>editarContacto(e,row)} className="btn btn-warning btn-rounded btn-sm"><i> </i><i className="mdi mdi-border-color"></i></button>
                        <button type="button" onClick={(e) =>eliminarContacto(e,row)} className="btn btn-danger btn-rounded btn-sm"><i> </i><i className="mdi mdi-delete"></i></button>
                        </div>,
            
        },
        
    ];

    const data = [
        {
            cargo: 'Gerente',
            nombre: 'contactoPrueba',
            telefono: '0993292832',
            celular: '093299311',
            email: 'djkadsjdaskl@jdasdl.com',
        },
    ]

    const [datos,setDatos] = useState([])

    // controles del modal de contactos
    const [showMdContacto, setShowMdContacto] = useState(false);
    const [showMdContactoEditar, setInfoMdContactoEditar] = useState(false);
    const handleCloseC = () => setShowMdContacto(false);
    const handleShowC = () => setShowMdContacto(true);
    const handleCloseCE = () => setInfoMdContactoEditar(false);
    const handleShowCE = () => setInfoMdContactoEditar(true);
    //autonumerado de contactos para la creacion
    //const [contador, setContador] = useState(1)

    const actualizarContactos = async() => {
        try {
            const InfoEntera = await axios.post(URIemp, 
                {'opcion':8,
                'idAfiliada':id.id
                })
            setDatos(InfoEntera.data)
            await setChangeState(now)
        } catch (error) {
            console.log(error);
        }
        
    }
    //metodo para insertar contacto
    const insertarContacto = async() => {

        try {
            await axios.post(URIemp, 
                {'opcion':6,
                'idAfiliada':id.id,
                'cargo':document.getElementById("cargoContacto").value,
                'nombre':document.getElementById("nombreContacto").value,
                'telefono':document.getElementById("telefonoContacto").value,
                'celular':document.getElementById("celularContacto").value,
                'email':document.getElementById("correoContacto").value,
              })

            await actualizarContactos();
            window.alert("Contacto agregado exitosamente")
            
        } catch (error) {
            console.log(error);
        }
        handleCloseC()
    }

    //guardar fila seleccionada
    const [row, setRow] = useState()
    
    const [changeEstado, setChangeState] = useState() //variable de estado para las re renderizaciones
    let now = new Date();//defino fecha y hora para la generacion de aleatoriedad para la re renderizacion
    //metodo para editar contacto
    const editarContacto = (e, row) => {
        handleShowCE()
        setRow(row)
        setTimeout(() => { document.getElementById("cargoContacto").value=row.cargo
        document.getElementById("nombreContacto").value=row.nombre
        document.getElementById("telefonoContacto").value=row.telefono
        document.getElementById("celularContacto").value=row.celular
        document.getElementById("correoContacto").value=row.email}, 200);
    }

    //metodo para editar cuando se de submit del modal  
    const submitEditarContacto = async() => {
        try {
            var conf = window.confirm("El contacto será editado. Continuar?")
            if(conf){
            await axios.post(URIemp, 
                {'opcion':10,
                'idContacto':row.idContacto,
                'cargo':document.getElementById("cargoContacto").value,
                'nombre': document.getElementById("nombreContacto").value,
                'telefono':document.getElementById("telefonoContacto").value,
                'celular':document.getElementById("celularContacto").value,
                'email':document.getElementById("correoContacto").value
            })
            actualizarContactos();
        }
        } catch (error) {
            console.log(error)
        }
        setTimeout(() => {handleCloseCE()}, 200);
    }

    //metodo para eliminar contacto
    const eliminarContacto = async(e, row) => {
        
        var conf = window.confirm('Está seguro de eliminar este contacto de forma permanente?')
        if(conf){
            try {
                await axios.post(URIemp, 
                    {'opcion':12,
                    'idContacto':row.idContacto
                })
                actualizarContactos();
            } catch (error) {
                console.log(error)
            }
        }
        await setChangeState(now)
    }
  
    return (
      <div>
        <h4>Lista de Contactos</h4>
        <button type="button" onClick={handleShowC} className="btn btn-primary btn-fw">Crear nuevo Contacto</button>
        <DataTableExtensions
          columns={columns}
          data={datos}
          print={false}
          export={false}
          filter={false}
          filterPlaceholder='Buscar'  
        >
        <DataTable
        noHeader
        //pagination
        noDataComponent="No hay Contactos"
        />
        </DataTableExtensions>

        <div className="container mt-4">
                      <div className="row justify-content-end">
                        <div className="col-sm-2">
                        <a href="/administracion/afiliadas">
                        <button type="button" className="btn btn-light btn-fw">Cancelar</button>
                        </a>
                        </div>
                      </div>
                    </div>

            {/******** modal de contacto *********/}
                <Modal show={showMdContacto} onHide={handleCloseC} id="modalContacto">
                    <Modal.Header closeButton>
                    <Modal.Title>Nuevo Contacto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cargo</Form.Label>
                        
                            <select className="form-control" id="cargoContacto">
                            <option>Gerente General</option>
                            <option>Financiero</option>
                            <option>TIC</option>
                            <option>Contable</option>
                            <option>Operativo</option>
                            </select>
                        
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" id="nombreContacto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" id="telefonoContacto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control type="text" id="celularContacto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="text" id="correoContacto" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseC}>
                        Cerrar
                    </button>
                    <button className="btn btn-primary" onClick={insertarContacto}>
                        Guardar
                    </button>
                    </Modal.Footer>
                </Modal>
                {/*fin modal de contacto*/}

                {/******** modal de contacto editar *********/}
                <Modal show={showMdContactoEditar} onHide={handleCloseCE} id="modalContacto">
                    <Modal.Header closeButton>
                    <Modal.Title>Editar Contacto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Cargo</Form.Label>
                        
                            <select className="form-control" id="cargoContacto">
                            <option>Gerente General</option>
                            <option>Financiero</option>
                            <option>TIC</option>
                            <option>Contable</option>
                            <option>Operativo</option>
                            </select>
                        
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" id="nombreContacto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" id="telefonoContacto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Celular</Form.Label>
                        <Form.Control type="text" id="celularContacto" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control type="text" id="correoContacto" />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseCE}>
                        Cerrar
                    </button>
                    <button className="btn btn-primary" onClick={submitEditarContacto}>
                        Guardar
                    </button>
                    </Modal.Footer>
                </Modal>
                {/*fin modal de contacto editar*/}
        </div>
    )
}

export default CompListaContactosEditar