<script setup lang="ts">
import type {T_GQL_channel_channel} from "@/shared/types/graphql";
import {toRefs} from "vue";
import {ERouteName} from "@/app/router";
import {NDescriptions, NDescriptionsItem, NDivider} from 'naive-ui'
import s from './ChannelsDetails.module.scss'

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
    <n-descriptions
        :class="s.ChannelsDetails__descContainer"
        label-placement="top"
        :column="1"
        :title="$t('channels.labels.info')"
    >
      <n-descriptions-item
          :class="s.ChannelsDetails__descItem"
          :label="$t('channels.labels.name')"
          v-if="title"
      >
        {{ title }}
      </n-descriptions-item>

      <n-descriptions-item
          :class="s.ChannelsDetails__descItem"
          :label="$t('channels.labels.author')"
          v-if="author"
      >
        {{ author.firstname || '' }} {{ author.lastname || '' }}
      </n-descriptions-item>

      <n-descriptions-item
          :class="s.ChannelsDetails__descItem"
          :label="$t('channels.labels.inviteLink')"
          v-if="inviteLink"
      >
        {{ inviteLink }}
      </n-descriptions-item>

      <n-descriptions-item
          :class="s.ChannelsDetails__descItem"
          :label="$t('channels.labels.description')"
          v-if="description"
      >
        {{ description }}
      </n-descriptions-item>
    </n-descriptions>

    <n-divider :class="s.ChannelsDetails__divider"/>

    <n-descriptions
        v-if="members && members.length"
        label-placement="top"
        :column="1"
        :class="s.ChannelsDetails__descContainer"
        :title="$t('channels.labels.members')"
    >
      <n-descriptions-item
          v-for="member in members"
          :key="member.id"
          :class="s.ChannelsDetails__descItem"
      >
        {{ `${member.lastname} ${member.firstname.charAt(0)}.` }}
      </n-descriptions-item>
    </n-descriptions>

  </div>
</template>
