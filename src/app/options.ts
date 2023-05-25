import { EnumRole, EnumStatus, EnumType, EnumPriority} from "@/types/issueReport.types";
import type {TLabelMap, TSelectItemType} from "@/types/common.types";

export const roleOptions: TSelectItemType<EnumRole>[] = [
    {label: 'Разработчик', value: EnumRole.DEV},
    {label: 'QA', value: EnumRole.QA},
    {label: 'Гость', value: EnumRole.GUEST}
]

export const priorityOptions: TSelectItemType<EnumPriority>[] = [
    {label: 'Критический', value: EnumPriority.CRITICAL},
    {label: 'Высокий', value: EnumPriority.HIGH},
    {label: 'Низкий', value: EnumPriority.LOW},
    {label: 'Обычный', value: EnumPriority.NORMAL},
];

export const statusOptions: TSelectItemType<EnumStatus>[] = [
    {label: 'Закрыто', value: EnumStatus.CLOSED},
    {label: 'Обсуждение', value: EnumStatus.DISCUSSION},
    {label: 'Выполнение', value: EnumStatus.FULFILMENT},
    {label: 'Готово', value: EnumStatus.READY},
    {label: 'На утверждении', value: EnumStatus.TO_APPROVE},
];

export const typeOptions: TSelectItemType<EnumType>[] = [
    {label: 'Функциональность', value: EnumType.FUNCTIONALITY},
    {label: 'Отчетность', value: EnumType.REPORTING},
    {label: 'Интерфейс', value: EnumType.UI},
    {label: 'Уязвимость', value: EnumType.VULNERABILITY},
];

export const labelsRole: TLabelMap = roleOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {} as TLabelMap);

export const labelsPriority: TLabelMap = priorityOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {} as TLabelMap);

export const labelsStatus: TLabelMap = statusOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {} as TLabelMap);

export const labelsType: TLabelMap = typeOptions.reduce((acc, option) => {
    acc[option.value] = option.label;
    return acc;
}, {} as TLabelMap);

export const roleOptionsList = [
    { label: labelsRole[EnumRole.QA], value: EnumRole.QA },
    { label: labelsRole[EnumRole.DEV], value: EnumRole.DEV },
    { label: labelsRole[EnumRole.GUEST], value: EnumRole.GUEST },
];

export const priorityOptionsList = [
    { label: labelsPriority[EnumPriority.CRITICAL], value: EnumPriority.CRITICAL },
    { label: labelsPriority[EnumPriority.HIGH], value: EnumPriority.HIGH },
    { label: labelsPriority[EnumPriority.LOW], value: EnumPriority.LOW },
    { label: labelsPriority[EnumPriority.NORMAL], value: EnumPriority.NORMAL },
];

export const statusOptionsList = [
    { label: labelsStatus[EnumStatus.CLOSED], value: EnumStatus.CLOSED },
    { label: labelsStatus[EnumStatus.DISCUSSION], value: EnumStatus.DISCUSSION },
    { label: labelsStatus[EnumStatus.FULFILMENT], value: EnumStatus.FULFILMENT },
    { label: labelsStatus[EnumStatus.READY], value: EnumStatus.READY },
    { label: labelsStatus[EnumStatus.TO_APPROVE], value: EnumStatus.TO_APPROVE },
];

export const typeOptionsList = [
    { label: labelsType[EnumType.FUNCTIONALITY], value: EnumType.FUNCTIONALITY },
    { label: labelsType[EnumType.REPORTING], value: EnumType.REPORTING },
    { label: labelsType[EnumType.UI], value: EnumType.UI },
    { label: labelsType[EnumType.VULNERABILITY], value: EnumType.VULNERABILITY },
];
