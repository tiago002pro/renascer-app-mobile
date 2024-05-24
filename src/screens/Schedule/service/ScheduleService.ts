import api from "../../../services/api";

class ScheduleService {
  async getAllSchedule() {
    try {
      const result = await api.get(`/api/schedule/all`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }
  
  async getAllByValidDeadline() {
    try {
      const result = await api.get(`/auth/all-schedule-valid-deadline`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }

  async getByStartDate(startDate:string) {
    try {
      const result = await api.post(`/auth/all-schedule/by-date?startDate=${startDate}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
}

export default new ScheduleService();
