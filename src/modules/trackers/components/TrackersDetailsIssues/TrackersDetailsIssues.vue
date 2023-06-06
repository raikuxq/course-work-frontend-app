<script setup lang="ts">
import {T_GQL_tracker_tracker, T_GQL_tracker_tracker_reports} from "@/types/graphql";
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
      title: 'Title',
      key: 'title'
    },
    {
      title: 'Status',
      key: 'status'
    },
    {
      title: 'Priority',
      key: 'priority'
    },
    {
      title: 'Type',
      key: 'type'
    },
    {
      title: 'Author',
      key: 'author'
    },
    {
      title: 'Created at',
      key: 'createdAt'
    },
    {
      title: 'Responsible',
      key: 'responsiblePerson'
    },
  ]
})

const data = computed(() => {

  return reports.value.map((reportsItem: T_GQL_tracker_tracker_reports, index) => ({
    idx: index + 1,
    title: reportsItem.title.slice(0, 30),
    author: `${reportsItem.author.user.firstname} ${reportsItem.author.user.lastname}`,
    createdAt: new Date(reportsItem.createdAt).toLocaleString(),
    updatedAt: new Date(reportsItem.updatedAt).toLocaleString(),
    id: reportsItem.id,
    priority: t(labelsPriority[reportsItem.priority]),
    status: t(labelsStatus[reportsItem.status]),
    type: t(labelsType[reportsItem.type]),
    responsiblePerson: `${reportsItem.responsiblePerson.user.firstname} ${reportsItem.responsiblePerson.user.lastname} (${t(labelsRole[reportsItem.responsiblePerson.role])})`
  }) as T_GQL_tracker_tracker_reports)
})
</script>

<template>
  <div>
    <n-data-table
        :columns="columns"
        :data="data"
        :bordered="false"
    />
  </div>
</template>
