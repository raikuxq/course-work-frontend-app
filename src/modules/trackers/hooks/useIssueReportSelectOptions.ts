import {priorityOptions, statusOptions, typeOptions} from "@/shared/options/issueOptions";
import {toRefs, computed} from "vue";
import type {T_GQL_tracker_tracker} from "@/shared/types/graphql";
// @ts-ignore
import {useI18n} from "vue-i18n";


type TUseIssueReportSelectOptions = Pick<T_GQL_tracker_tracker, 'members'>


/**
 * Хук для получения настроек для <select>
 */
export const useIssueReportSelectOptions = (props: TUseIssueReportSelectOptions) => {

    const {members} = toRefs(props)

    const {t} = useI18n()

    const typeOptionsSelect = computed(() => typeOptions.map((item) => ({...item, label: t(item.label)})))

    const priorityOptionsSelect = computed(() => priorityOptions.map((item) => ({...item, label: t(item.label)})))

    const statusOptionsSelect = computed(() => statusOptions.map((item) => ({...item, label: t(item.label)})))

    const responsiblePersonOptionsSelect = computed(() => {
        return members.value
            .filter((obj, index, self) => index === self.findIndex((member) =>
                (member.user?.firstname === obj.user?.firstname) &&
                (member.user?.lastname === obj.user?.lastname) &&
                (member.role === obj.role)
            ))
            .map(memberItem => {
                return ({
                    label: `${memberItem.user.firstname} ${memberItem.user.lastname}`,
                    value: memberItem.id
                })
            })
    })

    return {
        priorityOptionsSelect,
        responsiblePersonOptionsSelect,
        typeOptionsSelect,
        statusOptionsSelect
    }
}
