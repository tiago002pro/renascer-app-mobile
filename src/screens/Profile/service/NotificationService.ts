import api from "../../../services/api";

class NotificationService {
  public async getAllNotifications(userId:number) {
    try {
      const result = await api.get(`/api/notification/all`, {params: {userId}})
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

  public async checkIfThereAreNotifications(userId:number) {
    try {
      const result = await api.get(`/api/notification/check-if-there-are-notifications`, {params: {userId}})
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async readAllNotifications(userId:number):Promise<any> {
    try {
      const result = await api.put(`/api/notification/read-all/${userId}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async deleteAllNotifications(userId:number) {
    try {
      const result = await api.delete(`/api/notification/delete-all`, {params: {userId}})
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new NotificationService();