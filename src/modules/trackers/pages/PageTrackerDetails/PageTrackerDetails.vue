<script setup lang="ts">
import TrackersDetails from "@/modules/trackers/components/TrackersDetails/TrackersDetails.vue";
import {useQuery} from "@vue/apollo-composable";
import {useRoute} from "vue-router";
import type {T_GQL_channel, T_GQL_tracker} from "@/types/graphql";
import {watch} from "vue";
import {TRACKERS_BY_ID_QUERY} from "@/modules/trackers/api/TrackersById";

const route = useRoute()

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
</script>

<template>
  <div v-if="result">
    <TrackersDetails v-bind="result.tracker" />
  </div>
</template>
