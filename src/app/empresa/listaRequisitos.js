import React, {useEffect, useState} from 'react';
import { Form, Modal } from 'react-bootstrap';

function CompListaContactos() {
    useEffect(()=>{
      document.title = 'Lista Requisitos de la Empresa';
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
        <button type="button" onClick={handleShowR} className="btn btn-primary btn-fw">Seleccione los requisitos</button>
            {/* modal de requisitos*/}
                <Modal show={showMdReq} onHide={handleCloseR}>
                    <Modal.Header closeButton>
                    <Modal.Title>Requisitos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            autoFocus
                        />
                        </Form.Group>
                        <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                        >
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseR}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={handleCloseR}>
                        Save Changes
                    </button>
                    </Modal.Footer>
                </Modal>
            {/*fin modal de requisitos*/}
      </div>
    )
}

export default CompListaContactos