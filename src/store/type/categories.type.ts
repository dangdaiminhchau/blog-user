export interface ICategories {
    id: number;
    name: string;
    includedContents: {
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
        comments?: {
            id: number;
            content: string;
        }[];
        lastUpload: string;
    }[];
}
