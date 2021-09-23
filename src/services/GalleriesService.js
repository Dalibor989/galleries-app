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

    addComment = async (comment, galleryId) => {
        const { data } = await this.apiCall.post(`/galleries/${galleryId}/comments`, comment);

        return data;
    }

    deleteComment = async (id) => {
        const { data } = await this.apiCall.delete(`/comments/${id}`)

        return data;
    }

    addGallery = async (newGallery) => {
        const { data } = await this.apiCall.post(`/galleries`, newGallery);

        return data;
    }

    edit = async (id, gallery) => {
        const { data } = await this.apiCall.get(`/galleries/${id}`, gallery);
        
        return data;
    }
}

export default new GalleriesService();