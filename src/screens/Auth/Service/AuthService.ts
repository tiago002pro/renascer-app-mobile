import jwtDecode from "jwt-decode";
import api from "../../../services/api";
import { showMessage } from "react-native-flash-message";
import { RegisterUser } from "../../../interfaces/Register.interface";

interface Response {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

class AuthService {
  public async doLogin(login:string, password:string):Promise<Response> {
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
      throw new Error();
    }
  }

  public async doRegister(user:RegisterUser) {
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
      throw new Error();
    }
  }

  public async checkEmail(email:any):Promise<any> {
    try {
      const result = await api.post(`/auth/check-email/${email}`)
      return result.data
    } catch(error) {
      showMessage({
        message: "E-mail inválido",
        description: "Verifique seu e-mail e tente novamente.",
        type: "danger",
        duration: 3000
      })
      throw new Error();
    }
  }
}

export default new AuthService();