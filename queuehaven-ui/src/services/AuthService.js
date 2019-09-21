import { signInAction, signOutAction } from "../actions";
import store from "../store";

import axios from "axios";

class AuthService {

    constructor() {
        this.baseUrl = process.env.REACT_APP_API_BASE_URL;
        this.authEndpoint = process.env.REACT_APP_API_AUTH_ENDPOINT;
    }

    signup = async (username, password, otp): boolean => {
        try {
            await this.loginApiUser();

            const request = {
                username: username,
                otp: otp
            };

            const result = await axios.post(`${this.baseUrl}/api/v1/users`, request, { headers: { "Authorization": this.getBearerToken() } });
            await this.login(username, 'a'); // TODO
        } catch (error) {
            await this.logout();

            if (error.response.status === 409) {
                throw "Username already in use.";
            }
        }
    }

    login = async (username, password): boolean => {
        let result;

         try {
            result = await axios.post(`${this.baseUrl}${this.authEndpoint}`, {}, { auth: { username: username, password: password } });

            const payload = {
                jwt: {
                    ...result.data,
                    requested: new Date().getTime()
                },
                user: this.getUser(username)
            };

            await store.dispatch(signInAction(payload)); // Save the JWT to application state.
            return true;
         } catch (error) {
            return false;
         }
    }

    loginApiUser = async () => {
        return await this.login(process.env.REACT_APP_SERVICE_USERNAME, process.env.REACT_APP_SERVICE_PASSWORD);
    };

    getUser = (username) => {
        return (username === process.env.REACT_APP_SERVICE_USERNAME) ? '' : { username: username };
    };

    logout = async () => {
        await store.dispatch(signOutAction());
    };

    isJwtExpired = (requested, expiresIn) => {
        const jwt = store.getState().jwt;

        if (jwt === undefined) {
            return true;
        } else {
            const now = new Date().getTime();

            return now < requested + (expiresIn * 1000);
        }
    };

    getBearerToken = () => {
        const jwt = store.getState().jwt;

        let bearerToken;
        if (jwt === '') { // TODO Check if JWT is expired

        } else {
            bearerToken = `${jwt.prefix}${jwt.token}`;
        }

        return bearerToken;
    };
}

export default AuthService;