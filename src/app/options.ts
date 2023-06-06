import { EnumRole, EnumStatus, EnumType, EnumPriority} from "@/types/issueReport.types";
import type {TLabelMap, TSelectItemType} from "@/types/common.types";

export const roleOptions: TSelectItemType<EnumRole>[] = [
    {label: 'bug.role_type.dev', value: EnumRole.DEV},
    {label: 'bug.role_type.qa', value: EnumRole.QA},
    {label: 'bug.role_type.guest', value: EnumRole.GUEST}
]

export const priorityOptions: TSelectItemType<EnumPriority>[] = [
    {label: 'bug.priority_type.critical', value: EnumPriority.CRITICAL},
    {label: 'bug.priority_type.major', value: EnumPriority.HIGH},
    {label: 'bug.priority_type.minor', value: EnumPriority.LOW},
    {label: 'bug.priority_type.normal', value: EnumPriority.NORMAL},
];

export const statusOptions: TSelectItemType<EnumStatus>[] = [
    {label: 'bug.status_type.closed', value: EnumStatus.CLOSED},
    {label: 'bug.status_type.to_be_discussed', value: EnumStatus.DISCUSSION},
    {label: 'bug.status_type.fulfilment', value: EnumStatus.FULFILMENT},
    {label: 'bug.status_type.verified', value: EnumStatus.READY},
    {label: 'bug.status_type.to_verify', value: EnumStatus.TO_APPROVE},
];

export const typeOptions: TSelectItemType<EnumType>[] = [
    {label: 'bug.type_type.func', value: EnumType.FUNCTIONALITY},
    {label: 'bug.type_type.report', value: EnumType.REPORTING},
    {label: 'bug.type_type.ui', value: EnumType.UI},
    {label: 'bug.type_type.vulnerability', value: EnumType.VULNERABILITY},
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
