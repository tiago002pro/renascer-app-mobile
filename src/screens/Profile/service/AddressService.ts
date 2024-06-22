import axios from "axios"

class AddressService {
  public async getAddressByCep(cep: string): Promise<any> {
    try {
      const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new AddressService();