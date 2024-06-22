import api from "../../../services/api";

class UserService {
  public async loadUser(id: number): Promise<any> {
    try {
      const result = await api.get(`/api/user/${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async delete(id:number):Promise<any> {
    try {
      const result = await api.delete(`/api/user/${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new UserService();