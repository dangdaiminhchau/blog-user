export interface IContent {
    id: number;
    title: string;
    description: string;
    content: string;
    assetList: {
        id: number;
        name: string;
        assetURL: string;
        tag: string;
    }[];
    categories: number[];
    views: number | 0;
    pending: boolean;
    comments: {
        id: number;
        content: string;
    }[];
    lastUpload: string;
}

export interface IContentBody {
    title: string;
    description: string;
    content: string;
    assetList: {
        name: string;
        assetURL: string;
        tag: string;
    }[];
    categories: { id: number }[];
}

export interface ICommentBody {
    content: string;
    post: { id: number }[];
}

export interface IComment {
    id: number;
    content: string;
}

export interface IFormatUpdate {
    itemId: number;
    property: string;
    value: string;
}

export interface IFormatCateUpdate {
    itemId: number;
    value: { id: number }[];
}
