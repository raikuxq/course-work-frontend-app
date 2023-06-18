import {EIssueReportPriority, EIssueReportStatus, EIssueReportType, ERole, ETrackerMemberRole} from "@/types/graphql";
import type {TLabelMap, TSelectItemType} from "@/types/common.types";

export const roleOptions: TSelectItemType<ETrackerMemberRole>[] = [
    {label: 'bug.role_type.dev', value: ETrackerMemberRole.DEV},
    {label: 'bug.role_type.qa', value: ETrackerMemberRole.QA},
    {label: 'bug.role_type.guest', value: ETrackerMemberRole.GUEST}
]

export const priorityOptions: TSelectItemType<EIssueReportPriority>[] = [
    {label: 'bug.priority_type.critical', value: EIssueReportPriority.CRITICAL},
    {label: 'bug.priority_type.major', value: EIssueReportPriority.HIGH},
    {label: 'bug.priority_type.minor', value: EIssueReportPriority.LOW},
    {label: 'bug.priority_type.normal', value: EIssueReportPriority.NORMAL},
];

export const statusOptions: TSelectItemType<EIssueReportStatus>[] = [
    {label: 'bug.status_type.closed', value: EIssueReportStatus.CLOSED},
    {label: 'bug.status_type.to_be_discussed', value: EIssueReportStatus.DISCUSSION},
    {label: 'bug.status_type.fulfilment', value: EIssueReportStatus.FULFILMENT},
    {label: 'bug.status_type.new', value: EIssueReportStatus.READY},
    {label: 'bug.status_type.to_verify', value: EIssueReportStatus.TO_APPROVE},
];

export const typeOptions: TSelectItemType<EIssueReportType>[] = [
    {label: 'bug.type_type.func', value: EIssueReportType.FUNCTIONALITY},
    {label: 'bug.type_type.report', value: EIssueReportType.REPORTING},
    {label: 'bug.type_type.ui', value: EIssueReportType.UI},
    {label: 'bug.type_type.vulnerability', value: EIssueReportType.VULNERABILITY},
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
    { label: labelsStatus[EIssueReportStatus.READY], value: EIssueReportStatus.READY },
    { label: labelsStatus[EIssueReportStatus.TO_APPROVE], value: EIssueReportStatus.TO_APPROVE },
];

export const typeOptionsList = [
    { label: labelsType[EIssueReportType.FUNCTIONALITY], value: EIssueReportType.FUNCTIONALITY },
    { label: labelsType[EIssueReportType.REPORTING], value: EIssueReportType.REPORTING },
    { label: labelsType[EIssueReportType.UI], value: EIssueReportType.UI },
    { label: labelsType[EIssueReportType.VULNERABILITY], value: EIssueReportType.VULNERABILITY },
];
