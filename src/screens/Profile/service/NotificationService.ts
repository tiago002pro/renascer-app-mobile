import api from "../../../services/api";

class NotificationService {
  public async getAllNotifications() {
    try {
      const result = await api.get(`/api/notification/all`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }
}

export default new NotificationService();