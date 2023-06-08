<script setup lang="ts">
import TrackersDetails from "@/modules/trackers/components/TrackersDetails/TrackersDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {useRoute} from "vue-router";
import type {T_GQL_tracker} from "@/types/graphql";
import {watch} from "vue";
import {TRACKERS_BY_ID_QUERY} from "@/modules/trackers/api/TrackersById";
import s from './PageTrackerDetails.module.scss'
import { useLoadingBar } from 'naive-ui'

const route = useRoute()
const loadingBar = useLoadingBar()

const {result, loading, error, refetch} = useQuery<T_GQL_tracker>(TRACKERS_BY_ID_QUERY, {
  id: route.params.trackerId
});

watch(() => route.params.trackerId, (newTrackerId, oldTrackerId) => {
  if (oldTrackerId !== newTrackerId) {
    refetch({
      id: newTrackerId
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
  <div
      v-if="result"
      :class="s.PageTrackerDetails"
  >
    <TrackersDetails v-bind="result.tracker"/>
  </div>
</template>
