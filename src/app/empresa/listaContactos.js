import React, {useEffect, useState} from 'react';
import { Form, Modal } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

function CompListaContactos(props) {
    useEffect(()=>{
      document.title = 'Lista de Contactos Empresa';
    },[])

    //columnas de la tabla
    const columns = [
        {
            name: 'Id',
            selector: row => row.id,
            omit: true
            
        },
        {
            name: 'Cargo',
            selector: row => row.cargo,
            
        },
        {
            name: 'Nombre',
            selector: row => row.nombre,
            
        },
        {
            name: 'Telefono',
            selector: row => row.telefono1,
        },
        {
            name: 'Celular',
            selector: row => row.celular1,
        },
        {
            name: 'Correo',
            selector: row => row.correo,
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
            telefono1: '0993292832',
            celular1: '093299311',
            correo: 'djkadsjdaskl@jdasdl.com',
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
    const [contador, setContador] = useState(1)

    //metodo para insertar contacto
    const insertarContacto = () => {
        var contacto = [{
            id: contador,
            cargo: document.getElementById("cargoContacto").value,
            nombre: document.getElementById("nombreContacto").value,
            telefono1: document.getElementById("telefonoContacto").value,
            celular1: document.getElementById("celularContacto").value,
            correo: document.getElementById("correoContacto").value,
        }]
        
        setContador ( contador + 1);
        setDatos(datos.concat(contacto))
        props.setContactos(datos.concat(contacto))//metodo para pasar el estado al componente padre
        
        handleCloseC()
    }

    //guardar fila seleccionada
    const [row, setRow] = useState()
    //metodo para editar contacto
    const editarContacto = (e, row) => {
        handleShowCE()
        setRow(row)
        setTimeout(() => { document.getElementById("cargoContacto").value=row.cargo
        document.getElementById("nombreContacto").value=row.nombre
        document.getElementById("telefonoContacto").value=row.telefono1
        document.getElementById("celularContacto").value=row.celular1
        document.getElementById("correoContacto").value=row.correo}, 200);
    }

    //metodo para editar cuando se de submit del modal  
    const submitEditarContacto = () => {
        var datosAux = datos;
        datosAux.forEach(element => {
            if (element.id === row.id){
                var indice = datosAux.indexOf(element)
                datosAux.splice(indice,1)
                }
        })
        setDatos(datosAux)//elimina al contacto por su indice
        props.setContactos(datosAux)//metodo para pasar el estado al componente padre
        insertarContacto()//inserta el contacto editado
        setTimeout(() => {handleCloseCE()}, 200);//tiempo de espera para el re renderizado
    }

    //metodo para eliminar contacto
    const eliminarContacto = (e, row) => {
        var conf = window.confirm('Esta seguro de eliminar este contacto')
        setRow(row)
        if(conf){
        var datosAux = datos;
        datosAux.forEach(element => {
            if (element.id === row.id){
                var indice = datosAux.indexOf(element)
                datosAux.splice(indice,1)
                }
        })
        setTimeout(() => {
        setDatos(datosAux)//elimina al contacto por su indice
        props.setContactos(datosAux)//metodo para pasar el estado al componente padre
        }, 200);//tiempo de espera para el re renderizado
        }
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
        pagination
        noDataComponent="No hay Contactos"
        />
        </DataTableExtensions>
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

export default CompListaContactos