<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, useMessage} from "naive-ui";
import {ERouteName} from "@/app/router";
import type {T_GQL_channelJoin} from "@/shared/types/graphql";
import {CHANNEL_JOIN_TO_MUTATION} from "@/modules/channels/api/ChannelsJoinTo";

type TChannelsJoinFormProps = {
  isModalOpen: boolean;
}

const props = defineProps<TChannelsJoinFormProps>()
const {isModalOpen} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const router = useRouter()
const message = useMessage()
const {t} = useI18n()


const {
  mutate: joinChannels,
  loading: loadingChannel,
  error: errorChannel
} = useMutation<T_GQL_channelJoin>(CHANNEL_JOIN_TO_MUTATION);


const inviteLink = ref('')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await joinChannels<T_GQL_channelJoin>({
      inviteLink: inviteLink.value
    });

    if (data) {
      const channelId = data.channelJoin.id

      message.success(t('channels.notify.joined'))
      await router.push({name: ERouteName.CHANNEL, params: {channelId}})

      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('channels.notify.not_joined')}: ${error.message}`);
    }
  } finally {
    inviteLink.value = ''
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
        :title="$t('channels.form.join')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider/>
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('channels.form.field.inviteLink.label')"
        >
          <n-input
              type="text"
              :placeholder="$t('channels.form.field.inviteLink.placeholder')"
              v-model:value.trim="inviteLink"
          />
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loadingChannel"
            block
            strong
            attr-type="submit"
        >
          {{ $t('channels.form.join') }}
        </n-button>

        <n-gradient-text v-if="errorChannel" type="error">
          {{ errorChannel }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
