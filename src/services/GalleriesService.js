import HttpService from "./HttpService";

class GalleriesService extends HttpService
{
    getAll = async (number = 1, tearm= "") => {
        let endpoint = `/galleries/?page=${number}`;

        if(tearm) {
            endpoint += `&tearm={tearm}`
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

    deleteGallery = async (id) => {
        const { data } = await this.apiCall.delete(`/galleries/${id}`)

        return data;
    }

    edit = async (id, gallery) => {
        const { data } = await this.apiCall.put(`/galleries/${id}`, gallery);
        
        return data;
    }
}

export default new GalleriesService();