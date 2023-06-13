<script setup lang="ts">
import {NButton, NDivider, NPageHeader, NSpace, NText} from 'naive-ui'
import type {T_GQL_issueReport_issueReport} from "@/types/graphql";
import {ref, toRefs} from "vue";
import IssuesCreateForm from "@/modules/issues/components/IssuesCreateForm/IssuesCreateForm.vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {ERouteName} from "@/router";

export type TIssuesDetailsProps = T_GQL_issueReport_issueReport

const props = defineProps<TIssuesDetailsProps>()

const emit = defineEmits<{
  (e: 'updateData'): void
}>()

const {
  description,
  title,
} = toRefs(props)

const {t} = useI18n()
const router = useRouter()
const route = useRoute()

const isModalUpdateIssueOpen = ref<boolean>(false)
</script>

<template>
  <div>
    <div>
      <n-page-header
          data-dark
          :title="title"
          @back="router.push({ name: ERouteName.TRACKER, params: { channelId: route.params.channelId, trackerId: route.params.trackerlId }})"
      >
        <template #extra>
          <n-space>
            <n-button
                type="primary"
                block
                strong
                :bordered="false"
                @click="isModalUpdateIssueOpen = true"
            >
              {{ $t('bug.form.update') }}
            </n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </div>
  <div>
    <n-divider/>

    <n-text strong >
      {{ description }}
    </n-text>

    <n-divider/>

    <IssuesCreateForm
        :is-modal-open="isModalUpdateIssueOpen"
        :tracker-id="id"
        :members="[]"
        @close-modal="isModalUpdateIssueOpen = false"
        @update-data="emit('updateData')"
    />
  </div>
</template>

<style lang=""></style>
