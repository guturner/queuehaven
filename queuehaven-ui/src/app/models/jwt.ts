import { Moment } from 'moment';

export class JWT {
    prefix: string;
    token: string;
    expiresIn: number;
    requestedTime: Moment;
}