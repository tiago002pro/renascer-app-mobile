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

  public async readNotification(id:number) {
    try {
      const result = await api.put(`/api/notification/read/${id}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }

  public async checkIfThereAreNotifications() {
    try {
      const result = await api.get(`/api/notification/check-if-there-are-notifications`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return []
    }
  }
}

export default new NotificationService();