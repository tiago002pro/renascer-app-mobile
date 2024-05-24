import api from "../../../services/api";

class VideoService {
  async getAllVideos() {
    try {
      const result = await api.get(`/api/video/all`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
  
  async getAllByCategory(category:string) {
    try {
      const result = await api.get(`/auth/all-videos-by-category/${category}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }

  async getLatest() {
    try {
      const result = await api.get(`/auth/latest-videos`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }

  async searchVideos(search:string) {
    try {
      const result = await api.get(`/auth/search-videos?search=${search}`)
      return result.data
    } catch(error) {
      console.log("error", error);
      return null
    }
  }
}

export default new VideoService();
