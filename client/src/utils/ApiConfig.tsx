
const port = 3030

export default class ApiConfig{
    static API_BASE_URL = 'http://localhost:' + port ;
    static API_LOGIN_URL = this.API_BASE_URL + '/login';
    
}