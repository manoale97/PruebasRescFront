import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { /*useHistory*/ useNavigate  } from "react-router-dom";


const URI= process.env.REACT_APP_API_URL+'login'

const URItok = process.env.REACT_APP_API_URL+'tokvalid'

const CompLogin = () => {
  
  const [correo, setCorreo] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [login, setLogin] = useState(false);

  var token = document.cookie //extrae el token de la cookie
  token = token.replace('token=','')

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Ingresar al Sistema Rescobranzas';
  },[]);
  
  const iniciarSesion = async(e) =>{ //Se define un metodo para llamar a la API para pedir Token
    e.preventDefault();
    await axios.post(URI, {correo: correo, contrasenia:contrasenia})// llamadas HTTP
    .then(response=>{
      
      //document.cookie = `token=${response.data.token}; max-age=${60*240}; path=/; samesite=strict`
      document.cookie = `token=${response.data.token}; path=/; samesite=strict`
      
      var respuesta=response.data.token;//Extrae la respuesta
      
      if(respuesta!==undefined){//y la evalua para ver si existe o no para guardarla en una cookie y redireccionar
        
        
        axios.post(URItok, {'token': `${response.data.token}`} )//llamado a la api para la validacion del token
        .then(response=>{// en el token esta la info del usuario
          var numEmpresas = response.data.user[1]
          var rol = response.data.user[0].rol
          var estado = response.data.user[0].estado
          
          if(estado === 1) {//revisa si el usuario esta activo y redirecciona dependiendo del rol y las nempresas que trabaja
             if(numEmpresas===1 && rol!==0){
              navigate("/dashboard");
              console.log("Se fue a una empresa (dashboard)")
              window.location.reload()
            }else if(numEmpresas>1 || rol===1 || rol===0){
              
              navigate("/seleccionEmpresa");
              console.log("Se fue a varias empresas (seleccion)")
              window.location.reload()
            }else{
              console.log("error")
            }
          }else{
            alert('Usuario Inactivo')
          } 
        })
        .catch(error=>{
          console.log(error);
        })


        
      }else{//si no hay respuesta de token, entonces elimina cualquier cookie y muestra un alert
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        alert('Credenciales Incorrectas')
        setLogin(false);
      }
      
    })
    .catch(error=>{
      console.log(error);
      
    })
  }


  return (
      <div className="fondologin">
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                  <center><img src={require("../../assets/images/logo.svg")} alt="logo" /></center>
                </div>
                <h4>Bienvenido al sistema de Rescobranzas</h4>
                <h6 className="font-weight-light">Inicie sesión para continuar.</h6>
                <Form onSubmit={iniciarSesion} className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Correo" size="lg" className="h-auto" 
                    //value='correo'
                    id="correo"
                    onChange={ (e)=> setCorreo(e.target.value)}
                    value={correo}
                    required
                    />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Contraseña" size="lg" className="h-auto" 
                    //value='contrasenia'
                    onChange={ (e)=> setContrasenia(e.target.value)} 
                    value={contrasenia}
                    required
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <button type='submit' className="btn btn-block btn-danger btn-lg font-weight-medium auth-form-btn"
                   
                    >Iniciar Sesión</button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    {/* <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Mantener sesión
                      </label>
                    </div> */}
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Olvidé la contraseña</a>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }

export default CompLogin
