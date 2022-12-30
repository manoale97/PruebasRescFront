import React, {useEffect, useState} from 'react';
import { Form, Modal } from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import Select from 'react-select'
import axios from 'axios';

const URI1 = process.env.REACT_APP_API_URL+'emisor'

const CompEmisor = () => {

    useEffect(()=>{
        document.title = 'Emisores Bancarios';
        llamadaAPI();
      },[])

    const navigate =  useNavigate();//metodo para redireccionar

    const [data, setData] = useState([]);

    //Definicion de las columnas para el datatable
    const columns = [
        {
            name: 'CODIGO',
            selector: row => row.codigo,
            width: "100px",
            sortable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true,
            wrap: true
        },
        {
            name: 'INDEPENDIENTE',
            selector: row => row.independiente,
            width: "150px",
 
        },
        {
            name: 'ESTADO',
            cell: (row) => <div> 
                 {row.estado==0 ? 'inactivo':'activo'}
                  </div>,
            width: "120px",
            
        },
        {
            cell: (row) => <div> 
                <button type="button" onClick={(e)=>editarEmisor(e, row)} className="btn btn-warning btn-rounded btn-sm"><i> </i><i className="mdi mdi-border-color"></i></button>
                <button type="button" onClick={(e)=>eliminarEmisor(e,row)} className="btn btn-danger btn-rounded btn-sm"><i> </i><i className="mdi mdi-delete"></i></button>
                </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const crearEmisor = async() => {
        try {
            await axios.post(URI1, 
                {'opcion':2,
                'codigo': document.getElementById('codigoEmisorModal').value,
                'nombre': document.getElementById('nombreEmisorModal').value,
                'estado': 1,
                'independiente': document.getElementById('emisorIndependienteModal').value,
              })
            
        } catch (error) {
            console.log(error)
        }
        await llamadaAPI()
        handleCloseNewEmisor()
    }

    //metodo para abrir el modal de editar emisor
    const editarEmisor = (e,row) => {
        handleShowEditEmisor()
        setTimeout(() => { 
        document.getElementById("codigoEmisorModalfijo").value=row.codigo
        document.getElementById("codigoEmisorModalnuevo").value=row.codigo
        document.getElementById("nombreEmisorModal").value=row.nombre
        document.getElementById("emisorIndependienteModal").value=row.independiente
        document.getElementById("estadoEmisorModal").value=row.estado
        }, 200);
    }

    //metodo para editar emisor
    const submitEditarEmisor = async() => {
        try {
            var conf = window.confirm('El emisor será modificado de manera permanente.\nContinuar?')
            if(conf){
            await axios.post(URI1, 
                {'opcion':3,
                'codigofijo': document.getElementById('codigoEmisorModalfijo').value,
                'codigonuevo': document.getElementById('codigoEmisorModalnuevo').value,
                'nombre': document.getElementById('nombreEmisorModal').value,
                'estado': document.getElementById('estadoEmisorModal').value,
                'independiente': document.getElementById('emisorIndependienteModal').value,
              })
            }
        } catch (error) {
            console.log(error)
        }
        await llamadaAPI()
        handleCloseEditEmisor()
    }

    //metodo para eliminar emisor
    const eliminarEmisor = async(e,row) => {
        e.preventDefault();
        try {
            var conf = window.confirm('El emisor será eliminado de manera permanente.\nContinuar?')
            if(conf){
            await axios.post(URI1, 
                {
                'opcion': 4,
                'codigo':row.codigo
            } 
            )
        }
        await llamadaAPI()
        } catch (error) {
            console.log(error)
        }
    }

    //Definicion de los datos
    const llamadaAPI = async() => {
        await axios.post(URI1, 
            {'opcion': 0} 
        )
        .then(response=>{
            
            setData(response.data);
        }
        )
        .catch(error=>{
            console.log(error);
        })
    }

        // controles del modal de crear emisor
        const [showMdNewEmisor, setShowMdNewEmisor] = useState(false);
        const handleShowNewEmisor = () => setShowMdNewEmisor(true);
        const handleCloseNewEmisor = () => setShowMdNewEmisor(false);

        // controles del modal de editar emisor
        const [showMdEditEmisor, setShowMdEditEmisor] = useState(false);
        const handleShowEditEmisor = () => setShowMdEditEmisor(true);
        const handleCloseEditEmisor = () => setShowMdEditEmisor(false);
        

    return(
        <div>
            <center><h1>Emisores Bancarios</h1></center>
        <div className="card">
        <div className="card-body">
        <button type="button" onClick={handleShowNewEmisor} className="btn btn-primary btn-fw">Crear nuevo Emisor</button>
        <hr size="8px" color="white" />
        <DataTableExtensions
          columns={columns}
          data={data}
          print={false}
          export={false}
          filterPlaceholder='Buscar'
        >
        <DataTable
        noHeader
        pagination
        noDataComponent="No hay Emisores"
        />
        </DataTableExtensions>
            </div>
        </div>

        {/******** modal de nuevo emisor *********/}
        <Modal show={showMdNewEmisor} onHide={handleCloseNewEmisor} id="modalNewEmisor">
                    <Modal.Header closeButton>
                    <Modal.Title>Nuevo Emisor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                        <Form.Label>Código</Form.Label>
                        <Form.Control type="text" id="codigoEmisorModal" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" id="nombreEmisorModal" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Emisor Independiente</Form.Label>
                        <select className="form-control" id="emisorIndependienteModal">
                            <option value='0'>No</option>
                            <option value='1'>Sí</option>
                            </select>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseNewEmisor}>
                        Cerrar
                    </button>
                    <button className="btn btn-primary" onClick={crearEmisor} >
                        Guardar
                    </button>
                    </Modal.Footer>
                </Modal>
                {/*fin modal de nuevo emisor*/}

                {/******** modal de editar emisor *********/}
        <Modal show={showMdEditEmisor} onHide={handleCloseEditEmisor} id="modalEditEmisor">
                    <Modal.Header closeButton>
                    <Modal.Title>Editar Emisor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                        <Form.Label>Código</Form.Label>
                        <Form.Control type="text" id="codigoEmisorModalfijo" style={{display: 'none'}} />
                        <Form.Control type="text" id="codigoEmisorModalnuevo" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" id="nombreEmisorModal" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Emisor Independiente</Form.Label>
                        <select className="form-control" id="emisorIndependienteModal">
                            <option value='0'>No</option>
                            <option value='1'>Sí</option>
                            </select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                        <Form.Label>Estado</Form.Label>
                        <select className="form-control" id="estadoEmisorModal">
                            <option value='0'>Inactivo</option>
                            <option value='1'>Activo</option>
                            </select>
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseEditEmisor}>
                        Cerrar
                    </button>
                    <button className="btn btn-primary" onClick={submitEditarEmisor} >
                        Guardar
                    </button>
                    </Modal.Footer>
                </Modal>
                {/*fin modal de editar emisor*/}

        </div>
    )
}

export default CompEmisor