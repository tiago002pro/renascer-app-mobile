import api from "../../../services/api";

class ScheduleService {
  private root!: string;

  constructor() {
    this.root = "/schedule"
  }

  async getAllSchedule() {
    try {
      const result = await api.get(this.root + `/all`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
  
  async getAllByValidDeadline() {
    try {
      const result = await api.get(this.root + `/all-schedule-valid-deadline`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  async getByStartDate(startDate:string) {
    try {
      const result = await api.post(this.root + `/all-by-date?startDate=${startDate}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new ScheduleService();
