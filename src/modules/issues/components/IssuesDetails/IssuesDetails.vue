<script setup lang="ts">
import {NButton, NDivider, NPageHeader, NSpace, NText, NIcon, useDialog, useMessage} from 'naive-ui'
import type {T_GQL_issueReport_issueReport} from "@/types/graphql";
import {ref, toRefs, computed} from "vue";
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {ERouteName} from "@/router";
import CommentCard from "@/modules/comments/components/CommentCard/CommentCard.vue";
import IssuesUpdateForm from "@/modules/issues/components/IssuesUpdateForm/IssuesUpdateForm.vue";
import s from './IssuesDetails.module.scss'
import {useAuthStore} from "@/modules/auth/store/authStore";
import {ETrackerMemberRole} from "@/types/graphql";
import {useMutation} from "@vue/apollo-composable";
import {REPORTS_DELETE_MUTATION} from "@/modules/issues/api/IssuesDelete";
import {CreateSharp as IconSharp, TrashBinSharp as IconTrashBin} from "@vicons/ionicons5";
import {Add as IconAdd} from "@vicons/ionicons5";

export type TIssuesDetailsProps = T_GQL_issueReport_issueReport

const props = defineProps<TIssuesDetailsProps>()

const emit = defineEmits<{
  (e: 'updateData'): void
}>()

const {
  id,
  description,
  comments,
  title,
  tracker
} = toRefs(props)

const {members} = toRefs(tracker.value)


const {t} = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const dialog = useDialog()
const message = useMessage()

const {mutate: deleteIssueReport} = useMutation(REPORTS_DELETE_MUTATION);


const currentUserAsMember = computed(() => {
  return members.value.find(membersItem => membersItem.user.id === authStore.user?.id)
})

const isAllowedToRemove = computed(() => currentUserAsMember.value.role === ETrackerMemberRole.QA)

const isModalUpdateIssueOpen = ref<boolean>(false)
const isModalCreateCommentOpen = ref<boolean>(false)

const onDeleteBtnClick = () => {
  dialog.error({
    transformOrigin: 'center',
    showIcon: false,
    title: t('bug.actions.delete'),
    content: t('app.confirm'),
    positiveText: t('app.actions.delete'),
    negativeText: t('app.actions.cancel'),
    onPositiveClick: async () => {
      try {
        await deleteIssueReport({
          id: id.value
        })

        emit('updateData')
        message.success(t('bug.notify.deleted'))

        await router.push({
          name: ERouteName.TRACKER,
          params: {
            channelId: route.params.channelId,
            trackerId: route.params.trackerId
          }
        })
      } catch (error) {
        const alertMessage = error?.extensions?.message ?? error?.message;

        if (alertMessage) {
          message.error(`${t('bug.notify.not_deleted')}: ${error.message}`);
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
          @back="router.push({ name: ERouteName.TRACKER, params: { channelId: route.params.channelId, trackerId: route.params.trackerlId }})"
      >
        <template #extra>
          <n-space>
            <n-button
                type="primary"
                block
                secondary
                strong
                :bordered="false"
                @click="isModalUpdateIssueOpen = true"
            >
              {{ $t('bug.actions.update') }}
              <template #icon>
                <n-icon>
                  <icon-sharp/>
                </n-icon>
              </template>
            </n-button>

            <template v-if="isAllowedToRemove">
              <n-button
                  type="error"
                  block
                  secondary
                  strong
                  :bordered="false"
                  @click="onDeleteBtnClick"
              >
                {{ $t('bug.actions.delete') }}
                <template #icon>
                  <n-icon>
                    <icon-trash-bin/>
                  </n-icon>
                </template>
              </n-button>
            </template>
          </n-space>
        </template>
      </n-page-header>
    </div>
  </div>
  <div>
    <n-page-header :title="$t('bug.description')"/>

    <n-space>
      <n-text :class="s.IssuesDetails__description" strong>
        <pre :class="s.IssuesDetails__pre">{{ description.trim() }}</pre>
      </n-text>
    </n-space>

    <n-divider/>

    <n-page-header :title="`${$t('bug.comments')} (${comments.length})`">
      <template #extra>
        <n-space>
          <n-button
              type="primary"
              block
              strong
              :bordered="false"
              @click="isModalCreateCommentOpen = true"
          >
            {{ $t('comments.actions.create') }}
            <template #icon>
              <n-icon>
                <icon-add />
              </n-icon>
            </template>
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <n-divider/>

    <n-space vertical size="medium">
      <template v-for="commentItem in comments" :key="commentItem.id">
        <CommentCard v-bind="commentItem"/>
      </template>
    </n-space>

    <IssuesUpdateForm
        :is-modal-open="isModalUpdateIssueOpen"
        :issue-report-data="props"
        @close-modal="isModalUpdateIssueOpen = false"
        @update-data="emit('updateData')"
    />
  </div>
</template>

<style lang=""></style>
