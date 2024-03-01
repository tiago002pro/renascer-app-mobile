import api from "../../../services/api";

class PersonService {
  public async save(person:any) {
    try {
      const result = await api.put(`/api/person/save`, person)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }

  public async update(person:any) {
    try {
      const result = await api.put(`/api/person/update/${person.id}`, person)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
}

export default new PersonService();