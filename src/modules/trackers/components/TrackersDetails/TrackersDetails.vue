<script setup lang="ts">
import {NButton, NDivider, NPageHeader, NSelect, NSpace, NText} from 'naive-ui'
import type {T_GQL_tracker_tracker} from "@/types/graphql";
import {ref, toRefs, watch} from "vue";
import TrackersDetailsIssues from "@/modules/trackers/components/TrackersDetailsIssues/TrackersDetailsIssues.vue";
import IssuesCreateForm from "@/modules/issues/components/IssuesCreateForm/IssuesCreateForm.vue";
import {useI18n} from "vue-i18n";
import type {TUserFilteredIssuesConfigProps} from "@/modules/trackers/hooks/useFilteredIssues";
import {useFilteredIssues} from "@/modules/trackers/hooks/useFilteredIssues";
import {useIssueReportSelectOptions} from "@/modules/trackers/hooks/useIssueReportSelectOptions";
import s from './TrackersDetails.module.scss'
import {useRoute, useRouter} from "vue-router";
import {ERouteName} from "@/router";

export type TTrackersDetailsProps = Omit<T_GQL_tracker_tracker, '__typename'>

const props = defineProps<TTrackersDetailsProps>()

const emit = defineEmits<{
  (e: 'updateData'): void
}>()

const {
  members,
  description,
  id,
  reports,
  title,
} = toRefs(props)

const {t} = useI18n()
const router = useRouter()
const route = useRoute()

const isModalCreateIssueOpen = ref<boolean>(false)

const filters = ref<TUserFilteredIssuesConfigProps>({
  type: null,
  responsible: null,
  priority: null,
  status: null
})

const {
  priorityOptionsSelect,
  responsiblePersonOptionsSelect,
  typeOptionsSelect,
  statusOptionsSelect
} = useIssueReportSelectOptions({
  members: members.value
})

const {getFilteredIssues} = useFilteredIssues({
  config: filters,
  sourceData: reports
})
</script>

<template>
  <div>
    <div>
      <n-page-header
          data-dark
          :title="title"
          @back="router.push({ name: ERouteName.CHANNEL, params: { channelId: route.params.channelId }})"
      >
        <template #extra>
          <n-space>
            <n-button type="primary" block strong :bordered="true">
              {{ $t('tracker.manage_members') }}
            </n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </div>
  <div>
    <n-page-header :title="$t('bug.list')">
      <template #extra>
        <n-space vertical>
          <n-space>
            <n-button
                type="primary"
                block
                strong
                :bordered="false"
                @click="isModalCreateIssueOpen = true"
            >
              {{ $t('bug.form.create') }}
            </n-button>
          </n-space>
        </n-space>
      </template>
    </n-page-header>

    <n-divider/>

    <n-space :class="s.TrackerDetails__filters">
      <n-select
          v-model:value="filters.status"
          clearable
          style="width: 100%"
          :consistent-menu-width="false"
          :placeholder="$t('bug.form.status.placeholder')"
          :options="statusOptionsSelect"
      />

      <n-select
          v-model:value="filters.priority"
          clearable
          :placeholder="$t('bug.form.priority.placeholder')"
          :options="priorityOptionsSelect"
      />

      <n-select
          v-model:value="filters.type"
          clearable
          :placeholder="$t('bug.form.type.placeholder')"
          :options="typeOptionsSelect"
      />

      <n-select
          v-model:value="filters.responsible"
          clearable
          :consistent-menu-width="false"
          :placeholder="$t('bug.form.responsible.placeholder')"
          :options="responsiblePersonOptionsSelect"
      />
    </n-space>

    <n-divider/>

    <TrackersDetailsIssues
        :key="`${id}-${reports.length}`"
        :reports="getFilteredIssues"
        :members="members"
    />

    <IssuesCreateForm
        :is-modal-open="isModalCreateIssueOpen"
        :tracker-id="id"
        :members="members"
        @close-modal="isModalCreateIssueOpen = false"
        @update-data="emit('updateData')"
    />
  </div>
</template>

<style lang=""></style>
