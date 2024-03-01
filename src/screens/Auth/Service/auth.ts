import api from "../../../services/api";
import { showMessage } from "react-native-flash-message";

import { RegisterUser } from "../../../interfaces/Register.interface";
import jwtDecode from "jwt-decode";

interface Response {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export async function doLogin(login:string, password:string):Promise<Response> {
  console.log("doLogin", login, password);
  
  if (!login || !password) return null
  try {
    const result = await api.post('/auth/login', { login, password })
    const tokenDecoded:any = jwtDecode(result.data.token)

    return {
      token: result.data.token,
      user: {
        id: tokenDecoded.sub,
        name: tokenDecoded.name,
        email: tokenDecoded.email
      }
    }
  } catch(error:any) {
    showMessage({
      message: "E-mail ou senha inválidos",
      description: "Porfavor verifique os dados e tente novamente.",
      type: "danger",
      duration: 3000
    })
    return null
  }
}

export async function doRegister(user:RegisterUser) {
  if (!user.name || !user.login || !user.password) return null
  try {
    const result = await api.post('/auth/register', user)
    return result.data
  } catch (error:any) {
    if (error.response?.status == '400') {
      showMessage({
        message: "Esse e-mail já foi utilizado.",
        type: "warning",
        duration: 3000
      })
    } else {
      showMessage({
        message: "Algo deu errado",
        description: "Tente novamente.",
        type: "danger",
        duration: 3000
      })
    }
    return null
  }
}