<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {computed, ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, NSelect, useMessage} from "naive-ui";
import {REPORTS_CREATE_MUTATION} from "@/modules/issues/api/IssuesCreate";
import {priorityOptions, statusOptions, typeOptions} from "@/options/options";
import type {T_GQL_tracker_tracker_members_user} from "@/types/graphql";
import {EIssueReportPriority, EIssueReportStatus, EIssueReportType} from "@/types/graphql";


type TIssueCreateFormPropsMember = {
  id: string;
  user: Omit<T_GQL_tracker_tracker_members_user, '__typename'>
  role: string;
}

type TIssueCreateFormProps = {
  isModalOpen: boolean;
  trackerId: string;
  members: TIssueCreateFormPropsMember[];
}

const props = defineProps<TIssueCreateFormProps>()
const {isModalOpen, members, trackerId} = toRefs(props)

const emit = defineEmits<{
  (e: 'updateData'): void,
  (e: 'closeModal'): void
}>()


const router = useRouter()
const message = useMessage()
const {t} = useI18n()


const {mutate: createIssueReport, loading, error} = useMutation(REPORTS_CREATE_MUTATION);


const typeOptionsSelect = computed(() => typeOptions.map((item) => ({...item, label: t(item.label)})))
const priorityOptionsSelect = computed(() => priorityOptions.map((item) => ({...item, label: t(item.label)})))
const statusOptionsSelect = computed(() => statusOptions.map((item) => ({...item, label: t(item.label)})))
const responsiblePersonOptionsSelect = computed(() => {
  return members.value
      .filter((obj, index, self) => index === self.findIndex((t) =>
          (t.user?.firstname === obj.user?.firstname) &&
          (t.user?.lastname === obj.user?.lastname) &&
          (t.role === obj.role)
      ))
      .map(memberItem => {
        return ({
          label: `${memberItem.user.firstname} ${memberItem.user.lastname}`,
          value: memberItem.id
        })
      })
})


const title = ref('')
const description = ref('')
const status = ref(EIssueReportStatus.NEW)
const type = ref(EIssueReportType.FUNCTIONALITY)
const priority = ref(EIssueReportPriority.NORMAL)
const responsiblePerson = ref(null)


/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await createIssueReport({
      trackerId: trackerId.value,
      responsiblePersonId: responsiblePerson.value,
      priority: priority.value,
      status: status.value,
      title: title.value,
      type: type.value,
      description: description.value,
    });

    if (data) {
      message.success(t('bug.notify.created'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('bug.notify.not_created')}: ${error.message}`);
    }
  } finally {
    title.value = ''
    description.value = ''
    status.value = EIssueReportStatus.NEW
    type.value = EIssueReportType.FUNCTIONALITY
    priority.value = EIssueReportPriority.NORMAL
    responsiblePerson.value = null
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
        :title="$t('bug.form.create')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider />
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('bug.form.field_title.label')"
        >
          <n-input
              type="text"
              :placeholder="$t('bug.form.field_title.placeholder')"
              v-model:value.trim="title"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('bug.form.priority.label')"
        >
          <n-select
              v-model:value="priority"
              :placeholder="$t('bug.form.priority.placeholder')"
              :options="priorityOptionsSelect"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('bug.form.type.label')"
        >
          <n-select
              v-model:value="type"
              :placeholder="$t('bug.form.type.placeholder')"
              :options="typeOptionsSelect"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('bug.form.status.label')"
        >
          <n-select
              v-model:value="status"
              :placeholder="$t('bug.form.status.placeholder')"
              :options="statusOptionsSelect"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('bug.form.responsible.label')"
        >
          <n-select
              v-model:value="responsiblePerson"
              :placeholder="$t('bug.form.responsible.placeholder')"
              :options="responsiblePersonOptionsSelect"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('bug.form.desc.label')"
        >
          <n-input
              type="textarea"
              :placeholder="$t('bug.form.desc.placeholder')"
              v-model:value.trim="description"
          />
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loading"
            block
            strong
            attr-type="submit"
        >
          {{ $t('bug.form.submit') }}
        </n-button>

        <n-gradient-text v-if="error" type="error">
          {{ error }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
