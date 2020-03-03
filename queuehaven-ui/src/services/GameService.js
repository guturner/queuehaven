import AuthService from './AuthService';
import axios from 'axios';

class GameService {

    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL;
        this.authService = new AuthService();
    }

    getGames = () => {
        return axios.get(`${this.baseUrl}/api/v1/games`, { headers: { "Authorization": this.authService.getBearerToken() }});
    };

    createGame = (game) => {
        return axios.post(`${this.baseUrl}/api/v1/games`, game, { headers: { "Authorization": this.authService.getBearerToken() }});
    };

    deleteGame = (gameId) => {
        return axios.delete(`${this.baseUrl}/api/v1/games/${gameId}`, { headers: { "Authorization": this.authService.getBearerToken() }});
    };
}

export default GameService;