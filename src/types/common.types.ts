export enum EStoreSubmodules {
    AUTH = 'auth',
    CHANNELS = 'channels'
}

export enum EEventBusEmits {
    CHANNELS_LIST_REFETCH = 'CHANNELS_LIST_REFETCH'
}

export type TSelectItemType<T> = {
    label: string;
    value: T;
}

export type TLabelMap = {
    [key: string]: string;
}
