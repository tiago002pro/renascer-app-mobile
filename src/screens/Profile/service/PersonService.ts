import api from "../../../services/api";

class PersonService {
  private root!: string;

  constructor() {
    this.root = "/person"
  }

  public async update(person:any) {
    try {
      const result = await api.put(this.root + `/update`, person)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new PersonService();