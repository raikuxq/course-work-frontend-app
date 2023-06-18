<script setup lang="ts">
import {
  NButton,
  NDivider,
  NPageHeader,
  NSelect,
  NSpace,
  darkTheme,
  NConfigProvider,
  NIcon,
  useDialog,
  useMessage
} from 'naive-ui'
import {Add as IconAdd, CreateSharp as IconSharp, TrashBinSharp as IconTrashBin} from "@vicons/ionicons5";
import type {T_GQL_tracker_tracker, T_GQL_trackerDelete, T_GQL_trackerDeleteVariables} from "@/types/graphql";
import {computed, ref, toRefs} from "vue";
import TrackersDetailsIssues from "@/modules/trackers/components/TrackersDetailsIssues/TrackersDetailsIssues.vue";
import IssuesCreateForm from "@/modules/issues/components/IssuesCreateForm/IssuesCreateForm.vue";
import {useI18n} from "vue-i18n";
import type {TUserFilteredIssuesConfigProps} from "@/modules/trackers/hooks/useFilteredIssues";
import {useFilteredIssues} from "@/modules/trackers/hooks/useFilteredIssues";
import {useIssueReportSelectOptions} from "@/modules/trackers/hooks/useIssueReportSelectOptions";
import s from './TrackersDetails.module.scss'
import {useRoute, useRouter} from "vue-router";
import {ERouteName} from "@/router";
import TrackersUpdateForm from "@/modules/trackers/components/TrackersUpdateForm/TrackersUpdateForm.vue";
import {useAuthStore} from "@/modules/auth/store/authStore";
import {useMutation} from "@vue/apollo-composable";
import {TRACKER_DELETE_MUTATION} from "@/modules/trackers/api/TrackersDelete";

export type TTrackersDetailsProps = T_GQL_tracker_tracker


/**
 * Props
 */
const props = defineProps<TTrackersDetailsProps>()

const {
  members,
  id,
  reports,
  title,
  category,
  channel
} = toRefs(props)


/**
 * Emits
 */
const emit = defineEmits<{
  (e: 'updateData'): void
}>()


/**
 * Hooks
 */
const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const dialog = useDialog()
const message = useMessage()
const authStore = useAuthStore()


/**
 * State
 */
const isModalCreateIssueOpen = ref<boolean>(false)
const isModalUpdateTrackerOpen = ref<boolean>(false)
const filters = ref<TUserFilteredIssuesConfigProps>({
  type: null,
  responsible: null,
  priority: null,
  status: null
})


/**
 * Custom hooks
 */
const {
  priorityOptionsSelect,
  responsiblePersonOptionsSelect,
  typeOptionsSelect,
  statusOptionsSelect
} = useIssueReportSelectOptions({
  members: members.value
})

const {getFilteredIssues} = useFilteredIssues({
  config: filters,
  sourceData: reports
})


/**
 * Network
 */
const {mutate: deleteTracker} = useMutation<T_GQL_trackerDelete, T_GQL_trackerDeleteVariables>(TRACKER_DELETE_MUTATION);


/**
 * Computed
 */
const isUserAuthor = computed(() => authStore.user?.id === channel.value.author.id)



/**
 * Delete tracker
 */
const onDeleteBtnClick = () => {
  dialog.error({
    transformOrigin: 'center',
    showIcon: false,
    title: t('tracker.actions.delete'),
    content: t('app.confirm'),
    positiveText: t('app.actions.delete'),
    negativeText: t('app.actions.cancel'),
    onPositiveClick: async () => {
      try {
        await deleteTracker({
          id: id.value
        })

        emit('updateData')
        message.success(t('tracker.notify.deleted'))

        await router.push({ name: ERouteName.CHANNEL, params: { channelId: route.params.channelId }})
      } catch (error) {
        const alertMessage = error?.extensions?.message ?? error?.message;

        if (alertMessage) {
          message.error(`${t('tracker.notify.not_deleted')}: ${error.message}`);
        }
      }
    },
  })
}
</script>

<template>
  <div>
    <div>
      <n-page-header
          data-dark
          :title="title"
          @back="router.push({ name: ERouteName.CHANNEL, params: { channelId: route.params.channelId }})"
      >
        <template #extra>
          <n-space v-if="isUserAuthor">
            <n-button
                type="primary"
                secondary
                block
                strong
                :bordered="true"
                @click="isModalUpdateTrackerOpen = true"
            >
              {{ $t('tracker.actions.update') }}
              <template #icon>
                <n-icon>
                  <icon-sharp />
                </n-icon>
              </template>
            </n-button>

            <n-button
                type="error"
                secondary
                block
                strong
                :bordered="true"
                @click="onDeleteBtnClick"
            >
              {{ $t('tracker.actions.delete') }}
              <template #icon>
                <n-icon>
                  <icon-trash-bin />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </div>
  <div>
    <n-page-header :title="$t('bug.list')">
      <template #extra>
        <n-space vertical>
          <n-space>
            <n-button
                type="primary"
                block
                strong
                :bordered="false"
                @click="isModalCreateIssueOpen = true"
            >
              {{ $t('bug.form.create') }}
              <template #icon>
                <n-icon>
                  <icon-add />
                </n-icon>
              </template>
            </n-button>
          </n-space>
        </n-space>
      </template>
    </n-page-header>

    <n-config-provider :theme="darkTheme">
      <n-divider/>

      <n-space :class="s.TrackerDetails__filters" justify="space-between">
        <n-select
            v-model:value="filters.status"
            clearable
            :theme="darkTheme"
            :consistent-menu-width="false"
            :placeholder="$t('bug.form.status.placeholder')"
            :options="statusOptionsSelect"
        />

        <n-select
            v-model:value="filters.priority"
            clearable
            :theme="darkTheme"
            :placeholder="$t('bug.form.priority.placeholder')"
            :options="priorityOptionsSelect"
        />

        <n-select
            v-model:value="filters.type"
            clearable
            :theme="darkTheme"
            :placeholder="$t('bug.form.type.placeholder')"
            :options="typeOptionsSelect"
        />

        <n-select
            v-model:value="filters.responsible"
            clearable
            :theme="darkTheme"
            :consistent-menu-width="false"
            :placeholder="$t('bug.form.responsible.placeholder')"
            :options="responsiblePersonOptionsSelect"
        />
      </n-space>

      <n-divider/>
    </n-config-provider>



    <TrackersDetailsIssues
        :key="`${id}-${reports.length}`"
        :reports="getFilteredIssues"
        :members="members"
    />

    <IssuesCreateForm
        :is-modal-open="isModalCreateIssueOpen"
        :tracker-id="id"
        :members="members"
        @close-modal="isModalCreateIssueOpen = false"
        @update-data="emit('updateData')"
    />

    <TrackersUpdateForm
        :is-modal-open="isModalUpdateTrackerOpen"
        :tracker-data="props"
        @close-modal="isModalUpdateTrackerOpen = false"
        @update-data="emit('updateData')"
    />
  </div>
</template>

<style lang=""></style>
