import React, { Component, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Error404 = () => {
  const navigate = useNavigate();//funcion para redireccionar

  useEffect(()=>{ 
    navigate("/error-pages/error-404")
    },[]);

  return (
    <div>
      <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
        <div className="row flex-grow">
          <div className="col-lg-8 mx-auto text-white">
            <div className="row align-items-center d-flex flex-row">
              <div className="col-lg-6 text-lg-right pr-lg-4">
                <h1 className="display-1 mb-0">404</h1>
              </div>
              <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                <h2>Lo lamentamos!</h2>
                <h3 className="font-weight-light">La página que estás buscando no ha sido encontrada.</h3>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12 text-center mt-xl-2">
                <Link className="text-white font-weight-medium" to="/dashboard">Regresar al inicio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Error404
