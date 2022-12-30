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
    }

    //Submit del fomrulario de la primera pestaña
    const submitDatosGenerales = (e) => {
        e.preventDefault();
        setTabActiva(2)//cambiar a la segunda tab o pestaña
    }

    //Submit del fomrulario de la segunda pestaña
    const submitCondiciones = (e) => {
        e.preventDefault();
        setTabActiva(3)//cambiar a la segunda tab o pestaña
    }

    const submitFormasPago = (e) => {
        e.preventDefault();
        setTabActiva(4)//cambiar a la segunda tab o pestaña
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
            <Form className="form-crear-empresa" onSubmit={submitDatosGenerales}>
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
                    <Form.Control type="text" id="NombreProducto" required/>
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
                    <select className="form-control" id='FormaPagoTipo'>
                        <option value='1'>Semanal</option>
                        <option value='2'>Quincenal</option>
                        <option value='3'>Diario</option>
                        <option value='4'>Mensual</option>
                        <option value='5'>Trimestral</option>
                        <option value='6'>Semestral</option>
                        <option value='7'>Anual</option>
                    </select>
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Estado:</label>
                    <div className="col-sm-9">
                    <select className="form-control" id='Estado'>
                        <option value='1'>Activo</option>
                        <option value='0'>Inactivo</option>
                    </select>
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Tipo de Producto:</label>
                    <div className="col-sm-9">
                    <select className="form-control" id='TipoProducto'>
                        <option value='1'>Bien</option>
                        <option value='2'>Servicio</option>
                    </select>
                    </div>
                </Form.Group>
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label ">Mostrar en Página Web:</label>
                    <div className="col-sm-8">
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id='MostrarPaginaWeb'/>
                        <i className="input-helper"></i>
                    </label>
                    </div>
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
                      <button type="submit" className="btn btn-success btn-fw">
                        Siguiente</button>
                      </div>
                    </div>
                </div>
            </Form>
            </div>
            </Tab>


            <Tab eventKey={2} title="Condiciones">
            <div className="col-12 grid-margin">
            <Form className="form-crear-empresa" onSubmit={submitCondiciones}>
                <div className="row">
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Afiliación Individual:</label>
                    <div className="col-sm-7 row align-items-center justify-content-center">
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id='AfiliacionIndividual'/>
                        <i className="input-helper"></i>
                    </label>
                    </div>
                    </div>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Afiliación Masiva:</label>
                    <div className="col-sm-7 row align-items-center justify-content-center">
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id='AfiliacionMasiva'/>
                        <i className="input-helper"></i>
                    </label>
                    </div>
                    </div>
                </Form.Group>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Última Nómina:</label>
                    <div className="col-sm-7 row align-items-center justify-content-center">
                    <div className="form-check">
                    <label className="form-check-label">
                        <input type="checkbox" className="form-check-input" id='UltimaNomina'/>
                        <i className="input-helper"></i>
                    </label>
                    </div>
                    </div>
                </Form.Group>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Edad Mínima de Ingreso:</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="EdadMinima"/>
                    </div>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Edad Máxima de Ingreso:</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="EdadMaxima"/>
                    </div>
                </Form.Group>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Edad Límite de Permanencia:</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="EdadLimite"/>
                    </div>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Suspendido (DÍAS):</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="Suspendido"/>
                    </div>
                </Form.Group>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Inactivo (DÍAS):</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="Inactivo"/>
                    </div>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Periodo de Gracia (DÍAS):</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="PeriodoGracia"/>
                    </div>
                </Form.Group>
                </div>
                </div>

                <div className="row">
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Días de Carencia:</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="DiasCarencia"/>
                    </div>
                </Form.Group>
                </div>
                <div className="col-md-6">
                <Form.Group className="row">
                    <label className="col-sm-4 row align-items-center col-form-label">Plazo Pago (en días):</label>
                    <div className="col-sm-6">
                    <Form.Control type="text" id="PlazoPago"/>
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
                      <button type="submit" className="btn btn-success btn-fw">
                        Siguiente</button>
                      </div>
                    </div>
                </div>
                
            </Form>
            </div>
            </Tab>


            <Tab eventKey={3} title="Formas de Pago">
            <div className="col-12 grid-margin">
                <Form className="form-crear-empresa" onSubmit={submitFormasPago}>
                    <div className="row">
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Plan:</label>
                    <div className="col-sm-9">
                    <select className="form-control" id='TipoPlan'>
                        <option value='1'>Plan único</option>
                        <option value='2'>Plan doble</option>
                        <option value='3'>Plan variable</option>
                    </select>
                    </div>
                    </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 row align-items-center col-form-label">Tipo de Cuota:</label>
                    <div className="col-sm-9">
                    <select className="form-control" id='TipoCuota'>
                        <option value='1'>Fija</option>
                        <option value='2'>Variable</option>
                        <option value='3'>Recurrente</option>
                    </select>
                    </div>
                    </Form.Group>
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Valor:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="ValorPlan"/>
                    </div>
                    </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 row align-items-center col-form-label">Cuotas:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="Cuotas"/>
                    </div>
                    </Form.Group>
                    </div>
                    </div>

                    <div className="row">
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Cobertura:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="Cobertura"/>
                    </div>
                    </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 row align-items-center col-form-label">Beneficiarios:</label>
                    <div className="col-sm-9">
                    <Form.Control type="text" id="Beneficiarios"/>
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