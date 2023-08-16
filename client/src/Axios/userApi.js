import axios from "axios";

const url = "http://localhost:4000"

//register api

const registerApi = async (registerData) => {
    try{
        const res = axios.post(url+"/register", registerData)
        return res
    }catch(e){
        console.log(e)
    }
}

//login api

const loginApi = async (loginData) => {
    try{
        const res = axios.post(url+"/login", loginData)
        return res
    }catch(e){
        console.log(e)
    }
}

export {registerApi, loginApi}
