import api from "../../../services/api";

class VideoService {
  async getAllVideos() {
    try {
      const result = await api.get(`/api/video/all`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
  
  async getAllByCategory(category:string) {
    try {
      const result = await api.get(`/auth/all-videos-by-category/${category}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  async getLatest() {
    try {
      const result = await api.get(`/auth/latest-videos`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }

  async searchVideos(search:string) {
    try {
      const result = await api.get(`/auth/search-videos?search=${search}`)
      return result.data
    } catch(error) {
      throw new Error();
    }
  }
}

export default new VideoService();
