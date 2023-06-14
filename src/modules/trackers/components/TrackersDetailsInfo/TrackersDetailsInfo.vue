<script setup lang="ts">
import type {T_GQL_tracker_tracker} from "@/types/graphql";
import {computed, toRefs} from "vue";
import {NButton, NDescriptions, NDescriptionsItem, NDivider} from 'naive-ui'
import s from './TrackersDetailsInfo.module.scss'
import {labelsRole} from '@/options/options';

type TTrackersDetailsInfoProps = T_GQL_tracker_tracker

const props = defineProps<TTrackersDetailsInfoProps>()

const {
  members,
  title,
  description,
  createdAt
} = toRefs(props)

const dateToDisplay = computed(() => new Date(createdAt.value).toLocaleDateString())

</script>

<template>
  <n-descriptions
      :class="s.TrackersDetailsInfo__descContainer"
      label-placement="top"
      :column="1"
      :title="$t('tracker.labels.info')"
  >
    <n-descriptions-item
        :class="s.TrackersDetailsInfo__descItem"
        :label="$t('tracker.labels.title_name')"
        v-if="title"
    >
      {{ title }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.TrackersDetailsInfo__descItem"
        :label="$t('tracker.labels.created_at')"
        v-if="createdAt"
    >
      {{ dateToDisplay }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.TrackersDetailsInfo__descItem"
        :label="$t('tracker.labels.description')"
        v-if="description"
    >
      {{ description }}
    </n-descriptions-item>
  </n-descriptions>

  <n-divider :class="s.TrackersDetailsInfo__divider"/>

  <n-space vertical size="large">
    <n-descriptions
        v-if="members && members.length"
        label-placement="top"
        :column="1"
        :class="s.TrackersDetailsInfo__descContainer"
        :title="$t('tracker.labels.members')"
    >
      <n-descriptions-item
          v-for="member in members"
          :key="member.id"
          :class="s.TrackersDetailsInfo__descItem"
      >
        {{ `${member.user.lastname} ${member.user.firstname.charAt(0)}. (${$t(labelsRole[member.role])})` }}
      </n-descriptions-item>
    </n-descriptions>

<!--    <n-button type="primary" block strong :bordered="true">-->
<!--      {{ $t('tracker.manage_members') }}-->
<!--    </n-button>-->
  </n-space>


</template>
