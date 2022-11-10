import React, { useEffect, useState} from 'react';
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
      <div className="container-scroller">
        { sidebarComponent }
        <div className="container-fluid page-body-wrapper">
          { navbarComponent }
          <div className="main-panel">
            <div className="content-wrapper">
              <AppRoutes/>
            </div>
            { footerComponent }
          </div>
        </div>
      </div>
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
