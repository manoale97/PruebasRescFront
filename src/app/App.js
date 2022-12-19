import React, { useContext, useEffect, useState} from 'react';
//import { withRouter } from 'react-router-dom';
import './App.scss';
import AppRoutes from './AppRoutes';
import Navbar from './shared/Navbar';
import Sidebar from './shared/Sidebar';
import Footer from './shared/Footer';
//import { withTranslation } from "react-i18next";

import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from 'axios';
import globalVar from './global';
import UserInfoProvider from './infoUserProvider.jsx';
import { encriptar, desencriptar } from './crypt/crypt';

const URI = process.env.REACT_APP_API_URL+'tokvalid'

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

//class App extends Component {
const App = () => {

  //hook para setear el estado de login
  const [logeado, setlogeado]=useState(false)


  var token = document.cookie //extrae el token de la cookie
  token = token.replace('token=','')

  const validaciones = async() =>{//validaciones para el ruteo condicional
    if ( token ){
      try {
        const response = await axios.post(URI, {'token':`${token}`} )//llamado a la api para la validacion del token
        globalVar.usuario=response.data.user[0].nombre
        globalVar.idUser=response.data.user[0].id
        globalVar.rol=response.data.user[0].rol

        setlogeado(true)
      } catch (error) {
        console.log(error);
        setlogeado(false)
      }
    }else{
    setlogeado(false)
    }
  }

  //hook para llamar al token de sesion
  useEffect(()=>{
    validaciones();    
  },[])

  /*state = {}
  componentDidMount() {
    this.onRouteChanged();
  }*/
  
  const [isFullPageLayout, setState]=useState()

  useEffect(()=>{
    //validaciones();   
      onRouteChanged();
    
  },[window.location.pathname])

  //render () {
    /*let navbarComponent = !this.state.isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !this.state.isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer/> : '';*/

    let navbarComponent = !isFullPageLayout ? <Navbar/> : '';
    let sidebarComponent = !isFullPageLayout ? <Sidebar/> : '';
    let footerComponent = !isFullPageLayout ? <Footer/> : '';

    return (
      <UserInfoProvider>
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          { navbarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes logeado={logeado}/>
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
      </UserInfoProvider>
    );
  //}

  /*componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }*/

  function onRouteChanged() {
    console.log("ROUTE CHANGED");
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/login','/user-pages/login-1', '/user-pages/login-2', '/user-pages/register-1', '/user-pages/register-2', '/user-pages/lockscreen', '/error-pages/error-404', '/error-pages/error-500', '/general-pages/landing-page'];
    for ( let i = 0; i < fullPageLayoutRoutes.length; i++ ) {
      if (/*this.props.location.pathname*/window.location.pathname === fullPageLayoutRoutes[i]) {
        /*this.setState({
          isFullPageLayout: true
        })*/
        setState(true)
        document.querySelector('.page-body-wrapper').classList.add('full-page-wrapper');
        break;
      } else {
        /*this.setState({
          isFullPageLayout: false
        })*/
        setState(false)
        document.querySelector('.page-body-wrapper').classList.remove('full-page-wrapper');
      }
    }
  }
  //}

}

export default /*withTranslation()*/(withRouter(App));
//export default /*withTranslation()*/App;
