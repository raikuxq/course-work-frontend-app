export enum EStoreSubmodules {
    AUTH = 'auth'
}

export type TSelectItemType<T> = {
    label: string;
    value: T;
}

export type TLabelMap = {
    [key: string]: string;
}
