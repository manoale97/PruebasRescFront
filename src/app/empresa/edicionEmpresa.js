import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Form } from 'react-bootstrap';
import DatePicker from "react-datepicker";


function CompEdicionEmpresa() {
  return (
    <div> 
        <center> <h1>Editar datos de la empresa</h1> </center>
    
    <Tabs
      defaultActiveKey="datos"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="datos" title="Datos Generales">
      <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <form className="form-sample">
                  <p className="card-description"> Información de la empresa </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Empresa:</label>
                        <div className="col-sm-9">
                        <Form.Control  type="text" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">RUC:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Comercial:</label>
                        <div className="col-sm-9">
                        <Form.Control type="input" />
                        </div>
                      </Form.Group>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Teléfono 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="input" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Teléfono 2:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Celular 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" />
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Celular 2:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" />
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email 2:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-4 col-form-label">Representante Legal:</label>
                        <div className="col-sm-8">
                        <Form.Control type="text" />
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-4 col-form-label">CI Representante:</label>
                        <div className="col-sm-8">
                        <Form.Control type="text" />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <p className="card-description"> Dirección </p>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Dirección</label>
                        <div className="col-sm-9">
                        <Form.Control type="text"/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">País</label>
                        <div className="col-sm-9">
                        <Form.Control type="text"/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Provincia</label>
                        <div className="col-sm-9">
                        <Form.Control type="text"/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Cantón</label>
                        <div className="col-sm-9">
                        <Form.Control type="text"/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Parroquia</label>
                        <div className="col-sm-9">
                        <Form.Control type="text"/>
                        </div>
                      </Form.Group>
                    </div>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
      </Tab>
      <Tab eventKey="sri" title="S.R.I.">
      <div>Contenido 2</div>  
      </Tab>
      <Tab eventKey="contactosDirectivos" title="Contactos Directivos">
      <div>Contenido 3</div>
      </Tab>
      <Tab eventKey="contactosOperativos" title="Contactos Operativos">
      <div>Contenido 4</div>
      </Tab>
      <Tab eventKey="contactosGenerales" title="Contactos Generales">
      <div>Contenido 5</div>
      </Tab>
      <Tab eventKey="requisitos" title="Requisitos">
      <div>Contenido 6</div>
      </Tab>
    </Tabs>
    </div>
  );
}

export default CompEdicionEmpresa;