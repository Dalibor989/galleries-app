import HttpService from "./HttpService";

class GalleriesService extends HttpService
{
    getAll = async (number = 1, title= "") => {
        let endpoint = "/galleries/?page=${number}";

        if(title) {
            endpoint += `&title={title}`
        }

        const { data } = await this.apiCall.get(endpoint);
        
        return data;
    }

    getGallery = async (id) => {
        const { data } = await this.apiCall.get(`/galleries/${id}`);
        
        return data;
    }

    getMyGalleries = async (id) => {
        const { data } = await this.apiCall.get(`/my-galleries/${id}`);

        return data;
    }
}

export default new GalleriesService();