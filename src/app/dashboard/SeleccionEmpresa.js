import React, {useEffect, useState} from "react";
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { /*useHistory*/ useNavigate  } from "react-router-dom";
import globalVar from "../global";
import { useChangeInfoUserContext } from "../infoUserProvider";

//Uri para llamar a la API
const URI1 = process.env.REACT_APP_API_URL+'nEmpresas'
const URI2 = process.env.REACT_APP_API_URL+'afiliada'


export const SeleccionEmpresa = () => {
    //const navigate = useHistory();//funcion para redireccionar
    const navigate = useNavigate();//funcion para redireccionar
    
    const [EmpresasList, setEmpresasList]=useState([])
    const consultaEmpresas = async() =>{
        if(globalVar.rol===1 || globalVar.rol===0){
            await axios.post(URI2, {'opcion': 0} )
        .then(response=>{
           
            var empresas = response.data;
            //console.log(response.data);
            setEmpresasList(empresas)

          })
          .catch(error=>{
            console.log(error);
          })
        }else{
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
        }
        //metodo traido del context para setear la variable global de empresaID
        const setIdEmpresa=useChangeInfoUserContext()[3]

    const handleEmpresaSeleccion = async(e) =>{
        e.preventDefault();
        
        await setIdEmpresa(parseInt(document.getElementById('seleccionEmpresa').value));
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
            <option key={elemento.RUC} value={elemento.RUC}>{elemento.nombre}</option>
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