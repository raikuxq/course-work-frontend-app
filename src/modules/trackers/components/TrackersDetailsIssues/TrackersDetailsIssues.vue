<script setup lang="ts">
import {
  EIssueReportPriority,
  ETrackerMemberRole,
  T_GQL_tracker_tracker,
  T_GQL_tracker_tracker_reports
} from "@/types/graphql";
import {computed, h, toRefs} from "vue";
import {DataTableColumns, NButton, NDataTable, NIcon, NSpace, NTooltip} from 'naive-ui'
import {labelsPriority, labelsRole, labelsStatus, labelsType} from '@/options/options'
import {useI18n} from "vue-i18n";
import {CreateSharp as IconSharp, TrashBinSharp as IconTrashBin} from "@vicons/ionicons5";
import {useAuthStore} from "@/modules/auth/store/authStore";
import {ERouteName} from "@/router";
import {useRoute, useRouter} from "vue-router";


export type TTrackersDetailsIssuesProps = Pick<T_GQL_tracker_tracker, 'reports' | 'members'>


const props = defineProps<TTrackersDetailsIssuesProps>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const {t} = useI18n()

const {
  reports,
  members
} = toRefs(props)

const columns = computed((): DataTableColumns<T_GQL_tracker_tracker_reports> => {
  return [
    {
      title: '#',
      key: 'idx'
    },
    {
      title: t('bug.title'),
      key: 'title',
      sorter: 'default'
    },
    {
      title: t('bug.status'),
      key: 'status',
      sorter: 'default'
    },
    {
      title: t('bug.priority'),
      key: 'priority',
      sorter: 'default',
    },
    {
      title: t('bug.type'),
      key: 'type',
      sorter: 'default',
    },
    {
      title: t('bug.person'),
      key: 'responsiblePerson',
      sorter: 'default',
    },
    {
      title: t('bug.author'),
      key: 'author',
      sorter: 'default'
    },
    {
      title: t('bug.created_at'),
      key: 'createdAt',
      sorter: 'default',
    },
    {
      title: t('bug.user_actions'),
      key: 'actions',
      render(row: T_GQL_tracker_tracker_reports) {

        const actionsList = [
          h(NButton, {
            type: 'tertiary',
            secondary: true,
            block: true,
            strong: true,
            onClick: () => router.push({
              name: ERouteName.ISSUE,
              params: {
                channelId: route.params.channelId,
                trackerId: route.params.trackerId,
                issueId: row.id
              }
            })
          }, {
            default: () => t('bug.goto'),
          }),
        ]

        return h(
            NSpace,
            {},
            {
              default: () => actionsList
            }
        )
      }
    }
  ]
})

const data = computed(() => {
  return reports.value.map((reportsItem: T_GQL_tracker_tracker_reports, index) => ({
    idx: `${index + 1}`,
    title: reportsItem.title.slice(0, 35),
    author: `${reportsItem.author.user.lastname} ${reportsItem.author.user.firstname?.charAt(0)}.`,
    createdAt: new Date(reportsItem.createdAt).toLocaleDateString(),
    updatedAt: new Date(reportsItem.updatedAt).toLocaleDateString(),
    id: reportsItem.id,
    priority: t(labelsPriority[reportsItem.priority]),
    status: t(labelsStatus[reportsItem.status]),
    type: t(labelsType[reportsItem.type]),
    responsiblePerson: `${reportsItem.responsiblePerson.user.lastname} ${reportsItem.responsiblePerson.user.firstname?.charAt(0)}. (${t(labelsRole[reportsItem.responsiblePerson.role])})`
  }))
})


const rowClassName = (row: T_GQL_tracker_tracker_reports) => {
  switch (row.priority) {
    case t(labelsPriority[EIssueReportPriority.CRITICAL]):
      return 'priority-critical';
    case t(labelsPriority[EIssueReportPriority.HIGH]):
      return 'priority-high'
    case t(labelsPriority[EIssueReportPriority.LOW]):
      return 'priority-low'
    case t(labelsPriority[EIssueReportPriority.NORMAL]):
      return 'priority-normal'
    default:
      return ''
  }
}
</script>

<template>
  <div class="n-data-table-container">
    <n-data-table
        :columns="columns"
        :data="data"
        :bordered="false"
        :row-class-name="rowClassName"
    />
  </div>
</template>


<style scoped lang="scss">
@import "@/assets/styles/app/mixins";
@import "@/assets/styles/app/variables";

.n-data-table-container {
  width: calc(100% + 32px);
  margin-left: -16px;
}

:deep(.n-data-table-th__title) {
  font-weight: 600;
}

:deep(.n-data-table-td) {
  font-weight: 500;
  color: $color-text-primary;
}

:deep(.priority-critical [data-col-key="priority"]) {
  color: $color-state-error !important;
}

:deep(.priority-high [data-col-key="priority"]) {
  color: $color-state-warning !important;
}

:deep(.priority-low [data-col-key="priority"]) {
  color: $color-state-success !important;
}

:deep(.priority-normal [data-col-key="priority"]) {
  color: $color-text-primary !important;
}
</style>
