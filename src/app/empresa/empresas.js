import React, {useEffect, useState} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';

const URI1 = process.env.REACT_APP_API_URL+'afiliada'

const CompEmpresas = () =>{

    useEffect(()=>{
        document.title = 'Lista Empresas Afiliadas';
      },[])

    const [data, setData] = useState([]);

    //Definicion de las columnas para el datatable
    const columns = [
        {
            name: 'RUC',
            selector: row => row.RUC,
            sortable: true
        },
        {
            name: 'NOMBRE',
            selector: row => row.nombre,
            sortable: true
        },
        {
            name: 'DIRECCION',
            selector: row => row.direccion,
            wrap: true
        },
        {
            name: 'TELEFONO',
            selector: row => row.telefono1,
        },
        {
            name: 'CELULAR',
            selector: row => row.celular1,
        },
        {
            name: 'ESTADO',
            cell: (row) => <div className="form-check form-check-success">
                            
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input" checked={row.estado === 0 ? false:true} disabled/> 
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

    useEffect(() => {
        document.title = 'Empresas Afiliadas';
        llamadaAPI();
    },[]);

    return (
        <div>
            <center><h1>Empresas Afiliadas</h1></center>
            <p>Aquí puede encontrar la lista de empresas afiliadas en el sistema de REScobranzas</p>
            <a href="/empresa/crearEmpresaAfiliada">
            <button type="button" href="/empresa/crearEmpresaAfiliada" className="btn btn-primary btn-icon-text">
                        <i className="mdi mdi-plus-box btn-icon-prepend"></i>
                        Crear Nueva Empresa
            </button>
            </a>
            <p></p>
        <div className="card">
        <div className="card-body">
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

export default CompEmpresas;