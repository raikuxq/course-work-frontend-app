<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {PROFILE_CHANGE_PASSWORD_MUTATION} from "@/modules/profile/api/ProfileChangePassword";
import {ref, toRefs} from "vue";
// import {useRouter} from "vue-router";
// import {useAuthStore} from "@/modules/auth/store/authStore";
import {useI18n} from "vue-i18n";
import {NButton, NForm, NFormItemRow, NGradientText, NInput, NModal, useMessage} from "naive-ui";
import {useValidation} from "@/shared/hooks/useValidation";
import {useField} from "vee-validate";


type TProfileChangePasswordProps = {
  isModalOpen: boolean;
}

const props = defineProps<TProfileChangePasswordProps>()
const { isModalOpen } = toRefs(props)

const emit = defineEmits<{
  (e: 'closeModal'): void
}>()


const message = useMessage()
const {t} = useI18n()


const {mutate: changePassword, loading, error} = useMutation(PROFILE_CHANGE_PASSWORD_MUTATION);

const oldPassword = ref('')
const newPassword = ref('')

const { VALIDATION_PASSWORD } = useValidation()
const { errorMessage: oldPasswordError } = useField(oldPassword, VALIDATION_PASSWORD)
const { errorMessage: newPasswordError } = useField(newPassword, VALIDATION_PASSWORD)


/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await changePassword({
      oldPassword: oldPassword.value,
      newPassword: newPassword.value
    });

    if (data) {
      message.success(t('auth.changePasswordSuccess'))
      emit('closeModal')
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert(t('auth.changePasswordError') + error.message);
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
        :title="$t('auth.changePasswordTitle')"
        transform-origin="center"
        @close="emit('closeModal')"
    >
      <n-form @submit="submit">
        <n-form-item-row :label="$t('auth.oldPassword.label')">
          <n-input
              type="password"
              :placeholder="$t('auth.oldPassword.placeholder')"
              v-model:value.trim="oldPassword"
          />

          <n-gradient-text v-if="oldPasswordError" type="error">
            {{ oldPasswordError }}
          </n-gradient-text>
        </n-form-item-row>

        <n-form-item-row :label="$t('auth.newPassword.label')">
          <n-input
              type="password"
              :placeholder="$t('auth.newPassword.placeholder')"
              v-model:value.trim="newPassword"
          />

          <n-gradient-text v-if="newPasswordError" type="error">
            {{ newPasswordError }}
          </n-gradient-text>
        </n-form-item-row>

        <n-button
            type="primary"
            :loading="loading"
            block
            strong
            attr-type="submit"
        >
          {{ $t('auth.changePassword') }}
        </n-button>

        <n-gradient-text v-if="error" type="error">
          {{ error }}
        </n-gradient-text>
      </n-form>
    </n-modal>
  </div>
</template>
