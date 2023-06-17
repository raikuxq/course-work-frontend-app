<script setup lang="ts">
import s from "@/modules/channels/components/ChannelsDetailsNav/ChannelsDetailsNav.module.scss";
import {ERouteName} from "@/router";
import {computed, ref, toRefs} from "vue";
import {
  NButton,
  NDescriptions,
  NDescriptionsItem,
  NDropdown,
  NPageHeader,
  NSpace,
  useDialog,
  useMessage
} from 'naive-ui'
import {T_GQL_channel_channel} from "@/types/graphql";
import ChannelsUpdateForm from "@/modules/channels/components/ChannelsUpdateForm/ChannelsUpdateForm.vue";
import {useAuthStore} from "@/modules/auth/store/authStore";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {useMutation} from "@vue/apollo-composable";
import {REPORTS_DELETE_MUTATION} from "@/modules/issues/api/IssuesDelete";
import {CHANNEL_DELETE_MUTATION} from "@/modules/channels/api/ChannelsDelete";
import {CHANNEL_LEAVE_MUTATION} from "@/modules/channels/api/ChannelsLeave";

/**
 * Types
 */
type TChannelsDetailsNavProps = T_GQL_channel_channel


/**
 * Props
 */
const props = defineProps<TChannelsDetailsNavProps>()

const {
  categories,
  title,
  id,
  author
} = toRefs(props)


/**
 * Emits
 */
const emit = defineEmits<{
  (e: 'updateData'): void,
}>()


/**
 * Hooks
 */
const route = useRoute()
const router = useRouter()
const dialog = useDialog()
const message = useMessage()
const authStore = useAuthStore()
const {t} = useI18n()


/**
 * Network
 */
const {mutate: deleteChannel} = useMutation(CHANNEL_DELETE_MUTATION);
const {mutate: leaveChannel} = useMutation(CHANNEL_LEAVE_MUTATION);


/**
 * State
 */
const isModalUpdateOpen = ref<boolean>(false)


/**
 * Computed
 */
const isUserAuthor = computed(() => authStore.user?.id === author.value.id)


/**
 * Delete channel
 */
const onDeleteBtnClick = () => {
  dialog.error({
    transformOrigin: 'center',
    showIcon: false,
    title: t('channels.actions.delete'),
    content: t('app.confirm'),
    positiveText: t('app.actions.delete'),
    negativeText: t('app.actions.cancel'),
    onPositiveClick: async () => {
      try {
        await deleteChannel({
          id: id.value
        })

        emit('updateData')
        message.success(t('channels.notify.deleted'))

        await router.push({ name: ERouteName.HOME })
      } catch (error) {
        const alertMessage = error?.extensions?.message ?? error?.message;

        if (alertMessage) {
          message.error(`${t('channels.notify.not_deleted')}: ${error.message}`);
        }
      }
    },
  })
}


/**
 * Leave channel
 */
const onLeaveBtnClick = () => {
  dialog.error({
    transformOrigin: 'center',
    showIcon: false,
    title: t('channels.actions.leave'),
    content: t('app.confirm'),
    positiveText: t('channels.form.leave_short'),
    negativeText: t('app.actions.cancel'),
    onPositiveClick: async () => {
      try {
        await leaveChannel({
          channelId: id.value
        })

        emit('updateData')
        message.success(t('channels.notify.left'))

        await router.push({ name: ERouteName.HOME })
      } catch (error) {
        const alertMessage = error?.extensions?.message ?? error?.message;

        if (alertMessage) {
          message.error(`${t('channels.notify.not_left')}: ${error.message}`);
        }
      }
    },
  })
}

</script>


<template>
  <div>
    <n-page-header data-dark :title="`${title}: ${$t('channels.labels.categories')}`">
      <template #extra>
        <n-space v-if="isUserAuthor">
          <n-button
              type="primary"
              secondary
              block
              strong
              :bordered="true"
              @click="isModalUpdateOpen = true"
          >
            {{ $t('channels.actions.update' )}}
          </n-button>

          <n-button
              type="error"
              block
              secondary
              strong
              :bordered="true"
              @click="onDeleteBtnClick"
          >
            {{ $t('channels.actions.delete' )}}
          </n-button>
        </n-space>
        <n-space v-else>
          <n-button
              type="error"
              block
              secondary
              strong
              :bordered="true"
              @click="onLeaveBtnClick"
          >
            {{ $t('channels.actions.leave' )}}
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <div :class="s.ChannelsDetailsNav__content">
      <n-descriptions
          v-if="categories && categories.length"
          label-placement="top"
          :column="1"
          :class="s.ChannelsDetailsNav__descContainer"
      >
        <n-descriptions-item
            v-for="categoriesItem in categories"
            :key="categoriesItem.id"
            :label="categoriesItem.title"
        >
          <div
              v-for="trackersItem in categoriesItem.trackers"
              :key="trackersItem.id"
              :class="s.ChannelsDetailsNav__linkContainer"
          >
            <RouterLink
                :class="s.ChannelsDetailsNav__linkItem"
                :to="{ name: ERouteName.TRACKER, params: { channelId: id, trackerId: trackersItem.id } }"
            >
              <span>{{ trackersItem.title }}</span>
            </RouterLink>
          </div>
        </n-descriptions-item>
      </n-descriptions>
    </div>
  </div>


  <ChannelsUpdateForm
      :is-modal-open="isModalUpdateOpen"
      :channel-data="props"
      @close-modal="isModalUpdateOpen = false"
      @update-data="emit('updateData')"
  />
</template>
