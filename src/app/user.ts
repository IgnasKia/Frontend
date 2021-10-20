export class User {
    id?: number;
    accessToken?: string;
    username: string;
    password: string;
    admin?: boolean;
    lastReward?: Date;
    balance?: number;
}