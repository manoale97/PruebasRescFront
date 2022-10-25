import React, { Suspense, lazy, useEffect, useState } from 'react';
import { /*Switch,*/ Route, Routes, /*Redirect*/ Navigate } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';
import axios from 'axios';

const URI = process.env.REACT_APP_API_URL+'tokvalid'

const Dashboard = lazy(() => import('./dashboard/Dashboard'));

const Buttons = lazy(() => import('./basic-ui/Buttons'));
const Dropdowns = lazy(() => import('./basic-ui/Dropdowns'));
const Typography = lazy(() => import('./basic-ui/Typography'));

const BasicElements = lazy(() => import('./form-elements/BasicElements'));

const BasicTable = lazy(() => import('./tables/BasicTable'));

const Mdi = lazy(() => import('./icons/Mdi'));

const ChartJs = lazy(() => import('./charts/ChartJs'));

const Error404 = lazy(() => import('./error-pages/Error404'));
const Error500 = lazy(() => import('./error-pages/Error500'));

const Login = lazy(() => import('./user-pages/Login'));
const Register1 = lazy(() => import('./user-pages/Register'));

//Rutas y componentes del sistema

////login
const ProtectedRoute = lazy(() => import('./ProtectedRoutes'));
const CompLogin = lazy(() => import('./login/Login'));
////empresas
const SeleccionEmpresa = lazy(() => import('./dashboard/SeleccionEmpresa.js'));
const CompDatosEmpresa = lazy(() => import('./empresa/datosEmpresa.js'));
const CompEdicionEmpresa = lazy(() => import('./empresa/edicionEmpresa.js'));
const CompNominaEmpresa = lazy(() => import('./empresa/nominaEmpresa.js'));
const CompEmpresas = lazy(() => import('./empresa/empresas.js'));
const CompCrearEmpresa = lazy(()=>import('./empresa/crearEmpresa.js'))
////productos
const CompCrudProductos = lazy(() => import('./productos/crudProductos'));
////clientes
const CompCrudClientes = lazy(() => import('./clientes/crudClientes'));





const AppRoutes = () => {
//class AppRoutes extends component {
  //render () {
    //hook para setear el estado de login
    const [logeado, setlogeado]=useState(false)
    const [numE, setnumE]=useState(0)

    var token = document.cookie //extrae el token de la cookie
    token = token.replace('token=','')

    const validaciones = async() =>{//validaciones para el ruteo condicional
      if ( token ){
      await axios.post(URI, {'token':`${token}`} )//llamado a la api para la validacion del token
      .then(response=>{
          //guarda variables o estados en los que se define el ruteo condicional
          global.name=response.data.user[0].nombre
          global.idUser=response.data.user[0].id
          global.nEmpresas=response.data.user[1].length
          //console.log(response.data.user[1].length)

          setnumE(response.data.user[1].length)
          setlogeado(true)
        })
        .catch(error=>{
          console.log(error);
          setlogeado(false)
        })
      }else{
      setlogeado(false)
      }
    }

    //hook para llamar al token de sesion
    useEffect(()=>{
      validaciones();    
    },[])
      
    var nempresas=numE;
  
   
      return (
        <Suspense fallback={<Spinner/>}>
         
        <Routes>
          
          
          {/* <Route exact path="/login" element={<CompLogin></CompLogin>}/> */}
          
          <Route path="/basic-ui/buttons" element={ <Buttons></Buttons> } />: 
          <Route path="/basic-ui/dropdowns" element={ <Dropdowns></Dropdowns> } />
          <Route path="/basic-ui/typography" element={ <Typography></Typography> } />

          <Route path="/form-Elements/basic-elements" element={ <BasicElements></BasicElements> } />

          <Route path="/tables/basic-table" element={ <BasicTable></BasicTable> } />

          <Route path="/icons/mdi" element={ <Mdi></Mdi> } />

          <Route path="/charts/chart-js" element={ <ChartJs></ChartJs> } />


          <Route path="/user-pages/login-1" element={ <Login></Login> } />
          <Route path="/user-pages/register-1" element={ <Register1></Register1> } />

          <Route path="/error-pages/error-404" element={ <Error404></Error404> } />
          <Route path="/error-pages/error-500" element={ <Error500></Error500> } />

{/* rutas del sistema */}
          <Route element={<ProtectedRoute user={logeado}/>}>
            <Route path="/dashboard" element={ <Dashboard></Dashboard> } />
            <Route path="/seleccionEmpresa" element={ <SeleccionEmpresa></SeleccionEmpresa> } />
            <Route path="/empresa/datosEmpresa" element={<CompDatosEmpresa></CompDatosEmpresa>} />
            <Route path="/empresa/edicionEmpresa" element={ <CompEdicionEmpresa></CompEdicionEmpresa> } />
            <Route path="/empresa/nominaEmpresa" element={ <CompNominaEmpresa></CompNominaEmpresa> } />
            <Route path="/productos/resProductos" element={ <CompCrudProductos></CompCrudProductos> } />
            <Route path="/clientes/resAfiliadaClientes" element={ <CompCrudClientes></CompCrudClientes> } />
            <Route path="/administracion/afiliadas" element={ <CompEmpresas></CompEmpresas> } />
            <Route path="/empresa/crearEmpresaAfiliada" element={ <CompCrearEmpresa></CompCrearEmpresa> } />
            <Route path="*" element={ <Error404></Error404> } />
          </Route>
          <Route exact path="/login" element={<CompLogin></CompLogin>}/>
          
          {/* <Route exact path="/login" element={
            <ProtectedRoute user={logeado} islogin={true}>
          <CompLogin></CompLogin>
          </ProtectedRoute>
          }/> */}

          {/*<Route path="/login" element={ CompLogin } />*/}
          {/*<Redirect to="/dashboard" />*/}
        </Routes>
          
      </Suspense>
      )
  //}
}

export default AppRoutes;