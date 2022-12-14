import React, { Component, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link /*Redirect, useHistory*/, useNavigate, redirect } from 'react-router-dom';
import { Trans } from 'react-i18next';
import globalVar from '../global';
import {Button, Collapse} from 'react-bootstrap';

const Navbar = () => {
  
  const toggleOffcanvas=()=>{
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }
  const toggleRightSidebar=()=> {
    document.querySelector('.right-sidebar').classList.toggle('open');
  } 

  //const navigate = useHistory();
  const navigate = useNavigate();

  //metodo para navegar a la seleccion de empresa
  const handleEmpresaSeleccion = () =>{
    navigate('/seleccionEmpresa')
  }
  //Metodo para cerrar sesion
  const CerrarSesionHandler=async()=> {
    async function cambiarToken(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
    await cambiarToken();
    window.localStorage.removeItem('idEmpresa');
    globalVar.usuario='';
    setTimeout(() => {navigate("/login")}, 500);
  } 

    return (
      <nav className="navbar p-0 fixed-top d-flex flex-row">
        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/dashboard"><img src={require('../../assets/images/logo.svg')} alt="logo" /></Link>
        </div>
        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler align-self-center" type="button" onClick={ () => document.body.classList.toggle('sidebar-icon-only') }>
            <span className="mdi mdi-menu"></span>
          </button>
  
          <ul className="navbar-nav navbar-nav-right">
            
            <Dropdown alignRight as="li" className="nav-item">
              <Dropdown.Toggle as="a" className="nav-link cursor-pointer no-caret">
                <div className="navbar-profile">
                  {/*<img className="img-xs rounded-circle" src={require('../../assets/images/faces/face1.jpg')} alt="profile" />*/}
                  <p className="mb-0 d-none d-sm-block navbar-profile-name">Hola {globalVar.usuario}</p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="navbar-dropdown preview-list navbar-profile-dropdown-menu">
                <h6 className="p-3 mb-0"><Trans>Profile</Trans></h6>
                <Dropdown.Divider />
                <Dropdown.Item href="!#" onClick={evt =>evt.preventDefault()} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-settings text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Configuraciones</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="preview-item" onClick={handleEmpresaSeleccion}>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi mdi-flattr text-warning"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Seleccionar Empresa</p>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={CerrarSesionHandler} className="preview-item">
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1"><Trans>Cerrar Sesi??n</Trans></p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" onClick={toggleOffcanvas}>
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    );
  
}

export default Navbar;
