<script setup lang="ts">
import {NButton, NDivider, NPageHeader, NSpace, NText} from 'naive-ui'
import type {T_GQL_issueReport_issueReport} from "@/types/graphql";
import {ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {ERouteName} from "@/router";
import CommentCard from "@/modules/comments/components/CommentCard/CommentCard.vue";
import IssuesUpdateForm from "@/modules/issues/components/IssuesUpdateForm/IssuesUpdateForm.vue";
import s from './IssuesDetails.module.scss'

export type TIssuesDetailsProps = T_GQL_issueReport_issueReport

const props = defineProps<TIssuesDetailsProps>()

const emit = defineEmits<{
  (e: 'updateData'): void
}>()

const {
  description,
  comments,
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
    <n-page-header :title="$t('bug.description')"/>

    <n-space>
      <n-text
          :class="s.IssuesDetails__description"
          strong
      >
        {{ description }}
      </n-text>
    </n-space>

    <n-divider/>

    <n-page-header :title="`${$t('bug.comments')} (${comments.length})`"/>

    <n-space vertical>

    </n-space>

    <n-space vertical size="medium">
      <template v-for="commentItem in comments" :key="commentItem.id">
        <CommentCard v-bind="commentItem"/>
      </template>
    </n-space>

    <n-divider/>

    <IssuesUpdateForm
        :is-modal-open="isModalUpdateIssueOpen"
        :issue-report-data="props"
        @close-modal="isModalUpdateIssueOpen = false"
        @update-data="emit('updateData')"
    />
  </div>
</template>

<style lang=""></style>
