<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, useMessage} from "naive-ui";
import type {
  T_GQL_channelCategoryCreate_channelCategoryCreate,
  T_GQL_channelCategoryCreateVariables
} from "@/types/graphql";
import {CATEGORY_CREATE_MUTATION} from "@/modules/categories/api/CategoriesCreate";

type TCategoriesCreateFormProps = {
  isModalOpen: boolean;
  channelId: string;
}

const props = defineProps<TCategoriesCreateFormProps>()
const {isModalOpen, channelId} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const message = useMessage()
const {t} = useI18n()


const {mutate: createCategory, loading: loadingChannel, error: errorChannel} = useMutation<T_GQL_channelCategoryCreate_channelCategoryCreate, T_GQL_channelCategoryCreateVariables>(CATEGORY_CREATE_MUTATION);


const title = ref('')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await createCategory({
      channelId: channelId.value,
      title: title.value,
    });

    if (data) {
      message.success(t('categories.notify.created'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('categories.notify.not_created')}: ${error.message}`);
    }
  } finally {
    title.value = ''
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
        :title="$t('categories.actions.create')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider />
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('categories.form.field.title.label')"
        >
          <n-input
              type="text"
              :placeholder="$t('categories.form.field.title.placeholder')"
              v-model:value.trim="title"
          />
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loadingChannel"
            block
            strong
            attr-type="submit"
        >
          {{ $t('categories.form.create') }}
        </n-button>

        <n-gradient-text v-if="errorChannel" type="error">
          {{errorChannel }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
