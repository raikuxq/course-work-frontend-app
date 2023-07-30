import {EIssueReportPriority, EIssueReportStatus, EIssueReportType, ERole, ETrackerMemberRole} from "@/shared/types/graphql";
import type {TLabelMap, TSelectItemType} from "@/shared/types/common.types";

export const roleOptions: TSelectItemType<ETrackerMemberRole>[] = [
    {label: 'issues.role_type.dev', value: ETrackerMemberRole.DEV},
    {label: 'issues.role_type.qa', value: ETrackerMemberRole.QA},
    {label: 'issues.role_type.guest', value: ETrackerMemberRole.GUEST}
]

export const priorityOptions: TSelectItemType<EIssueReportPriority>[] = [
    {label: 'issues.priority_type.critical', value: EIssueReportPriority.CRITICAL},
    {label: 'issues.priority_type.major', value: EIssueReportPriority.HIGH},
    {label: 'issues.priority_type.minor', value: EIssueReportPriority.LOW},
    {label: 'issues.priority_type.normal', value: EIssueReportPriority.NORMAL},
];

export const statusOptions: TSelectItemType<EIssueReportStatus>[] = [
    {label: 'issues.status_type.closed', value: EIssueReportStatus.CLOSED},
    {label: 'issues.status_type.to_be_discussed', value: EIssueReportStatus.DISCUSSION},
    {label: 'issues.status_type.fulfilment', value: EIssueReportStatus.FULFILMENT},
    {label: 'issues.status_type.new', value: EIssueReportStatus.NEW},
    {label: 'issues.status_type.to_verify', value: EIssueReportStatus.TO_APPROVE},
];

export const typeOptions: TSelectItemType<EIssueReportType>[] = [
    {label: 'issues.type_type.func', value: EIssueReportType.FUNCTIONALITY},
    {label: 'issues.type_type.report', value: EIssueReportType.REPORTING},
    {label: 'issues.type_type.ui', value: EIssueReportType.OTHER},
    {label: 'issues.type_type.vulnerability', value: EIssueReportType.VULNERABILITY},
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
    { label: labelsRole[ETrackerMemberRole.QA], value: ETrackerMemberRole.QA },
    { label: labelsRole[ETrackerMemberRole.DEV], value: ETrackerMemberRole.DEV },
    { label: labelsRole[ETrackerMemberRole.GUEST], value: ETrackerMemberRole.GUEST },
];

export const priorityOptionsList = [
    { label: labelsPriority[EIssueReportPriority.CRITICAL], value: EIssueReportPriority.CRITICAL },
    { label: labelsPriority[EIssueReportPriority.HIGH], value: EIssueReportPriority.HIGH },
    { label: labelsPriority[EIssueReportPriority.LOW], value: EIssueReportPriority.LOW },
    { label: labelsPriority[EIssueReportPriority.NORMAL], value: EIssueReportPriority.NORMAL },
];

export const statusOptionsList = [
    { label: labelsStatus[EIssueReportStatus.CLOSED], value: EIssueReportStatus.CLOSED },
    { label: labelsStatus[EIssueReportStatus.DISCUSSION], value: EIssueReportStatus.DISCUSSION },
    { label: labelsStatus[EIssueReportStatus.FULFILMENT], value: EIssueReportStatus.FULFILMENT },
    { label: labelsStatus[EIssueReportStatus.NEW], value: EIssueReportStatus.NEW },
    { label: labelsStatus[EIssueReportStatus.TO_APPROVE], value: EIssueReportStatus.TO_APPROVE },
];

export const typeOptionsList = [
    { label: labelsType[EIssueReportType.FUNCTIONALITY], value: EIssueReportType.FUNCTIONALITY },
    { label: labelsType[EIssueReportType.REPORTING], value: EIssueReportType.REPORTING },
    { label: labelsType[EIssueReportType.OTHER], value: EIssueReportType.OTHER },
    { label: labelsType[EIssueReportType.VULNERABILITY], value: EIssueReportType.VULNERABILITY },
];
