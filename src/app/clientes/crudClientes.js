import React from 'react';
import {useState} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

//const $ = require('jquery');
//$.DataTable = require('datatables.net');
//const tableRef = useRef()

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
    {
        id: 2,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
    {
        id: 3,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
    {
        id: 4,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
    {
        id: 5,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
    {
        id: 6,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
    {
        id: 7,
        ruc: '1719002683001',
        nombre: 'FASTNETT',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
        estado: '1',
    },
]


const CompCrudClientes = () => {

    const [empresa, setEmpresa] = useState('')

    return (
        <DataTableExtensions
          columns={columns}
          data={data}
          print={false}
          export={false}
        >
        <DataTable
        noHeader
        pagination
        //theme="estiloTablas"
        //highlightOnHover
            //columns={columns}
            //data={data}
        />
        </DataTableExtensions>
    )
}

export default CompCrudClientes