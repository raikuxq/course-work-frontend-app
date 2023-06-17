<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, useMessage} from "naive-ui";
import {TRACKER_CREATE_MUTATION} from "@/modules/trackers/api/TrackersCreate";
import {ERouteName} from "@/router";
import type {
  T_GQL_tracker,
  T_GQL_trackerCreate,
  T_GQL_trackerCreateVariables
} from "@/types/graphql";

type TTrackersCreateFormProps = {
  isModalOpen: boolean;
  channelCategoryId: string;
  channelId: string;
}

const props = defineProps<TTrackersCreateFormProps>()
const {isModalOpen, channelId, channelCategoryId} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const route = useRoute()
const router = useRouter()
const message = useMessage()
const {t} = useI18n()


const {mutate: createTrackers, loading: loadingChannel, error: errorChannel} = useMutation<T_GQL_tracker, T_GQL_trackerCreateVariables>(TRACKER_CREATE_MUTATION);


const title = ref('')
const description = ref('')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await createTrackers<T_GQL_trackerCreate>({
      channelId: channelId.value,
      title: title.value,
      description: description.value,
      channelCategoryId: channelCategoryId.value,
    });

    const dataResponse = data as T_GQL_trackerCreate

    if (dataResponse) {
      const trackerId = dataResponse.trackerCreate.id

      message.success(t('tracker.notify.created'))
      await router.push({ name: ERouteName.TRACKER, params: { trackerId, channelId: route.params.channelId } })
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('tracker.notify.not_created')}: ${error.message}`);
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
        :title="$t('tracker.form.create')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider />
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('tracker.form.field.title.label')"
        >
          <n-input
              type="text"
              :placeholder="$t('tracker.form.field.title.placeholder')"
              v-model:value.trim="title"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('tracker.form.field.desc.label')"
        >
          <n-input
              type="textarea"
              :placeholder="$t('tracker.form.field.desc.placeholder')"
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
          {{ $t('tracker.form.create') }}
        </n-button>

        <n-gradient-text v-if="errorChannel" type="error">
          {{errorChannel }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
