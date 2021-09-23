import HttpService from "./HttpService";

class CommentsService extends HttpService
{
  addComments = async (comment) => {
    const { data } = await this.apiCall.post('/comments', comment);

    return data;
  }
}

export default new CommentsService();