import api from "../../../services/api";

class NotificationService {
  public async getAllNotifications() {
    try {
      const result = await api.get(`/api/notification/all`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async readNotification(id:number) {
    try {
      const result = await api.put(`/api/notification/read/${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async checkIfThereAreNotifications() {
    try {
      const result = await api.get(`/api/notification/check-if-there-are-notifications`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new NotificationService();