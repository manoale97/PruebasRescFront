import React, {useEffect, useState} from 'react';
import { Form, Modal } from 'react-bootstrap';
import DataTable, { createTheme } from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import axios from 'axios';

const URI= process.env.REACT_APP_API_URL+'requisitos'

function CompListaRequisitos(props) {
    useEffect(()=>{
      //document.title = 'Lista Requisitos de la Empresa';
      llamadaAPI()
    },[])

    useEffect(()=>{
    if(props.requisitos){
    setReq(props.requisitos)
    }
    })

    //columnas de la tabla 
    const columns = [
        {
            name: 'Id',
            selector: row => row.idRequisito,
            omit: true
            
        },
        {
            name: 'Requisito',
            selector: row => row.nombre,
            width: "150px",
            sortable: true
            
        },
        {
            name: 'Descripcion',
            selector: row => row.descripcion,
            
            wrap: true
            
        },
        {
            name: 'Entregado',
            width: "110px",
            selector: row => row.entregado,
            cell: row => <div> 
                        {/* <select onChange={(e)=>asignarEntregado(e, row) }> */}
                        <select value={row.entregado}  onChange={(e)=>asignarEntregado(e, row) }>
                            <option value='1' >Sí</option>
                            <option value='0' >No</option>
                        </select>
                        </div>,
            
        },
        {
            cell: row => <div> 
                        <button type="button"  onClick={(e) =>eliminarRequisito(e,row)} className="btn btn-danger btn-rounded btn-sm"><i> </i><i className="mdi mdi-delete"></i></button>
                        </div>,
            width: "90px",
            
        },
        
    ];

        //columnas de la tabla del modal
        const columns1 = [
            {
                name: 'Id',
                selector: row => row.idRequisito,
                omit: true
                
            },
            {
                name: 'Requisito',
                selector: row => row.nombre,
                width: "150px",
                
            },
            {
                name: 'Descripcion',
                selector: row => row.descripcion,
                
                wrap: true
                
            },
            {
                cell: row => <div> 
                            <button type="button" onClick={(e) =>selectRequisito(e,row)} className="btn btn-success btn-rounded btn-sm"><i> </i><i className="mdi mdi-check"></i></button>
                            </div>,
                width: "90px",
                
            },
            
        ];


    const [datos,setDatos] = useState([])//requisitos traidos desde la API
    const [req,setReq] = useState([])//requisitos seleccionados

    //Definicion de la lista de requisitos
    const llamadaAPI = async() => {
        await axios.post(URI, 
            {'opcion': 0} 
        )
        .then(response=>{
            setDatos(response.data);
        }
        )
        .catch(error=>{
            console.log(error);
        })
    }

    const [changeEstado, setChangeState] = useState() //variable de estado para las re renderizaciones
    let now = new Date();//defino fecha y hora para la generacion de aleatoriedad para la re renderizacion
    
    //metodo para recoger el valor del select de cada fila
    const asignarEntregado = (e,row) => {
            row.entregado=e.target.value
            setChangeState(now)
            setReq(req) 
            props.setRequisitos(req)
    }
    //funcion para seleccionar el requisito y agregarlo en la lista general
    const selectRequisito = (e, row) => {  
        row.entregado=1 
        setReq(req.concat([row]))//cambio un estado para renderizar de nuevo
        props.setRequisitos(req.concat([row]))//pasar el estado de este componente al padre
        alert(`Ha agregado el requisito ${row.nombre}`)
    }
    
    //metodo para eliminar requisito
    const eliminarRequisito = (e, row) => {   
        //setReq(req.concat([row]))
        //props.setRequisitos(req.concat([row]))
        var conf = window.confirm('Esta seguro de eliminar este requisito')
        setChangeState(now)
        if(conf){
        var datosAux = req;
        datosAux.forEach(element => {
            if (element.idRequisito === row.idRequisito){
                var indice = datosAux.indexOf(element)
                datosAux.splice(indice,1)
                }
        })
            setReq(datosAux)//elimina al contacto por su indice
            props.setRequisitos(datosAux)//metodo para pasar el estado al componente padre

        /*setTimeout(() => {
            
            }, 200);//tiempo de espera para el re renderizado*/
        }
    }
    
    //controles del modal de requisitos
    const [showMdReq, setShowMdReq] = useState(false);
    const handleCloseR = () => setShowMdReq(false);
    const handleShowR = () => setShowMdReq(true);
  
    return (
      <div>
        <h4>Lista de Requisitos</h4>
        <button type="button" onClick={handleShowR} className="btn btn-primary btn-fw">Seleccione los requisitos</button>
        <DataTableExtensions
          columns={columns}
          data={req}
          print={false}
          export={false}
          filter={false}
          filterPlaceholder='Buscar'
        >
        <DataTable
        noHeader
        noDataComponent="No hay Requisitos"
        />
        </DataTableExtensions>

            {/* modal de requisitos*/}
                <Modal show={showMdReq} onHide={handleCloseR} size="lg">
                    <Modal.Header closeButton>
                    <Modal.Title>Requisitos</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <DataTable
                    columns={columns1}
                    data={datos}
                    noHeader
                    pagination
                    noDataComponent="No hay Requisitos"
                    />

                    </Modal.Body>
                    <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleCloseR}>
                        Cerrar
                    </button>
                    </Modal.Footer>
                </Modal>
            {/*fin modal de requisitos*/}
      </div>
    )
}

export default CompListaRequisitos