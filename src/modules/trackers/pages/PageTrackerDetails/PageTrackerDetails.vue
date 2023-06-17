<script setup lang="ts">
import TrackersDetails from "@/modules/trackers/components/TrackersDetails/TrackersDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {useRoute} from "vue-router";
import type {T_GQL_tracker} from "@/types/graphql";
import {watch} from "vue";
import {TRACKERS_BY_ID_QUERY} from "@/modules/trackers/api/TrackersById";
import s from './PageTrackerDetails.module.scss'
import {useLoadingBar} from 'naive-ui'
import TrackersDetailsInfo from "@/modules/trackers/components/TrackersDetailsInfo/TrackersDetailsInfo.vue";
import {ERouteName} from "@/router";

const route = useRoute()
const loadingBar = useLoadingBar()

const {result, loading, refetch} = useQuery<T_GQL_tracker>(TRACKERS_BY_ID_QUERY, {
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
  <div :class="s.PageTrackerDetails">
    <template v-if="result">
      <template v-if="route.name === ERouteName.TRACKER">
        <div :class="s.PageTrackerDetails__sidebar">
          <TrackersDetailsInfo v-bind="result.tracker"/>
        </div>

        <div :class="s.PageTrackerDetails__content">
          <TrackersDetails
              v-bind="result.tracker"
              @update-data="refetch({ id: route.params.trackerId })"
          />
        </div>
      </template>

      <template v-else>
        <div :class="s.PageTrackerDetails__content">
          <router-view v-slot="{ Component }">
            <component
                :is="Component"
                @update-data="refetch({id: route.params.trackerId})"
            />
          </router-view>
        </div>
      </template>
    </template>
  </div>
</template>
