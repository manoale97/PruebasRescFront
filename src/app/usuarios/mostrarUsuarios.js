import React, {useEffect, useState} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import globalVar from '../global';

const URI1 = process.env.REACT_APP_API_URL+'usuario'

const CompUsuarios = () =>{

    const navigate =  useNavigate();//metodo para redireccionar

    useEffect(()=>{
        document.title = 'Lista de Usuarios';
        llamadaAPI();
      },[])
    
    const [data,setData]=useState([])
    //Definicion de las columnas para el datatable
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            omit:true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre+' '+row.apellido,
            sortable: true
        },
        {
            name: 'CORREO',
            selector: row => row.correo,
            wrap: true
        },
        {
            name: 'ESTADO',
            selector: row => row.estado,
        },
        {
            name: 'ROL',
            selector: row => row.rol,
        },
        {
            cell: (row) => <div> 
                <button type="button" onClick={(e)=>editarUsuario(e, row)} className="btn btn-warning btn-rounded btn-sm"><i> </i><i className="mdi mdi-border-color"></i></button>
                <button type="button" onClick={(e)=>eliminarUsuario(e, row)} className="btn btn-danger btn-rounded btn-sm"><i> </i><i className="mdi mdi-delete"></i></button>
                </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    //Definicion de los datos
    const llamadaAPI = async() => {
        await axios.post(URI1, 
            {'opcion': 0} 
        )
        .then(response=>{
            
            setData(response.data);
        }
        )
        .catch(error=>{
            console.log(error);
        })
    }

    //Metodo para editar usuario pasando como parametro el id
    const editarUsuario = (e, row) => {
        e.preventDefault();
        navigate(`/administracion/editarUsuario/${row.id}`)
    }

    //eliminar usuario
    const eliminarUsuarioAPI = async(id) => {
        try {
            await axios.post(URI1, 
                {
                'opcion': 6,
                'estado': 2,
                'id':id
            })        
        } catch (error) {
            console.log(error)
        }
    }
    const eliminarUsuario = async(e, row) => {
        if(row.id!==globalVar.idUser){
        e.preventDefault();
        var conf = window.confirm('El usuario será desactivado y en un plazo de tiempo se realizará su eliminación permanente.\nContinuar?')
        if(conf){
        await eliminarUsuarioAPI(row.id)
        window.alert('Usuario eliminado con éxito')
        window.location.reload()
        }
    }else(
        window.alert('No puede eliminar su mismo usuario')
    )
    }

    return (
        <div>
            <center><h1>Usuarios</h1></center>
            
            <div className="card">
            <div className="card-body">
            <p>Aquí puede encontrar la lista de usuarios que existen en el sistema de REScobranzas.</p>
            <p>Seleccione uno para ver más detalles.</p>
            <a href="/administracion/crearUsuario">
            <button type="button" className="btn btn-primary btn-icon-text">
                        <i className="mdi mdi-plus-box btn-icon-prepend"></i>
                        Crear Nuevo Usuario
            </button>
            </a>
            
            <hr size="8px" color="white" />
            
      
        <DataTableExtensions
          columns={columns}
          data={data}
          print={false}
          export={false}
          filterPlaceholder='Buscar'
        >
        <DataTable
        noHeader
        pagination
        />
        </DataTableExtensions>
            </div>
        </div>
        </div>
    )

}

export default CompUsuarios;