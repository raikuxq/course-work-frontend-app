<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, NSelect, useMessage} from "naive-ui";
import {CHANNEL_CREATE_MUTATION} from "@/modules/channels/api/ChannelsCreate";
import {ERouteName} from "@/router";
import type {T_GQL_channel, T_GQL_channelCreate, T_GQL_channelCreate_channelCreate} from "@/types/graphql";
import {CATEGORY_CREATE_MUTATION} from "@/modules/categories/api/CategoriesCreate";

type TChannelsCreateFormProps = {
  isModalOpen: boolean;
}

const props = defineProps<TChannelsCreateFormProps>()
const {isModalOpen} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const router = useRouter()
const message = useMessage()
const {t} = useI18n()


const {mutate: createChannels, loading: loadingChannel, error: errorChannel} = useMutation(CHANNEL_CREATE_MUTATION);
const {mutate: createChannelsCategory, loading: loadingCategory, error: errorCategory} = useMutation(CATEGORY_CREATE_MUTATION);


const title = ref('')
const description = ref('')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await createChannels<T_GQL_channelCreate>({
      title: title.value,
      description: description.value,
    });

    const dataResponse = data as T_GQL_channelCreate

    if (dataResponse) {
      const channelId = dataResponse.channelCreate.id

      await createChannelsCategory({
        title: t('categories.list.main'),
        channelId,
      })

      message.success(t('channels.notify.created'))
      await router.push({ name: ERouteName.CHANNEL, params: { channelId} })
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('channels.notify.not_created')}: ${error.message}`);
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
        :title="$t('channels.form.create')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider />
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
            :loading="loadingCategory || loadingChannel"
            block
            strong
            attr-type="submit"
        >
          {{ $t('channels.form.create') }}
        </n-button>

        <n-gradient-text v-if="errorCategory || errorChannel" type="error">
          {{ errorCategory || errorChannel }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
