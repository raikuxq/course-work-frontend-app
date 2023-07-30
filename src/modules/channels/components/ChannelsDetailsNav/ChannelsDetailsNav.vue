<script setup lang="ts">
import s from "@/modules/channels/components/ChannelsDetailsNav/ChannelsDetailsNav.module.scss";
import {ERouteName} from "@/app/router";
import {computed, ref, toRefs} from "vue";
import {
  NButton,
  NIcon,
  NDivider,
  NPageHeader,
  NSpace,
  NList,
  NListItem,
  darkTheme,
  NConfigProvider,
  useDialog,
  useMessage
} from 'naive-ui'
import {T_GQL_channel_channel} from "@/shared/types/graphql";
import ChannelsUpdateForm from "@/modules/channels/components/ChannelsUpdateForm/ChannelsUpdateForm.vue";
import {useAuthStore} from "@/modules/auth/store/authStore";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {useMutation} from "@vue/apollo-composable";
import {CHANNEL_DELETE_MUTATION} from "@/modules/channels/api/ChannelsDelete";
import {CHANNEL_LEAVE_MUTATION} from "@/modules/channels/api/ChannelsLeave";
import {Add as IconAdd, CreateSharp as IconSharp, TrashBinSharp as IconTrashBin} from "@vicons/ionicons5";
import TrackersCreateForm from "@/modules/trackers/components/TrackersCreateForm/TrackersCreateForm.vue";
import CategoriesCreateForm from "@/modules/categories/components/CategoriesCreateForm/CategoriesCreateForm.vue";

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
const isModalCreateTrackerOpen = ref<boolean>(false)
const isModalCreateCategoryOpen = ref<boolean>(false)
const activeCategoryId = ref<string | null>(null)


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

        await router.push({name: ERouteName.HOME})
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

        await router.push({name: ERouteName.HOME})
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
          <n-space>
            <n-button
                type="primary"
                secondary
                block
                strong
                :bordered="true"
                @click="isModalCreateCategoryOpen = true"
            >
              {{ $t('categories.actions.create') }}
              <template #icon>
                <n-icon>
                  <icon-add/>
                </n-icon>
              </template>
            </n-button>
          </n-space>

          <n-space>
            <n-button
                type="primary"
                secondary
                block
                strong
                :bordered="true"
                @click="isModalUpdateOpen = true"
            >
              {{ $t('channels.actions.update') }}
              <template #icon>
                <n-icon>
                  <icon-sharp/>
                </n-icon>
              </template>
            </n-button>

            <n-button
                type="error"
                block
                secondary
                strong
                :bordered="true"
                @click="onDeleteBtnClick"
            >
              {{ $t('channels.actions.delete') }}
              <template #icon>
                <n-icon>
                  <icon-trash-bin/>
                </n-icon>
              </template>
            </n-button>
          </n-space>
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
            {{ $t('channels.actions.leave') }}
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <div
        :class="s.ChannelsDetailsNav__content"
        v-if="categories && categories.length"
    >
      <div
          v-for="(categoriesItem, index) in categories"
          :key="categoriesItem.id"
          :data-key="categoriesItem.id"
          :data-length="categoriesItem.title"
      >
        <n-page-header :title="categoriesItem.title">
          <template #extra>
            <n-space vertical>
              <n-space>
                <n-button
                    v-if="isUserAuthor"
                    type="primary"
                    secondary
                    block
                    strong
                    :bordered="false"
                    @click="() => {
                      isModalCreateTrackerOpen = true;
                      activeCategoryId = categoriesItem.id;
                    }"
                >
                  {{ $t('trackers.actions.create') }}
                  <template #icon>
                    <n-icon>
                      <icon-add/>
                    </n-icon>
                  </template>
                </n-button>
              </n-space>
            </n-space>
          </template>

          <TrackersCreateForm
              :key="`${categoriesItem.id}${index}`"
              :is-modal-open="isModalCreateTrackerOpen"
              :channel-id="id"
              :channel-category-id="activeCategoryId || ''"
              @update-data="emit('updateData')"
              @close-modal="() => {
                      isModalCreateTrackerOpen = false;
                      activeCategoryId = categoriesItem.id;
                    }"
          />

          <CategoriesCreateForm
              :key="id"
              :is-modal-open="isModalCreateCategoryOpen"
              :channel-id="id"
              @close-modal="isModalCreateCategoryOpen = false"
              @update-data="emit('updateData')"
          />

          <n-divider/>
        </n-page-header>

        <n-config-provider :theme="darkTheme">
          <template v-if="categoriesItem.trackers?.length">
            <n-list
                bordered
                show-divider
                clickable
                hoverable
                size="large"
            >
              <n-list-item
                  v-for="trackersItem in categoriesItem.trackers"
                  :key="trackersItem.id"
                  @click="router.push({ name: ERouteName.TRACKER, params: { channelId: id, trackerId: trackersItem.id } })"
              >
                {{ trackersItem.title }}
              </n-list-item>
            </n-list>

            <n-divider/>
          </template>

        </n-config-provider>
      </div>
    </div>
  </div>


  <ChannelsUpdateForm
      :key="props.id"
      :is-modal-open="isModalUpdateOpen"
      :channel-data="props"
      @close-modal="isModalUpdateOpen = false"
      @update-data="emit('updateData')"
  />
</template>
