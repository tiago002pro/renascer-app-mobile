import api from "../../../../services/api";

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

  async getLatest(page:number) {
    try {
      const result = await api.get(this.root + `/latest-videos?page=${page}`)
      return result.data.content
    } catch(error) {
      throw new Error();
    }
  }
  
  async getAllByCategory(category:string, page:number) {
    try {
      const result = await api.get(this.root + `/all-by-category?category=${category}&page=${page}`)
      return result.data.content
    } catch(error) {
      throw new Error();
    }
  }

  async getLastVideo() {
    try {
      const result = await api.get(this.root + `/last-video`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new VideoService();
