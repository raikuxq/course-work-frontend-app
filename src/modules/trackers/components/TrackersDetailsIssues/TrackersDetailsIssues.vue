<script setup lang="ts">
import {EIssueReportPriority, T_GQL_tracker_tracker, T_GQL_tracker_tracker_reports} from "@/types/graphql";
import {computed, toRefs} from "vue";
import {DataTableColumns, NDataTable} from 'naive-ui'
import {labelsPriority, labelsRole, labelsStatus, labelsType} from '@/app/options'
import {useI18n} from "vue-i18n";

export type TTrackersDetailsIssuesProps = Pick<T_GQL_tracker_tracker, 'reports'>


const props = defineProps<TTrackersDetailsIssuesProps>()

const {t} = useI18n()

const {
  reports
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
      title: t('bug.updated_at'),
      key: 'id',
      sorter: 'default',
    },
  ]
})

const data = computed(() => {
  return reports.value.map((reportsItem: T_GQL_tracker_tracker_reports, index) => ({
    idx: `${index + 1}`,
    title: reportsItem.title.slice(0, 30),
    author: `${reportsItem.author.user.firstname} ${reportsItem.author.user.lastname}`,
    createdAt: new Date(reportsItem.createdAt).toLocaleString(),
    updatedAt: new Date(reportsItem.updatedAt).toLocaleString(),
    id: reportsItem.id,
    priority: t(labelsPriority[reportsItem.priority]),
    status: t(labelsStatus[reportsItem.status]),
    type: t(labelsType[reportsItem.type]),
    responsiblePerson: `${reportsItem.responsiblePerson.user.firstname} ${reportsItem.responsiblePerson.user.lastname} (${t(labelsRole[reportsItem.responsiblePerson.role])})`
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
