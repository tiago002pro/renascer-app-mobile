import api from "../../../services/api";

class NotificationService {
  private root!: string;

  constructor() {
    this.root = "/notification"
  }

  public async getAllNotifications(userId:number) {
    try {
      const result = await api.get(this.root + `/all`, {params: {userId}})
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async readNotification(id:number) {
    try {
      const result = await api.put(this.root + `/read/${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async checkIfThereAreNotifications(userId:number) {
    try {
      const result = await api.get(this.root + `/check-if-there-are-notifications`, {params: {userId}})
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async readAllNotifications(userId:number):Promise<any> {
    try {
      const result = await api.put(this.root + `/read-all/${userId}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  public async deleteAllNotifications(userId:number) {
    try {
      const result = await api.delete(this.root + `/delete-all`, {params: {userId}})
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new NotificationService();