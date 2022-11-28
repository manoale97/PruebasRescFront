import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { /*useHistory*/ useNavigate  } from "react-router-dom";
import globalVar from "../global";

//Uri para llamar a la API
const URI1 = process.env.REACT_APP_API_URL+'nEmpresas'


export const SeleccionEmpresa = () => {
    //const navigate = useHistory();//funcion para redireccionar
    const navigate = useNavigate();//funcion para redireccionar
    
    const [EmpresasList, setEmpresasList]=useState([])
    const consultaEmpresas = async() =>{
        await axios.post(URI1, {'idUsuario': globalVar.idUser} )
        .then(response=>{
           
            var empresas = response.data.numEmpresas;
            //console.log(response.data.numEmpresas);
            setEmpresasList(empresas)

          })
          .catch(error=>{
            console.log(error);
          })
        }

    const handleEmpresaSeleccion = (e) =>{
        e.preventDefault();
        global.empresaId=document.getElementById('seleccionEmpresa').value;
        //navigate.push("/dashboard");
        navigate("/dashboard");
    }

    useEffect(()=>{ 
    document.title = 'Sistema Web REScobranzas';
    consultaEmpresas();
    },[]);

    //consultaEmpresas();

    
    return(
        <div>
        <h3>
            <center>Seleccione la Empresa con la cual desea trabajar</center>
        </h3>
    
        <Form.Group>
        <label htmlFor="seleccionEmpresa">Empresas</label>
        <select className="form-control" id="seleccionEmpresa">

        {EmpresasList.map(elemento=>(
            <option key={elemento.idAfiliadas} value={elemento.idAfiliadas}>{elemento.nombre}</option>
        )
        )}
        </select>
        <p></p>
        <center><button className="btn btn-outline-secondary btn-fw" onClick={handleEmpresaSeleccion}>Aceptar</button></center>
        </Form.Group>
        </div>
    )
} 

export default SeleccionEmpresa