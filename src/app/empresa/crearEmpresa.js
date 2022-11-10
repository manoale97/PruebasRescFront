import React, {useEffect, useState} from 'react';
import { Form} from 'react-bootstrap';
import Select from 'react-select'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import CompListaContactos from './listaContactos';
import CompListaRequisitos from './listaRequisitos';

const URIpaises = process.env.REACT_APP_API_URL+'paises-ciudades'
const URIemp = process.env.REACT_APP_API_URL+''

function CompCrearEmpresa() {

  const date = new Date()

  const [infoGeneral, setInfoGeneral] = useState([])//creo un estado con array de la info recolectada
  const [contactos,setContactos] = useState([]) //estados para extraer la informacion del componente hijo
  const [requisitos,setRequisitos] = useState([])//estados para extraer la informacion del componente hijo

  //variables para guardar los ids de las direcciones
  const [valuePais, setValuePais] = useState('')
  const [valueProvincia, setValueProvincia] = useState('')
  const [valueCiudad, setValueCiudad] = useState('')

  //variables para guardar los datos checkbox del sri
  const [contEspecial, setcontEspecial] = useState(0)
  const [microempresa, setMicroempresa] = useState(0)
  const [rimpe, setRimpe] = useState(0)
  const [agRetencion, setAgRetencion] = useState(0)
  const [obContabilidad, setObContabilidad] = useState(0)
  //metodo para el cambio de los check
  const handleCheckChange = (e, idcheckbox, setidcheckbox) => {
    if(idcheckbox===0){
      setidcheckbox(1)
    }else{
      setidcheckbox(0)
    }
  }

  //creacion de estados
  const [paisesList, setPaisesList]=useState([])
  const [provinciasList, setProvinciasList]=useState([])
  const [ciudadesList, setCiudadesList]=useState([])

  //estado para pestañas
  const [tabActiva, setTabActiva]=useState(1)

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
    setValuePais(e)
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
    setValueProvincia(e)
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

//metodo para el clic siguiente del formulario de la primera pestaña
 const submitInfoGeneral = (e) => {
  e.preventDefault();
  setTabActiva(2)//cambiar a la segunda tab o pestaña
 }
//metodo para el clic siguiente del formulario de la segunda pestaña
 const submitContactos = (e) => {
  e.preventDefault();
  setTabActiva(3)
 }
//metodo para el clic del formulario de la tercera pestaña
 const submitRequisitos = (e) => {
  
}
//metodo para regresar a la pestaña de atrás
const atras = (e) => {
  e.preventDefault();
  setTabActiva(tabActiva-1)
}

  //metodo subir la info de la primera pestaña al backend
  const handleCrearAfiliada=async()=>{
    await axios.post(URIemp, 
      {'opcion':2,
      'nombre':document.getElementById('nombreEmpresa').value,
      'nombre_comercial':document.getElementById('nombreComercial').value,
      'ruc':document.getElementById('RUC').value,
      'idPais':valuePais,
      'idProvincia':valueProvincia,
      'idCiudad':valueCiudad,
      'direccion':document.getElementById('direccion').value,
      'telefono1':document.getElementById('telefono1').value,
      'telefono2':document.getElementById('telefono2').value,
      'celular1':document.getElementById('celular1').value,
      'email1':document.getElementById('email1').value,
      'email2':document.getElementById('email2').value,
      'representante':document.getElementById('representante').value,
      'ciRepresentante':document.getElementById('CIrepresentante').value,
      'fechaCreacion':(date.getFullYear())+'-'+(date.getMonth()+1)+'-'+(date.getDate()),
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
    console.log((date.getFullYear())+'-'+(date.getMonth()+1)+'-'+(date.getDate()))
    document.title = 'Crear Afiliada Nueva';
    llamarPaises();
    //Telefono internacional
    const phoneInputField = document.getElementsByClassName("telefono")[0];
    if(phoneInputField !== null){
    var phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries:["ec"],
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
    }
  },[])

  const paises=paisesList.map(elemento=>(
    {value: elemento.idPais,
    label: `${elemento.nombre}`,
    }
  ))

  const provincias=provinciasList.map(elemento=>(
    {value: elemento.idProvincia,
    label: `${elemento.nombre}`
    }
  ))

  const ciudades=ciudadesList.map(elemento=>(
    {value: elemento.idCiudad,
    label: `${elemento.nombre}`
    }
  ))

  return (
    <div> 
      
        <center> <h1>Crear nueva Empresa Afiliada</h1> </center>
        <div className="card">
              <div className="card-body">
        <Tabs
          activeKey={tabActiva}
          id="tabEmpresa"
          className="mb-3"
          onSelect={(key) => setTabActiva(key)}
        >
          <Tab eventKey={1} title="Datos Generales" disabled>
        <div className="col-12 grid-margin">
            
                <Form className="form-crear-empresa" onSubmit={submitInfoGeneral}>
                  <h4 className="card-description"> Información de la empresa </h4>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Empresa:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="nombreEmpresa" required/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">RUC:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="RUC" required/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Nombre Comercial:</label>
                        <div className="col-sm-9">
                        <Form.Control type="input" id="nombreComercial" required/>
                        </div>
                      </Form.Group>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Teléfono 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="input" id="telefono1" required/>
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
                        <Form.Control type="text" id="celular1" className="telefono"/>
                        </div>
                        </Form.Group>
                    </div>
                    
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email 1:</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" id="email1" required/>
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
                        <Form.Control type="text" id="representante" required/>
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-4 col-form-label">CI Representante:</label>
                        <div className="col-sm-8">
                        <Form.Control type="text" id="CIrepresentante" required/>
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
                        <Form.Control type="text" id="estadoEmpresa"/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <h4 className="card-description"> Dirección </h4>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Dirección</label>
                        <div className="col-sm-9">
                        <Form.Control as="textarea" rows={3} id="direccion" required/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">País</label>
                        <div className="col-sm-9">
                          <Select
                          classNamePrefix='seleccion'
                          id="seleccionPais"
                          options={paises}
                          onChange={(e)=> llamarProvincias(e.value)}
                          placeholder="Seleccionar"
                          noOptionsMessage={()=>"No hay opciones"}
                          >
                          </Select>
                        {/* <select 
                        className="form-control" 
                        id="seleccionPais" 
                        onFocus={(e)=> e.target.value=-1}
                        onChange={ (e)=> llamarProvincias(e.target.value)}
                        >

                        {paisesList.map(elemento=>(
                            <option key={elemento.idPais} value={elemento.idPais}>{elemento.nombre}</option>
                        )
                        )}
                        </select> */}
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
                        <Select
                          classNamePrefix='seleccion'
                          id="seleccionProvincia"
                          options={provincias}
                          onChange={(e)=> llamarCiudades(e.value)}
                          placeholder="Seleccionar"
                          noOptionsMessage={()=>"No hay opciones"}
                          >
                        </Select>
                        {/* <select 
                        className="form-control" 
                        id="seleccionProvincia" 
                        onFocus={(e)=> e.target.value=-1}
                        onChange={ (e)=> llamarCiudades(e.target.value)}
                        >
                        {provinciasList.map(elemento=>(
                            <option key={elemento.idProvincia} value={elemento.idProvincia}>{elemento.nombre}</option>
                        )
                        )}
                        </select> */}
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

                        <Select
                          classNamePrefix='seleccion'
                          id="seleccionCiudad"
                          options={ciudades}
                          placeholder="Seleccionar"
                          onChange={(e)=> setValueCiudad(e.value)}
                          noOptionsMessage={()=>"No hay opciones"}
                          >
                        </Select>

                       {/*  <select 
                        className="form-control" 
                        id="seleccionCiudad" 
                        >
                        {ciudadesList.map(elemento=>(
                            <option key={elemento.idCiudad} value={elemento.idCiudad}>{elemento.nombre}</option>
                        )
                        )}
                        </select> */}
                        </div>
                      </Form.Group>
                    </div>
                    </div>
                    
                  <h4 className="card-description"> Datos S.R.I </h4>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Contribuyente especial</label>
                        <div className="col-sm-9 row align-items-center justify-content-center">
                            <div className="form-check form-check-primary">
                            <label className="form-check-label">
                                <input type="checkbox" id="contEspecial" className="form-check-input" onChange={(e) => handleCheckChange(e, contEspecial, setcontEspecial)}/> 
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
                                <input type="checkbox" id="microempresa" className="form-check-input" onChange={(e) => handleCheckChange(e, microempresa, setMicroempresa)} /> 
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
                                <input type="checkbox" id="rimpe" className="form-check-input" onChange={(e) => handleCheckChange(e, rimpe, setRimpe)}/> 
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
                                <input type="checkbox" id="agRetencion" className="form-check-input" onChange={(e) => handleCheckChange(e, agRetencion, setAgRetencion)}/> 
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
                                <input type="checkbox" id="obligado" className="form-check-input" onChange={(e) => handleCheckChange(e, obContabilidad, setObContabilidad)}/> 
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
          <Tab eventKey={2} title="Contactos de la empresa"  disabled>
          
              <CompListaContactos contactos={contactos} setContactos={setContactos}/> {/* traemos informacion del componente hijo */}
              <div className="container mt-4">
                    <div className="row justify-content-end">
                      <div className="col-sm-2">
                      <button className="btn btn-danger btn-fw" onClick={(e)=>atras(e)}
                      >Atrás</button>
                      </div>
                      <div className="col-sm-2">
                      <a href="/administracion/afiliadas">
                      <button type="button" className="btn btn-light btn-fw">Cancelar</button>
                      </a>
                      </div>
                      <div className="col-sm-2">
                      <button type="button" onClick={(e)=>submitContactos(e)} className="btn btn-success btn-fw"
                      >Siguiente</button>
                      </div>
                    </div>
                  </div>
          </Tab>
          <Tab eventKey={3} title="Requisitos" disabled>
          
              <CompListaRequisitos requisito={requisitos} setRequisitos={setRequisitos}/> {/* traemos informacion del componente hijo */}
              <div className="container mt-4">
                    <div className="row justify-content-end">
                      <div className="col-sm-2">
                      <button className="btn btn-danger btn-fw" onClick={(e)=>atras(e)}
                      >Atrás</button>
                      </div>
                      <div className="col-sm-2">
                      <a href="/administracion/afiliadas">
                      <button type="button" className="btn btn-light btn-fw">Cancelar</button>
                      </a>
                      </div>
                      <div className="col-sm-2">
                      <button className="btn btn-success btn-fw"
                      >Crear Empresa</button>
                      </div>
                    </div>
                  </div>
          </Tab>
          </Tabs>
          </div>
        </div>
    </div>
  )
}

export default CompCrearEmpresa