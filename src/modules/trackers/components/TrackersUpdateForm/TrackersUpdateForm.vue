<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, useMessage} from "naive-ui";
import {TRACKER_UPDATE_MUTATION} from "@/modules/trackers/api/TrackersUpdate";
import type {
  T_GQL_tracker, T_GQL_tracker_tracker,
  T_GQL_trackerUpdate,
  T_GQL_trackerUpdateVariables
} from "@/types/graphql";

type TTrackersUpdateFormProps = {
  isModalOpen: boolean;
  trackerData: T_GQL_tracker_tracker;
}

const props = defineProps<TTrackersUpdateFormProps>()
// eslint-disable-next-line vue/no-dupe-keys
const {isModalOpen, trackerData} = toRefs(props)

const {
  category,
  id,
  title: initialTitle,
  description: initialDesc
} = toRefs(trackerData.value)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const message = useMessage()
const {t} = useI18n()


const {
  mutate: updateTracker,
  loading: loadingChannel,
  error: errorChannel
} = useMutation<T_GQL_tracker, T_GQL_trackerUpdateVariables>(TRACKER_UPDATE_MUTATION);


const title = ref(initialTitle.value || '')
const description = ref(initialDesc.value || '')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await updateTracker<T_GQL_trackerUpdate>({
      id: id.value,
      title: title.value,
      description: description.value,
      channelCategoryId: category.value.id,
    });

    if (data) {
      message.success(t('trackers.notify.updated'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('trackers.notify.not_updated')}: ${error.message}`);
    }
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
        :title="$t('trackers.form.update')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider/>
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('trackers.form.field.title.label')"
        >
          <n-input
              type="text"
              :placeholder="$t('trackers.form.field.title.placeholder')"
              v-model:value.trim="title"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('trackers.form.field.desc.label')"
        >
          <n-input
              type="textarea"
              :placeholder="$t('trackers.form.field.desc.placeholder')"
              v-model:value.trim="description"
          />
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loadingChannel"
            block
            strong
            attr-type="submit"
        >
          {{ $t('trackers.form.update') }}
        </n-button>

        <n-gradient-text v-if="errorChannel" type="error">
          {{ errorChannel }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
