import { ScheduleDTO } from "../../../interfaces/Schedule.interface";
import api from "../../../services/api";

class ScheduleService {
  async getAllSchedule():Promise<any[]> {
    try {
      const result = await api.get(`/api/schedule/all`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }
  
  async getAllByValidDeadline():Promise<ScheduleDTO[]> {
    try {
      const result = await api.get(`/auth/all-schedule-valid-deadline`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }

  async getByStartDate(startDate:string):Promise<any> {
    try {
      const result = await api.post(`/auth/all-schedule/by-date?startDate=${startDate}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }
}

export default new ScheduleService();
