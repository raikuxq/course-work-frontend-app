<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, useMessage} from "naive-ui";
import {CHANNEL_UPDATE_MUTATION} from "@/modules/channels/api/ChannelsUpdate";
import {ERouteName} from "@/router";
import type {T_GQL_channel_channel, T_GQL_channelUpdate} from "@/types/graphql";

type TChannelsUpdateFormProps = {
  isModalOpen: boolean;
  channelData: T_GQL_channel_channel;
}

const props = defineProps<TChannelsUpdateFormProps>()
const {isModalOpen, channelData} = toRefs(props)

const {
  id,
  title: initialTitle,
  description: initialDescription
} = toRefs(channelData.value)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const router = useRouter()
const message = useMessage()
const {t} = useI18n()


const {mutate: updateChannels, loading: loadingChannel, error: errorChannel} = useMutation(CHANNEL_UPDATE_MUTATION);


const title = ref(initialTitle.value || '')
const description = ref(initialDescription.value || '')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await updateChannels<T_GQL_channelUpdate>({
      id: id.value,
      title: title.value,
      description: description.value,
    });

    const dataResponse = data as T_GQL_channelUpdate

    if (dataResponse) {
      const channelId = dataResponse.channelUpdate.id

      message.success(t('channels.notify.updated'))
      await router.push({name: ERouteName.CHANNEL, params: {channelId}})
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('channels.notify.not_updated')}: ${error.message}`);
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
        :title="$t('channels.form.update')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider/>
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('channels.form.field.title.label')"
        >
          <n-input
              type="text"
              :placeholder="$t('channels.form.field.title.placeholder')"
              v-model:value.trim="title"
          />
        </n-form-item-row>

        <n-form-item-row
            :label="$t('channels.form.field.desc.label')"
        >
          <n-input
              type="textarea"
              :placeholder="$t('channels.form.field.desc.placeholder')"
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
          {{ $t('channels.form.update') }}
        </n-button>

        <n-gradient-text v-if="errorChannel" type="error">
          {{ errorChannel }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
