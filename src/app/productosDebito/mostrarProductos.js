import React, {useEffect, useState} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import globalVar from '../global';

const URI1 = process.env.REACT_APP_API_URL+'producto'

const columns = [
    {
        name: 'RUC',
        selector: row => row.ruc,
        sortable: true
    },
    {
        name: 'NOMBRE',
        selector: row => row.nombre,
        sortable: true
    },
    {
        name: 'PARROQUIA',
        selector: row => row.parroquia,
        sortable: true
    },
    {
        name: 'DIRECCION',
        selector: row => row.direccion,
        wrap: true
    },
    {
        name: 'TELEFONO',
        selector: row => row.telefono,
    },
    {
        name: 'CELULAR',
        selector: row => row.celular,
    },
    {
        name: 'ESTADO',
        cell: () => <div className="form-check form-check-success">
                          <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" defaultChecked disabled/> 
                            <i className="input-helper"></i>
                          </label>
                        </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        maxWidth: '50px',
        center: true,
    },
    {
        cell: () => <div> <button type="button" className="btn btn-warning btn-rounded btn-sm"><i> </i><i className="mdi mdi-border-color"></i></button></div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

const data = [
    {
        id: 1,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
]


const CompMostrarProductos = () => {

    const navigate =  useNavigate();//metodo para redireccionar

    useEffect(()=>{
        document.title = 'Lista de Productos';
        //llamadaAPI();
      },[])

    const [empresa, setEmpresa] = useState('')

    //Estado de datos para el datatable
    const [data,setData]=useState([])

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

    return (
        <div>

            <center><h1>Productos</h1></center>

            <div className="card">
            <div className="card-body">
            <p>Aquí puede encontrar la lista de productos que existen en el sistema de REScobranzas.</p>
            <p>Seleccione uno para ver más detalles.</p>
            <a href="/productos/crearProducto">
            <button type="button" className="btn btn-primary btn-icon-text">
                        <i className="mdi mdi-plus-box btn-icon-prepend"></i>
                        Crear Nuevo Producto
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

export default CompMostrarProductos