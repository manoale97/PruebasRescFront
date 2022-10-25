import React from 'react';
import {useState, useEffect} from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const columns = [
    {
        name: 'AGENCIA',
        selector: row => row.agencia,
        sortable: true
    },
    {
        name: 'EMPLEADO',
        selector: row => row.empleado,
        sortable: true
    },
    {
        name: 'EMPLEADO NOMBRE',
        selector: row => row.nombre,
        sortable: true
    },
    {
        name: 'PARROQUIA',
        selector: row => row.parroquia,
        wrap: true
    },
    {
        name: 'DIRECCION',
        selector: row => row.direccion,
    },
    {
        name: 'TELÉFONO',
        selector: row => row.telefono,
    },
    {
        name: 'CELULAR',
        selector: row => row.celular,
    },
    {
        cell: () => <div> 
                        <button type="button" className="btn btn-warning btn-rounded btn-sm"><i> </i><i className="mdi mdi-border-color"></i></button>
                        <button type="button" className="btn btn-danger btn-rounded btn-sm"><i> </i><i className="mdi mdi mdi-delete"></i></button>
                    </div>,
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
    },
];

const data = [
    {
        id: 1,
        agencia: '00001',
        empleado: '33301',
        nombre: 'Rodrigo Rosero',
        parroquia: 'Guayllabamba',
        direccion: 'AV SIMON BOLIVAR Y EL AGUACATE PARQUE DEL GUAMBRA',
        telefono: '022368482',
        celular: '0990016984',
    },
]

const CompNominaEmpresa = () => {
    useEffect(() => {
        document.title = 'Nómina Empresa';
      });
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

export default CompNominaEmpresa