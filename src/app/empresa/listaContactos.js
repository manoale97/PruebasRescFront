import React, {useEffect, useState} from 'react';
import { Form, Modal } from 'react-bootstrap';

function CompListaContactos() {
    useEffect(()=>{
      document.title = 'Lista de Contactos Empresa';
    },[])
    // controles del modal de contactos
    const [showMdContacto, setShowMdContacto] = useState(false);
    const handleCloseC = () => setShowMdContacto(false);
    const handleShowC = () => setShowMdContacto(true);
    
    //controles del modal de requisitos
    const [showMdReq, setShowMdReq] = useState(false);
    const handleCloseR = () => setShowMdReq(false);
    const handleShowR = () => setShowMdReq(true);
  
    return (
      <div>
        <h1>Lista de Contactos</h1>
        <button type="button" onClick={handleShowC} className="btn btn-primary btn-fw">Crear nuevo Contacto</button>
            {/* modal de contacto*/}
                <Modal show={showMdContacto} onHide={handleCloseC}>
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
                    <button className="btn btn-primary" onClick={handleCloseC}>
                        Guardar
                    </button>
                    </Modal.Footer>
                </Modal>
                {/*fin modal de contacto*/}
        </div>
    )
}

export default CompListaContactos