<script setup lang="ts">
import type {T_GQL_channel_channel} from "@/types/graphql";
import {toRefs} from "vue";
import {ERouteName} from "@/router";
import {NDescriptions, NDescriptionsItem, NDivider} from 'naive-ui'

type TChannelsDetailsProps = Omit<T_GQL_channel_channel, '__typename'>

const props = defineProps<TChannelsDetailsProps>()

const {
  author,
  categories,
  id,
  description,
  members,
  title,
  inviteLink
} = toRefs(props)

</script>

<template>
  <div>
    <n-descriptions label-placement="top" :column="1" title="Информация">
      <n-descriptions-item
          :label="$t('channels.labels.name')"
          v-if="title"
      >
        {{ title }}
      </n-descriptions-item>

      <n-descriptions-item
          :label="$t('channels.labels.author')"
          v-if="author"
      >
        {{ author.firstname || '' }} {{ author.lastname || '' }}
      </n-descriptions-item>

      <n-descriptions-item
          :label="$t('channels.labels.inviteLink')"
          v-if="inviteLink"
      >
        {{ inviteLink }}
      </n-descriptions-item>

      <n-descriptions-item
          :label="$t('channels.labels.description')"
          v-if="description"
      >
        {{ description }}
      </n-descriptions-item>
    </n-descriptions>

    <n-divider />

    <n-descriptions v-if="members && members.length" label-placement="top" :column="1" :title="$t('channels.labels.members')">
      <n-descriptions-item v-for="member in members" :key="member.id">
        {{ `${member.lastname} ${member.firstname.charAt(0)}.` }}
      </n-descriptions-item>
    </n-descriptions>

    <n-divider />

    <n-descriptions  v-if="categories && categories.length" label-placement="top" :column="1" :title="$t('channels.labels.categories')">
      <n-descriptions-item v-for="categoriesItem in categories" :key="categoriesItem.id" :label="categoriesItem.title">
        <div v-for="trackersItem in categoriesItem.trackers" :key="trackersItem.id">
          <RouterLink :to="{ name: ERouteName.TRACKER, params: { channelId: id, trackerId: trackersItem.id } }">
            <span>{{ trackersItem.title }}</span>
          </RouterLink>
        </div>
      </n-descriptions-item>
    </n-descriptions>

  </div>
</template>
