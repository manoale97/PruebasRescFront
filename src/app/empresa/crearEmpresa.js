import React from 'react';
import { Form } from 'react-bootstrap';

function CompCrearEmpresa() {
  return (
    <div> 
        <center> <h1>Crear nueva Empresa Afiliada</h1> </center>
        <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <Form className="form-sample">
                  <p className="card-description"> <h5> Información de la empresa </h5></p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Empresa:</label>
                        <div className="col-sm-9">
                        <Form.Control  type="text" id="nombreEmpresa"/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">RUC:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="RUC"/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Comercial:</label>
                        <div className="col-sm-9">
                        <Form.Control type="input" id="nombreComercial" />
                        </div>
                      </Form.Group>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Teléfono 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="input" id="telefono1" />
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
                        <Form.Control type="text" id="celular1" />
                        </div>
                        </Form.Group>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="email1" />
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
                        <Form.Control type="text" id="representante" />
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-4 col-form-label">CI Representante:</label>
                        <div className="col-sm-8">
                        <Form.Control type="text" id="CIrepresentante" />
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
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-4 col-form-label">Estado:</label>
                        <div className="col-sm-8">
                        <Form.Control type="text" id="estadoEmpresa" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <p className="card-description"> <h5> Dirección </h5></p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Dirección</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="direccion" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">País</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="pais"/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Provincia</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="provincia" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Cantón</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="canton" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Parroquia</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="parroquia"/>
                        </div>
                      </Form.Group>
                    </div>
                    </div>
                    
                    <p className="card-description"> <h5> Datos S.R.I </h5></p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Contribuyente especial</label>
                        <div className="col-sm-9 row align-items-center justify-content-center">
                            <div className="form-check form-check-primary">
                            <label className="form-check-label">
                                <input type="checkbox" id="contEspecial" className="form-check-input" /> 
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
                                <input type="checkbox" id="microempresa" className="form-check-input" /> 
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
                                <input type="checkbox" id="rimpe" className="form-check-input" /> 
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
                                <input type="checkbox" id="agRetencion" className="form-check-input" /> 
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
                                <input type="checkbox" id="obligado" className="form-check-input" /> 
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

                  <p className="card-description"> <h5> Contactos de la empresa </h5></p>
                
                </Form>
              </div>
            </div>
          </div>
    </div>
  )
}

export default CompCrearEmpresa