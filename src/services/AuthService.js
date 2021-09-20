import HttpService from "./HttpService";

class AuthService extends HttpService
{
    register = async (credentials) => {
        const { data } = await this.apiCall.post('/register', credentials);
        const { token, user } = data;

        localStorage.setItem('token', token)
        return { token, user };
    }
}

export default new AuthService();