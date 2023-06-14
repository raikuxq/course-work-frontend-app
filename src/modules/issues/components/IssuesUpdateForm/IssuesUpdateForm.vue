<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {computed, ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, NSelect, useMessage} from "naive-ui";
import {REPORTS_CREATE_MUTATION} from "@/modules/issues/api/IssuesCreate";
import {priorityOptions, statusOptions, typeOptions} from "@/options/options";
import type {T_GQL_issueReport_issueReport, T_GQL_tracker_tracker_members_user} from "@/types/graphql";
import {EIssueReportPriority, EIssueReportStatus, EIssueReportType} from "@/types/graphql";
import {REPORTS_UPDATE_MUTATION} from "@/modules/issues/api/IssuesUpdate";

type TIssueUpdateFormProps = {
  isModalOpen: boolean;
  issueReportData: T_GQL_issueReport_issueReport;
}

const props = defineProps<TIssueUpdateFormProps>()
const {isModalOpen, issueReportData} = toRefs(props)

const {
  priority: currentPriority,
  status: currentStatus,
  title: currentTitle,
  description: currentDescription,
  responsiblePerson: currentResponsiblePerson,
  type: currentType,
  tracker
} = toRefs(issueReportData.value)

const {members} = toRefs(tracker.value)

const emit = defineEmits<{
  (e: 'updateData'): void,
  (e: 'closeModal'): void
}>()


const router = useRouter()
const message = useMessage()
const {t} = useI18n()


const {mutate: updateIssueReport, loading, error} = useMutation(REPORTS_UPDATE_MUTATION);


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


const title = ref(currentTitle.value || '')
const description = ref(currentDescription.value || '')
const status = ref(currentStatus.value || EIssueReportStatus.FULFILMENT)
const type = ref(currentType.value || EIssueReportType.FUNCTIONALITY)
const priority = ref(currentPriority.value || EIssueReportPriority.NORMAL)
const responsiblePerson = ref(currentResponsiblePerson.value.id || null)


/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await updateIssueReport({
      issueReportId: issueReportData.value.id,
      responsiblePersonId: responsiblePerson.value,
      priority: priority.value,
      status: status.value,
      title: title.value,
      type: type.value,
      description: description.value,
    });

    if (data) {
      message.success(t('bug.notify.updated'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('bug.notify.not_updated')}: ${error.message}`);
    }
  }
}
</script>

<template>
  <div>
    <n-modal
        :show="isModalOpen"
        :mask-closable="true"
        :show-icon="false"
        :title="$t('bug.form.update')"
        preset="dialog"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider/>

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
          {{ $t('bug.form.update_short') }}
        </n-button>

        <n-gradient-text v-if="error" type="error">
          {{ error }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
