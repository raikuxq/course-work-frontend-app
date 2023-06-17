<script setup lang="ts">
import {useMutation} from "@vue/apollo-composable";
import {PROFILE_UPDATE_MUTATION} from "@/modules/profile/api/ProfileUpdate";
import {computed, ref, toRefs} from "vue";
// import {useRouter} from "vue-router";
// import {useAuthStore} from "@/modules/auth/store/authStore";
import {useI18n} from "vue-i18n";
import {
  darkTheme,
  NButton,
  NConfigProvider,
  NForm,
  NFormItemRow,
  NGradientText,
  NInput,
  NModal,
  useMessage
} from "naive-ui";
import {useValidation} from "@/common/hooks/useValidation";
import {useField} from "vee-validate";
import {TUseAuthStoreStateUser, useAuthStore} from "@/modules/auth/store/authStore";

const message = useMessage()
const {t} = useI18n()
const authStore = useAuthStore()

const userData = computed<TUseAuthStoreStateUser | null>(() => {
  return authStore.user
})

const {mutate: updateUser, loading, error} = useMutation(PROFILE_UPDATE_MUTATION);

const firstName = ref<string>(userData?.value?.firstname || '')
const lastName = ref<string>(userData?.value?.lastname || '')

const {VALIDATION_FIRSTNAME, VALIDATION_LASTNAME} = useValidation()

const {errorMessage: firstNameError} = useField(firstName, VALIDATION_FIRSTNAME)
const {errorMessage: lastNameError} = useField(lastName, VALIDATION_LASTNAME)


/**
 *
 */
const submit = async (event) => {
  event.preventDefault();

  try {
    const {data} = await updateUser({
      firstname: firstName.value,
      lastname: lastName.value
    });

    if (data) {
      message.success(t('app.auth.updateUserSuccess'))
    }
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert(t('app.auth.updateUserError') + error.message);
    }
  }
}
</script>

<template>
  <n-form @submit="submit">
    <n-config-provider :theme="darkTheme">

      <n-form-item-row
          :label="$t('app.auth.firstname.label')"
          :feedback="firstNameError || ''"
      >
        <n-input
            type="text"
            :placeholder="$t('app.auth.firstname.placeholder')"
            v-model:value.trim="firstName"
        />

      </n-form-item-row>

      <n-form-item-row :label="$t('app.auth.lastname.label')">
        <n-input
            type="text"
            :placeholder="$t('app.auth.lastname.placeholder')"
            v-model:value.trim="lastName"
        />

        <n-gradient-text v-if="lastNameError" type="error">
          {{ firstNameError }}
        </n-gradient-text>
      </n-form-item-row>
    </n-config-provider>

    <n-button
        type="primary"
        :loading="loading"
        block
        strong
        attr-type="submit"
    >
      {{ $t('app.auth.updateUser') }}
    </n-button>

    <n-gradient-text v-if="error" type="error">
      {{ error }}
    </n-gradient-text>
  </n-form>
</template>
