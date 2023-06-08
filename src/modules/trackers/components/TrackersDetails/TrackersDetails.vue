<script setup lang="ts">

import {NPageHeader, NSpace, NButton, NDropdown, NDivider, NText} from 'naive-ui'
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

</script>

<style scoped>

</style>

<template>
  <div>
    <div>
      <n-page-header data-dark :title="title">
        <template #extra>
          <n-space>
            <n-button type="primary" block strong :bordered="true">
              Управление участниками
            </n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </div>
  <div>
    {{ members.map(membersItem => `${membersItem.user.firstname} ${membersItem.user.lastname} (${membersItem.role})`) }}

    <n-divider />

    <n-text>
      {{ description }}
    </n-text>

    <n-page-header :title="'Список баг-репортов'">
      <template #extra>
        <n-space>
          <n-dropdown :options="[]" placement="bottom-start">
            <n-button type="primary" block strong :bordered="false">
              Создать баг-репорт
            </n-button>
          </n-dropdown>
        </n-space>
      </template>
    </n-page-header>

    <br>

    <TrackersDetailsIssues :key="id" :reports="reports"/>
  </div>
</template>
