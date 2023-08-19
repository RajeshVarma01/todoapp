import axios from "axios";

// const url = "http://localhost:4000"

//register api
const prodUrl = "https://todo-app-xj31.onrender.com"

const registerApi = async (registerData) => {
    try{
        const res = axios.post(prodUrl+"/register", registerData)
        return res
    }catch(e){
        console.log(e)
    }
}

//login api
// const prodUrl = process.env.NODE_ENV === "development"? "https://todo-app-xj31.onrender.com":url

console.log("url", prodUrl)
const loginApi = async (loginData) => {
    try{
        const res = axios.post(prodUrl+"/login", loginData)
        return res
    }catch(e){
        console.log(e)
    }
}

export {registerApi, loginApi}
