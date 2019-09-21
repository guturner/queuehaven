import AuthService from "./AuthService";
import axios from "axios";

class EventService {

    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL;
        this.authService = new AuthService();
    }

    getEvents = () => {
        return axios.get(`${this.baseUrl}/api/v1/events`, { headers: { "Authorization": this.authService.getBearerToken() }});
    };

    createEvent = (event) => {
        return axios.post(`${this.baseUrl}/api/v1/events`, event, { headers: { "Authorization": this.authService.getBearerToken() }});
    };

    deleteEvent = (eventId) => {
        return axios.delete(`${this.baseUrl}/api/v1/events/${eventId}`, { headers: { "Authorization": this.authService.getBearerToken() }});
    };
}

export default EventService;