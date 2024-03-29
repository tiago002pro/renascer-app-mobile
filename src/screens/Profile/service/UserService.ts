import api from "../../../services/api";

class UserService {
  public async loadUser(id: number): Promise<any> {
    try {
      const result = await api.get(`/api/user/${id}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }

  public async delete(id:number):Promise<any> {
    try {
      const result = await api.delete(`/api/user/${id}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }

  public async recoverPassword(email:any):Promise<any> {
    try {
      const result = await api.post(`/api/user/recover-password/${email}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
}

export default new UserService();