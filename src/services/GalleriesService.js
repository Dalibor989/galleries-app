import HttpService from "./HttpService";

class GalleriesService extends HttpService
{
    getAll = async (number = 1) => {
        const { data } = await this.apiCall.get(`/galleries/?page=${number}`);
        
        return data;
    }

    getGallery = async (id) => {
        const { data } = await this.apiCall.get(`/galleries/${id}`);
        
        return data;
    }
}

export default new GalleriesService();