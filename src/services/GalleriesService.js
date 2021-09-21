import HttpService from "./HttpService";

class GalleriesService extends HttpService
{
    getAll = async () => {
        const { data } = await this.apiCall.get(`/galleries?filter={"include":
        ["images"]}`);
        console.log('GetAll', data)
        return data;
    }

    getGallery = async (id) => {
        const { data } = await this.apiCall.get(`/galleries/${id}`);
        console.log('Service', data);
        return data;
    }
}

export default new GalleriesService();