import { IComment, IContent } from './content.type';
import { IFeedback } from './feedback';

export interface IUser {
    id: number;
    username: string;
    email: string;
    role: string;
    assets: any | [];
    Posts: IContent[];
    Comments: IComment[];
    Feedbacks: IFeedback[];
    authorities: {
        authority: string;
    }[];
    enabled: boolean;
    description: null;
    display_name: string;
    feedbacks: IFeedback[];
    comments: IComment[];
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    posts: IContent[];
}

export interface IUpdateFormat {
    itemId: number;
    property: string;
    value: string;
}

export interface IUpdatePassword {
    newPassword: string;
    authenticationRequest: {
        username: string;
        password: string;
    };
}
