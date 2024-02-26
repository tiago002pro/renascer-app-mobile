import api from "../../../services/api";

class ScheduleService {
  async getAllSchedule():Promise<any[]> {
    try {
      const result = await api.get(`/api/schedule/all`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
  
  async getAllByValidDeadline():Promise<any[]> {
    try {
      const result = await api.get(`/auth/all-schedule-valid-deadline`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
}

export default new ScheduleService();
