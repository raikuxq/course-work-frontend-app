import type {T_GQL_tracker_tracker_members, T_GQL_tracker_tracker_reports} from "@/types/graphql";
import {computed, toRefs, watch} from "vue";
import type {Ref} from "vue";
import {EIssueReportPriority, EIssueReportStatus, EIssueReportType} from "@/types/graphql";

export type TUserFilteredIssuesConfigProps = {
    status: EIssueReportStatus | null;
    priority: EIssueReportPriority | null;
    type: EIssueReportType | null;
    responsible: T_GQL_tracker_tracker_members['id'] | null;
}

type TUserFilteredIssuesProps = {
    config: Ref<TUserFilteredIssuesConfigProps>;
    sourceData: Ref<T_GQL_tracker_tracker_reports[]>;
}


/**
 * Хук для фильтрации списка баг-репортов
 */
export const useFilteredIssues = (props: TUserFilteredIssuesProps) => {

    const {
        config,
        sourceData
    } = toRefs(props)

    const {
        type,
        priority,
        status,
        responsible,
    } = toRefs(config.value)

    const getFilteredIssues = computed(() => {
        let filteredData = sourceData.value

        if (type.value) filteredData = filteredData.filter(dataItem => dataItem.type === type.value)
        if (priority.value) filteredData = filteredData.filter(dataItem => dataItem.priority === priority.value)
        if (status.value) filteredData = filteredData.filter(dataItem => dataItem.status === status.value)
        if (responsible.value) filteredData = filteredData.filter(dataItem => dataItem.responsiblePerson.id === responsible.value)

        return filteredData
    })

    return {
        getFilteredIssues
    }
}
