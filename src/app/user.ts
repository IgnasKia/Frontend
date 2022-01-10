export class User {
    _id?: number;
    accessToken?: string;
    email?: string;
    username: string;
    password: string;
    admin?: boolean;
    lastReward?: Date;
    balance?: number;
}