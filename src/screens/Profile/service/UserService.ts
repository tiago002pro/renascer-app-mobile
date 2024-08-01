import api from "../../../services/api";

class UserService {
  private root!: string;

  constructor() {
    this.root = "/user"
  }

  public async loadUser(id: number): Promise<any> {
    try {
      const result = await api.get(this.root + `/${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async delete(id:number):Promise<any> {
    try {
      const result = await api.delete(this.root +`/${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async alterPassword(login:string, password:string, newPassword:string):Promise<any> {
    try {
      const result = await api.put(this.root + `/alter-password`, { login, password, newPassword })
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new UserService();