export type WithAvatarDataProps = {
    id?: number;
    name: string;
    //file: string;
    avatar: string;
};
export type WithAvatarProps = {
    data: WithAvatarDataProps[];
    selected?: number;
};
