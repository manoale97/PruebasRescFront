import React, { Suspense, lazy, useEffect, useState } from 'react';
import { /*Switch,*/ Route, Routes, /*Redirect*/ Navigate } from 'react-router-dom';

import Spinner from '../app/shared/Spinner';

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
const CompMostrarProductos = lazy(() => import('./productosDebito/mostrarProductos'));
const CompCrearProducto = lazy(() => import('./productosDebito/crearProducto'));
////clientes
const CompCrudClientes = lazy(() => import('./clientes/crudClientes'));
////usuarios
const CompUsuarios = lazy(() => import('./usuarios/mostrarUsuarios'));
const CompCrearUsuario = lazy(() => import('./usuarios/crearUsuarios'));
const CompEdicionUsuario = lazy(() => import('./usuarios/edicionUsuarios'));


const AppRoutes = (props) => {
//class AppRoutes extends component {
  //render () {
    
      const logeado=props.logeado
   
      return (
        <Suspense fallback={<Spinner/>}>
         
        <Routes>
          
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
            <Route path="/empresa/edicionEmpresa/:id" element={ <CompEdicionEmpresa></CompEdicionEmpresa> } />
            <Route path="/empresa/nominaEmpresa" element={ <CompNominaEmpresa></CompNominaEmpresa> } />
            <Route path="/productos/mostrarProductos" element={ <CompMostrarProductos></CompMostrarProductos> } />
            <Route path="/productos/crearProducto" element={ <CompCrearProducto></CompCrearProducto> } />
            <Route path="/clientes/resAfiliadaClientes" element={ <CompCrudClientes></CompCrudClientes> } />
            <Route path="/administracion/afiliadas" element={ <CompEmpresas></CompEmpresas> } />
            <Route path="/empresa/crearEmpresaAfiliada" element={ <CompCrearEmpresa></CompCrearEmpresa> } />
            <Route path="/administracion/usuarios" element={ <CompUsuarios></CompUsuarios> } />
            <Route path="/administracion/crearUsuario" element={ <CompCrearUsuario></CompCrearUsuario> } />
            <Route path="/administracion/editarUsuario/:id" element={ <CompEdicionUsuario></CompEdicionUsuario> } />
            <Route path="*" element={ <Error404></Error404> } />
          </Route>
          <Route exact path="/login" element={<CompLogin></CompLogin>}/>
          
        </Routes>
          
      </Suspense>
      )
  //}
}

export default AppRoutes;