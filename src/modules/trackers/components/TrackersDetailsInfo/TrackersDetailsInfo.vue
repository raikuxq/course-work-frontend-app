<script setup lang="ts">
import type {T_GQL_tracker_tracker} from "@/shared/types/graphql";
import {computed, ref, toRefs} from "vue";
import {NButton, NDescriptions, NDescriptionsItem, NDivider, NIcon, NSpace} from 'naive-ui'
import s from './TrackersDetailsInfo.module.scss'
import {labelsRole} from '@/shared/options/issueOptions';
import {Add as IconAdd} from "@vicons/ionicons5";
import TrackersAddMember from "@/modules/trackers/components/TrackersAddMember/TrackersAddMember.vue";
import TrackersManageMembers from "@/modules/trackers/components/TrackersManageMembers/TrackersManageMembers.vue";
import {useAuthStore} from "@/modules/auth/store/authStore";

type TTrackersDetailsInfoProps = T_GQL_tracker_tracker

const props = defineProps<TTrackersDetailsInfoProps>()

const {
  members,
  title,
  description,
  createdAt,
  channel
} = toRefs(props)

const emit = defineEmits<{
  (e: 'updateData'): void,
}>()

const authStore = useAuthStore()


const isModalAddMemberOpen = ref<boolean>(false)
const isModalManageOpen = ref<boolean>(false)


const isUserAuthor = computed(() => authStore.user?.id === channel.value.author.id)
const channelMembers = computed(() => channel.value.members)
const dateToDisplay = computed(() => new Date(createdAt.value).toLocaleDateString())

</script>

<template>
  <n-descriptions
      :class="s.TrackersDetailsInfo__descContainer"
      label-placement="top"
      :column="1"
      :title="$t('trackers.labels.info')"
  >
    <n-descriptions-item
        :class="s.TrackersDetailsInfo__descItem"
        :label="$t('trackers.labels.title_name')"
        v-if="title"
    >
      {{ title }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.TrackersDetailsInfo__descItem"
        :label="$t('trackers.labels.created_at')"
        v-if="createdAt"
    >
      {{ dateToDisplay }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.TrackersDetailsInfo__descItem"
        :label="$t('trackers.labels.description')"
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
        :title="$t('trackers.labels.members')"
    >
      <n-descriptions-item
          v-for="member in members"
          :key="member.id"
          :class="s.TrackersDetailsInfo__descItem"
      >
        {{ `${member.user.lastname} ${member.user.firstname.charAt(0)}. (${$t(labelsRole[member.role])})` }}
      </n-descriptions-item>
    </n-descriptions>


    <template v-if="isUserAuthor">
      <n-divider/>

      <n-space vertical>
        <n-button
            type="primary"
            block
            strong
            :bordered="true"
            @click="isModalAddMemberOpen = true"
        >
          {{ $t('trackers.form.add_member') }}
          <template #icon>
            <n-icon>
              <icon-add/>
            </n-icon>
          </template>
        </n-button>

        <n-button
            secondary
            type="primary"
            block
            strong
            :bordered="true"
            @click="isModalManageOpen = true"
        >
          {{ $t('trackers.form.manage_members') }}
        </n-button>
      </n-space>

      <TrackersAddMember
          :is-modal-open="isModalAddMemberOpen"
          :tracker-id="id"
          :channel-members="channelMembers"
          :tracker-members="members"
          @close-modal="isModalAddMemberOpen = false"
          @update-data="emit('updateData')"
      />

      <TrackersManageMembers
          :is-modal-open="isModalManageOpen"
          :tracker-id="id"
          :tracker-members="members"
          @close-modal="isModalManageOpen = false"
          @update-data="emit('updateData')"
      />
    </template>
  </n-space>
</template>
