<script setup lang="ts">

import {NPageHeader, NSpace, NButton, NDropdown} from 'naive-ui'
import type {T_GQL_tracker_tracker} from "@/types/graphql";
import {computed, toRefs} from "vue";
import TrackersDetailsIssues from "@/modules/trackers/components/TrackersDetailsIssues/TrackersDetailsIssues.vue";

export type TTrackersDetailsProps = Omit<T_GQL_tracker_tracker, '__typename'>

const props = defineProps<TTrackersDetailsProps>()

const {
  members,
  description,
  id,
  reports,
  title,
  createdAt
} = toRefs(props)

const createdAtToShow = computed(() => {
  const date = new Date(createdAt.value).toLocaleDateString()

  return `Дата создания: ${date}`
})
</script>

<style scoped>

</style>

<template>
  <div>
    <div>
      <n-page-header :subtitle="createdAtToShow" :title="title">
        <template #extra>
          <n-space>
            <n-dropdown :options="[]" placement="bottom-start">
              <n-button :bordered="false" style="padding: 0 4px">
                Knopaka
              </n-button>
            </n-dropdown>
          </n-space>
        </template>
        <template #footer>
          {{ description }}
        </template>
      </n-page-header>
    </div>
  </div>
  <div>
    {{ members.map(membersItem => `${membersItem.user.firstname} ${membersItem.user.lastname} (${membersItem.role})`) }}

    <h3>Issue reports</h3>

    <TrackersDetailsIssues :key="id" :reports="reports"/>
  </div>
</template>
