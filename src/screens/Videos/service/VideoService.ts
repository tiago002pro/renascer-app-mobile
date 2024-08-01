import api from "../../../services/api";

class VideoService {
  private root!: string;

  constructor() {
    this.root = "/video"
  }

  async getById(id:number) {
    try {
      const result = await api.get(this.root + `${id}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  async searchVideos(search:string) {
    try {
      const result = await api.get(this.root + `/search-videos?search=${search}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  async getLatest() {
    try {
      const result = await api.get(this.root + `/latest-videos`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  async getAllVideos() {
    try {
      const result = await api.get(this.root + `/video/all`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
  
  async getAllByCategory(category:string) {
    try {
      const result = await api.get(this.root + `/all-by-category/${category}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new VideoService();
