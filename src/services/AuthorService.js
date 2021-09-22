import HttpService from "./HttpService";

class AuthorService extends HttpService
{
    getAuthor =  async (id) => {
        const { data } = await this.apiCall.get(`/author/${id}`);

        return data;
    }
}

export default new AuthorService();