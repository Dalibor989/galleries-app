import HttpService from "./HttpService";

class GalleriesService extends HttpService
{
    getAll = async () => {
        const { data } = await this.apiCall.get(`/galleries`);
        
        return data;
    }

    getGallery = async (id) => {
        const { data } = await this.apiCall.get(`/galleries/${id}`);
        
        return data;
    }
}

export default new GalleriesService();