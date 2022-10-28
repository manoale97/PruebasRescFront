import React, {useEffect, useState} from 'react';
import { Form} from 'react-bootstrap';
import axios from 'axios';

const URIpaises = process.env.REACT_APP_API_URL+'paises-ciudades'
const URIemp = process.env.REACT_APP_API_URL+''

function CompCrearEmpresa() {
  
  //creacion de estados
  const [paisesList, setPaisesList]=useState([])
  const [provinciasList, setProvinciasList]=useState([])
  const [ciudadesList, setCiudadesList]=useState([])

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
  //metodo para el submit 
  const handleCrearAfiliada=async()=>{
    await axios.post(URIemp, 
      {'opcion':2,
      'nombre':'',
      'nombre_comercial':'',
      'ruc':'',
      'idPais':'',
      'idProvincia':'',
      'idPais':'',
      'idCanton':'',
      'idParroquia':'',
      'direccion':'',
      'telefono1':'',
      'telefono2':'',
      'celular1':'',
      'email1':'',
      'email2':'',
      'representante':'',
      'ciRepresentante':'',
      'fechaCreacion':'',
      'contribuyenteEspecial':'',
      'codigoContribuyente':'',
      'microempresa':'',
      'notamicroempresa':'',
      'rimpe':'',
      'notaRimpe':'',
      'agenteRetencion':'',
      'nResolucion':'',
      'obligadaCont':'',
      'tipoFirma':'',
      'Imagen':'',
      'estado':0
      


    })//llamado a la api para la validacion del token
    .then(response=>{
    })
    .catch(error=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    document.title = 'Crear Afiliada Nueva';
    llamarPaises();
  },[])

  return (
    <div> 
        <center> <h1>Crear nueva Empresa Afiliada</h1> </center>
        <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <Form className="form-sample">
                  <h5 className="card-description"> Información de la empresa </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Empresa:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="nombreEmpresa"/>
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
                  <h5 className="card-description"> Dirección </h5>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Dirección</label>
                        <div className="col-sm-9">
                        <Form.Control as="textarea" rows={3} id="direccion" />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">País</label>
                        <div className="col-sm-9">
                        <select 
                        className="form-control" 
                        id="seleccionPais" 
                        onFocus={(e)=> e.target.value=-1}
                        onChange={ (e)=> llamarProvincias(e.target.value)}
                        >

                        {paisesList.map(elemento=>(
                            <option key={elemento.idPais} value={elemento.idPais}>{elemento.nombre}</option>
                        )
                        )}
                        </select>
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
                        <select 
                        className="form-control" 
                        id="seleccionProvincia" 
                        onFocus={(e)=> e.target.value=-1}
                        onChange={ (e)=> llamarCiudades(e.target.value)}
                        >
                        {provinciasList.map(elemento=>(
                            <option key={elemento.idProvincia} value={elemento.idProvincia}>{elemento.nombre}</option>
                        )
                        )}
                        </select>
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
                        <select 
                        className="form-control" 
                        id="seleccionCiudad" 
                        //onFocus={(e)=> e.target.value=-1}
                        //onChange={ (e)=> llamarCiudades(e.target.value)}
                        >
                        {ciudadesList.map(elemento=>(
                            <option key={elemento.idCiudad} value={elemento.idCiudad}>{elemento.nombre}</option>
                        )
                        )}
                        </select>
                        </div>
                      </Form.Group>
                    </div>
                    </div>
                    
                  <h5 className="card-description"> Datos S.R.I </h5>
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
                  
                  <div className="container">
                    <div className="row justify-content-end">
                      <div className="col-sm-2">
                      <button type="submit" className="btn btn-success btn-fw">Crear Empresa</button>
                      </div>
                      <div className="col-sm-2">
                      <button type="button" className="btn btn-light btn-fw">Cancelar</button>
                      </div>
                    </div>
                  </div>
                
                </Form>
              </div>
            </div>

          </div>
    </div>
  )
}

export default CompCrearEmpresa