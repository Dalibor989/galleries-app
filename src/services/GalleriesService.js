import HttpService from "./HttpService";

class GalleriesService extends HttpService
{
    getAll = async () => {
        const { data } = await this.apiCall.get('/galleries');

        return data;
    }
}

export default new GalleriesService();