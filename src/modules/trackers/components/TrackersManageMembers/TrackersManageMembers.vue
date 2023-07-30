<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {computed, ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {NButton, NDivider, NModal, useMessage, NSelect, NIcon, useDialog, NSpace} from "naive-ui";
import {TrashBinSharp as IconTrashBin} from "@vicons/ionicons5";
import type {
  T_GQL_tracker_tracker_members,
  T_GQL_trackerRemoveMember_trackerRemoveMember,
  T_GQL_trackerRemoveMemberVariables,
  T_GQL_trackerUpdateMemberRole_trackerUpdateMemberRole,
  T_GQL_trackerUpdateMemberRoleVariables
} from "@/types/graphql";
import {ETrackerMemberRole} from "@/types/graphql";
import {roleOptions} from "@/options/options";
import {TRACKER_REMOVE_MEMBER_MUTATION} from "@/modules/trackers/api/TrackerRemoveMember";
import {TRACKER_UPDATE_MEMBER_ROLE_MUTATION} from "@/modules/trackers/api/TrackerUpdateMemberRole";
import {useAuthStore} from "@/modules/auth/store/authStore";


type TTrackerManageMemberProps = {
  isModalOpen: boolean;
  trackerId: string;
  trackerMembers: T_GQL_tracker_tracker_members[];
}

const props = defineProps<TTrackerManageMemberProps>()
// eslint-disable-next-line vue/no-dupe-keys
const {isModalOpen, trackerId, trackerMembers} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const authStore = useAuthStore()
const message = useMessage()
const dialog = useDialog()
const {t} = useI18n()


const tableInitialValue = computed(() => trackerMembers.value.reduce((acc, memberItem) => {
  acc[memberItem.id] = memberItem.role
  return acc
}, {}))

const table = ref(tableInitialValue)


const {
  mutate: updateMember,
  loading: loadingUpdateMember,
  error: errorUpdateMember
} = useMutation<T_GQL_trackerUpdateMemberRole_trackerUpdateMemberRole, T_GQL_trackerUpdateMemberRoleVariables>(TRACKER_UPDATE_MEMBER_ROLE_MUTATION);

const {
  mutate: removeMember,
  loading: loadingRemoveMember,
  error: errorRemoveMember
} = useMutation<T_GQL_trackerRemoveMember_trackerRemoveMember, T_GQL_trackerRemoveMemberVariables>(TRACKER_REMOVE_MEMBER_MUTATION);


const roleSelectOptions = computed(() => roleOptions.map(roleItem => ({
  label: t(roleItem.label),
  value: roleItem.value
})))


const getUserIdByMemberId = (memberId: string) => trackerMembers.value.find(member => member.id === memberId)?.user?.id || ''


/**
 * Update giver user role
 */
const updateUserRole = async (memberId: string, role: ETrackerMemberRole) => {
  const userId: string = getUserIdByMemberId(memberId)

  try {
    const {data} = await updateMember({
      trackerId: trackerId.value,
      userId: userId,
      role: role,
    });

    if (data) {
      message.success(t('trackers.notify.updated_member'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('trackers.notify.not_updated_member')}: ${error.message}`);
    }
  }
}


/**
 * Delete given user from tracker
 */
const onDeleteBtnClick = (memberId: string) => {
  const userId: string = getUserIdByMemberId(memberId)

  if (userId) {
    dialog.error({
      transformOrigin: 'center',
      showIcon: false,
      title: t('trackers.form.delete_member'),
      content: t('app.confirm'),
      positiveText: t('app.actions.delete'),
      negativeText: t('app.actions.cancel'),
      onPositiveClick: async () => {
        try {
          await removeMember({
            trackerId: trackerId.value,
            userId
          })

          emit('updateData')
          message.success(t('trackers.notify.deleted_member'))
        } catch (error) {
          const alertMessage = error?.extensions?.message ?? error?.message;

          if (alertMessage) {
            message.error(`${t('trackers.notify.not_deleted_member')}: ${error.message}`);
          }
        }
      },
    })
  }


}
</script>

<template>
  <n-space>
    <n-modal
        :show="isModalOpen"
        :mask-closable="true"
        preset="dialog"
        :show-icon="false"
        :title="$t('trackers.form.manage_members')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider/>

      <n-space vertical size="large">
        <template
            v-for="member in trackerMembers"
            :key="member.id"
        >
          <template v-if="member.user.id !== authStore.user?.id">
            <n-space justify="space-between">
              <n-space>
                {{ member.user.lastname }} {{ member.user.firstname.charAt(0) }}.
              </n-space>

              <n-space>
                <n-select
                    v-model:value="table[member.id]"
                    :placeholder="$t('trackers.form.field.role.placeholder')"
                    :options="roleSelectOptions"
                    @update:value="(role) => updateUserRole(member.id, role)"
                />

                <n-button
                    type="error"
                    secondary
                    block
                    strong
                    :bordered="true"
                    @click="onDeleteBtnClick(member.id)"
                >
                  <template #icon>
                    <n-icon>
                      <icon-trash-bin/>
                    </n-icon>
                  </template>
                </n-button>
              </n-space>
            </n-space>
          </template>
        </template>
      </n-space>
    </n-modal>
  </n-space>
</template>
