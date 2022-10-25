import React, { Component } from 'react';
import { Link, /*withRouter*/ } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { Trans } from 'react-i18next';

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}


class Sidebar extends Component {

  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true}); 
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  }

  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
          {/* <a className="brand-logo" href="index.html"><img src={require('../../assets/images/logo.svg')} width="50" height="50"alt="logo" /></a> */}
          <div className="brand-logo-mini" href="/dashboard"><img src={require('../../assets/images/logo.png')} width="55" height="55" alt="logo" /></div>
        </div>
        <ul className="nav">
          {//Inicio de secciones del sistema
          }
          <li className="nav-item nav-category">
            <span className="nav-link"><Trans>Navegación</Trans></span>
          </li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <Link className="nav-link" to="/dashboard">
              <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>

          {/* Sidebar empresa*/}
          <li className={ this.isPathActive('/empresa') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.empresa ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('empresa') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-briefcase"></i>
              </span>
              <span className="menu-title"><Trans>Empresa</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.empresa }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/empresa/datosEmpresa') ? 'nav-link active' : 'nav-link' } to="/empresa/datosEmpresa"><Trans>Datos</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/empresa/nominaEmpresa') ? 'nav-link active' : 'nav-link' } to="/empresa/nominaEmpresa"><Trans>Agencias</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/empresa/nominaEmpresa') ? 'nav-link active' : 'nav-link' } to="/empresa/datosEmpresa"><Trans>Cargos</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/empresa/nominaEmpresa') ? 'nav-link active' : 'nav-link' } to="/empresa/nominaEmpresa"><Trans>Nómina</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/empresa/nominaEmpresa') ? 'nav-link active' : 'nav-link' } to="/empresa/datosEmpresa"><Trans>Parámetros</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          
          {/* Sidebar productos*/}
          <li className={ this.isPathActive('/productos') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.productos ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('productos') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-apps"></i>
              </span>
              <span className="menu-title"><Trans>Productos</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.productos }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/productos/resProductos') ? 'nav-link active' : 'nav-link' } to="/productos/resProductos"><Trans>Productos</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar clientes*/}
          <li className={ this.isPathActive('/clientes') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.clientes ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('clientes') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-account-multiple"></i>
              </span>
              <span className="menu-title"><Trans>Clientes</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.clientes }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Clientes</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Certificados</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Consultar Afiliaciones</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Carga Masiva Clientes</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Cancelar Certificados</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar Ventas*/}
          <li className={ this.isPathActive('/ventas') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.ventas ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('ventas') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-chart-histogram"></i>
              </span>
              <span className="menu-title"><Trans>Ventas</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.ventas }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Carga masiva de certificados</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Ingreso Individual</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar Cobranzas*/}
          <li className={ this.isPathActive('/cobranzas') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.cobranzas ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('cobranzas') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-cash-usd"></i>
              </span>
              <span className="menu-title"><Trans>Cobranzas</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.cobranzas }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Gestión Débitos Bancarios</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Liquidaciones Empresas</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Archivo Historial de Carga Masiva</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar Facturación*/}
          <li className={ this.isPathActive('/facturacion') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.facturacion ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('facturacion') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-receipt"></i>
              </span>
              <span className="menu-title"><Trans>Facturacion</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.facturacion }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Parámetros Facturación</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Facturar</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Procesos SRI Facturas</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Notas de Crédito SRI</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar emails*/}
          <li className={ this.isPathActive('/mails') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.mails ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('mails') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-email"></i>
              </span>
              <span className="menu-title"><Trans>eMails</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.mails }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Grupos Email</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Definir cuentas</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar Reportes*/}
          <li className={ this.isPathActive('/reportes') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.reportes ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('reportes') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-file-document"></i>
              </span>
              <span className="menu-title"><Trans>Reportes</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.reportes }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Reportes de Cartera</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar IFIS*/}
          <li className={ this.isPathActive('/ifis') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.ifis ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('ifis') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-wallet-membership"></i>
              </span>
              <span className="menu-title"><Trans>RES Cobranzas IFIS</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.ifis }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Emisores Bancarios IFIS</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar Inscripciones Web*/}
          <li className={ this.isPathActive('/inscripciones-web') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.inscripciones ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('inscripciones') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-account-check"></i>
              </span>
              <span className="menu-title"><Trans>Inscripciones Web</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.inscripciones }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Aprobación de usuarios web</Trans></Link></li>
                  <li className="nav-item"> <Link className={ this.isPathActive('/clientes/resAfiliadaClientes') ? 'nav-link active' : 'nav-link' } to="/clientes/resAfiliadaClientes"><Trans>Activar Certificado Web</Trans></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>

          {/* Sidebar Administrador*/}
          <li className={ this.isPathActive('/Administracion') ? 'nav-item menu-items active' : 'nav-item menu-items' }>
            <div className={ this.state.administracion ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('administracion') } data-toggle="collapse">
              <span className="menu-icon">
                <i className="mdi mdi mdi-account-star"></i>
              </span>
              <span className="menu-title"><Trans>Administración general</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.administracion }>
              <div>
                <ul className="nav flex-column sub-menu">
                  <li className="nav-item"> <Link className={ this.isPathActive('/administracion/afiliadas') ? 'nav-link active' : 'nav-link' } to="/administracion/afiliadas">Empresas Afiliadas</Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    //console.log(window.location.pathname.startsWith(path))
    //return this.props.location.pathname.startsWith(path);
    return window.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);
//export default Sidebar;