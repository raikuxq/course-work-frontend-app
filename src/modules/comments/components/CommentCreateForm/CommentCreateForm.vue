<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {ref, toRefs} from "vue";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NDivider, NInput, NModal, useMessage} from "naive-ui";
import type {
  T_GQL_commentCreate_commentCreate,
  T_GQL_commentCreateVariables
} from "@/shared/types/graphql";
import {COMMENT_CREATE_MUTATION} from "@/modules/comments/api/CommentCreate";

type TCommentCreateFormProps = {
  isModalOpen: boolean;
  issueReportId: string;
}

const props = defineProps<TCommentCreateFormProps>()
// eslint-disable-next-line vue/no-dupe-keys
const {isModalOpen, issueReportId} = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void,
  (e: 'updateData'): void,
}>()


const message = useMessage()
const {t} = useI18n()


const {mutate: createComment, loading: loadingComment, error: errorComment} = useMutation<T_GQL_commentCreate_commentCreate, T_GQL_commentCreateVariables>(COMMENT_CREATE_MUTATION);


const content = ref('')

/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await createComment({
      content: content.value,
      issueReportId: issueReportId.value
    });

    if (data) {
      message.success(t('comments.notify.created'))
      emit('updateData')
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      message.error(`${t('comments.notify.not_created')}: ${error.message}`);
    }
  } finally {
    content.value = ''
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
        :title="$t('comments.actions.create')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-divider />
      <n-form @submit="submit">
        <n-form-item-row
            :label="$t('comments.form.field.content.label')"
        >
          <n-input
              type="textarea"
              :placeholder="$t('comments.form.field.content.placeholder')"
              v-model:value.trim="content"
          />
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loadingComment"
            block
            strong
            attr-type="submit"
        >
          {{ $t('comments.form.create') }}
        </n-button>

        <n-gradient-text v-if="errorComment" type="error">
          {{errorComment }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
