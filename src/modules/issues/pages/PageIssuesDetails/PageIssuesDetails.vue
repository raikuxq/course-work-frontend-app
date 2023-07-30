<script setup lang="ts">
import IssuesDetails from "@/modules/issues/components/IssuesDetails/IssuesDetails.vue";
import IssuesDetailsInfo from "@/modules/issues/components/IssuesDetailsInfo/IssuesDetailsInfo.vue";
import {useQuery} from "@vue/apollo-composable";
import {useRoute} from "vue-router";
import type {T_GQL_issueReport} from "@/shared/types/graphql";
import {watch} from "vue";
import s from './PageIssuesDetails.module.scss'
import {useLoadingBar} from 'naive-ui'
import {ISSUE_REPORT_BY_ID_QUERY} from "@/modules/issues/api/IssuesById";

const emit = defineEmits<{
  (e: 'updateData'): void
}>()

const route = useRoute()
const loadingBar = useLoadingBar()

const {result, loading, refetch} = useQuery<T_GQL_issueReport>(ISSUE_REPORT_BY_ID_QUERY, {
  id: route.params.issueId
});

const onUpdateData = () => {
  refetch({ id: route.params.issueId })
  emit('updateData')
}

watch(() => route.params.issueId, (newIssuesId, oldIssuesId) => {
  if (oldIssuesId !== newIssuesId) {
    refetch({
      id: newIssuesId
    })
  }
})

watch(() => loading, (value, oldValue) => {
  if (value && !oldValue) {
    loadingBar.start()
  }
  if (!value && oldValue) {
    loadingBar.finish()
  }
})
</script>

<template>
  <div :class="s.PageIssuesDetails">
    <template v-if="result">
      <div :class="s.PageIssuesDetails__sidebar">
        <IssuesDetailsInfo v-bind="result.issueReport"/>
      </div>

      <div :class="s.PageIssuesDetails__content">
        <IssuesDetails
            v-bind="result.issueReport"
            @update-data="onUpdateData"
        />
      </div>

    </template>
  </div>
</template>
