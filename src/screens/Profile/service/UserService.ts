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
}

export default new UserService();