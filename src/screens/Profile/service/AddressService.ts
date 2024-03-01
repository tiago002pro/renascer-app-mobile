import axios from "axios"
import api from "../../../services/api";

class AddressService {
  public async getAddressByCep(cep: string): Promise<any> {
    try {
      const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
  
  public async save(address:any) {
    try {
      const result = await api.put(`/api/address/save`, address)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
  
  public async update(address:any) {
    try {
      const result = await api.put(`/api/address/update/${address.id}`, address)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
}

export default new AddressService();