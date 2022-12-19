import React, { createContext, useState, useContext, Children } from "react";
import globalVar from "./global";
import {encriptar} from "./crypt/crypt"

const infoContext = createContext();
const changeInfoContext = createContext();

export function useInfoUserContext(){
    return useContext(infoContext)
}

export function useChangeInfoUserContext(){
    return useContext(changeInfoContext)
}

const UserInfoProvider = (props) =>{

    const [info, setInfo] = useState(globalVar);
    
    const cambiarUsuario = (value) => {
        globalVar.usuario=value
    }

    const cambiarIduser = (value) => {
        globalVar.idUser=value
    }

    const cambiarRol= (value) => {
        globalVar.rol=value
    }

    const cambiarIdEmpresa = async(value) => {
        //const valorCrypt=await encriptar(value)
        window.localStorage.setItem('idEmpresa', value);
    }

    return (
        <infoContext.Provider value={info}>
            <changeInfoContext.Provider value={[cambiarUsuario, cambiarIduser, cambiarRol, cambiarIdEmpresa]}>
                {props.children}
            </changeInfoContext.Provider>
        </infoContext.Provider>
    )
}

export default UserInfoProvider;