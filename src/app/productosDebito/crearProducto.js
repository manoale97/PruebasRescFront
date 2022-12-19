import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {useNavigate} from "react-router-dom";
import Select from 'react-select'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';

const URIemp = process.env.REACT_APP_API_URL+'afiliada'

function CompCrearProducto() {

    const navigate =  useNavigate();//metodo para redireccionar

    //estado para pestañas
    const [tabActiva, setTabActiva]=useState(1)

    //Para obtener el nombre de la empresa que se esta trabajando
    const getNombreEmpresaAPI = async() => {
       const nombreEmpresa = await axios.post(URIemp, 
            {'opcion':14,
            'idAfiliada': parseInt(localStorage.getItem('idEmpresa'))
          })

          document.getElementById('Empresa').value=nombreEmpresa.data[0].nombre

          console.log(nombreEmpresa.data[0].nombre)
    }

    useEffect(()=>{
        document.title = 'Lista de Productos';
        getNombreEmpresaAPI();
      },[])

    return(
        <div>
            <center> <h1>Crear nuevo Producto</h1> </center>
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
            <Form className="form-crear-empresa">
                <div className="row">
                <div className="col-md-9">
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Empresa:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="Empresa" disabled/>
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Nombre Producto:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="NombreProducto"/>
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Descripción:</label>
                    <div className="col-sm-9">
                    <Form.Control as="textarea" rows={3} id="Descripcion"/>
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Tipo:</label>
                    <div className="col-sm-9">
                    <select>
                        
                    </select>
                    </div>
                </Form.Group>
                </div>
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

export default CompCrearProducto