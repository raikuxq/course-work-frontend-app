<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {computed, ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NModal, useMessage, NSelect} from "naive-ui";
import type {
  T_GQL_tracker_tracker_channel_members_user,
  T_GQL_tracker_tracker_members,
  T_GQL_trackerAddMember_trackerAddMember,
  T_GQL_trackerAddMemberVariables
} from "@/shared/types/graphql";
import {ETrackerMemberRole} from "@/shared/types/graphql";
import {roleOptions} from "@/options/options";
import {TRACKER_ADD_MEMBER_MUTATION} from "@/modules/trackers/api/TrackersAddMember";

type TTrackerAddMemberProps = {
  isModalOpen: boolean;
  trackerId: string;
  channelMembers: T_GQL_tracker_tracker_channel_members_user[];
  trackerMembers: T_GQL_tracker_tracker_members[];
}

const props = defineProps<TTrackerAddMemberProps>()
// eslint-disable-next-line vue/no-dupe-keys
const {isModalOpen, trackerId, trackerMembers, channelMembers} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const message = useMessage()
const {t} = useI18n()


const {
  mutate: addMember,
  loading: loadingMember,
  error: errorMember
} = useMutation<T_GQL_trackerAddMember_trackerAddMember, T_GQL_trackerAddMemberVariables>(TRACKER_ADD_MEMBER_MUTATION);


const role = ref<ETrackerMemberRole | null>(null)
const user = ref<string | null>(null)


const userSelectOptions = computed(() => channelMembers.value
    .filter((memberItem) => {
      const trackerMembersIds = trackerMembers.value.map((trackerMemberItem) => trackerMemberItem.user.id)
      return !trackerMembersIds.includes(memberItem.id)
    })
    .map((memberItem) => ({
      label: `${memberItem.firstname} ${memberItem.lastname}`,
      value: memberItem.id
    })))


const roleSelectOptions = computed(() => roleOptions.map(roleItem => ({
  label: t(roleItem.label),
  value: roleItem.value
})))


/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    if (!user.value || !role.value) {
      throw new Error('User and role are required fields')
    }

    const {data} = await addMember({
      userId: user.value!,
      role: role.value!,
      trackerId: trackerId.value
    });

    if (data) {
      message.success(t('trackers.notify.added_member'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('trackers.notify.not_added_member')}: ${error.message}`);
    }
  } finally {
    role.value = null
    user.value = null
  }
}
</script>

<template>
  <div>
    <n-modal
        :show="isModalOpen"
        :mask-closable="true"
        preset="dialog"
        :show-icon="false"
        :title="$t('trackers.form.add_member')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider/>
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('trackers.form.field.user.label')"
        >
          <n-select
              v-model:value="user"
              :placeholder="$t('trackers.form.field.user.placeholder')"
              :options="userSelectOptions"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('trackers.form.field.role.label')"
        >
          <n-select
              v-model:value="role"
              :placeholder="$t('trackers.form.field.role.placeholder')"
              :options="roleSelectOptions"
          />
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loadingMember"
            block
            strong
            attr-type="submit"
        >
          {{ $t('trackers.form.add_member_short') }}
        </n-button>

        <n-gradient-text v-if="errorMember" type="error">
          {{ errorMember }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
