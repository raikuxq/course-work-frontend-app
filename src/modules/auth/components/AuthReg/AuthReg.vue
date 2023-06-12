<script setup lang="ts">
import {computed, markRaw, ref, watch} from 'vue';
import {useAuthStore} from '../../store/authStore';
import {useMutation} from '@vue/apollo-composable'
import {AUTH_SIGNUP_MUTATION} from '../../api/AuthRegMutation';
import {useRouter} from 'vue-router';
import {NInput, NForm, NFormItemRow, NButton, NGradientText} from 'naive-ui'
import {ERouteName} from "@/router";
import {LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from "@/app/constants";
import {useForm} from 'vee-validate';
import {useValidation} from "@/common/hooks/useValidation";
import {useI18n} from "vue-i18n";
import * as yup from 'yup';


enum EAuthRegFields {
  FIRSTNAME = 'FIRSTNAME',
  LASTNAME = 'LASTNAME',
  PASSWORD = 'PASSWORD',
  PASSWORD_CONFIRM = 'PASSWORD_CONFIRM',
  EMAIL = 'EMAIL'
}

type TAuthRegFields = {
  [key in EAuthRegFields]: string;
}


const router = useRouter();
const authStore = useAuthStore();
const {t} = useI18n()


const {
  VALIDATION_EMAIL,
  VALIDATION_PASSWORD,
  VALIDATION_LASTNAME,
  VALIDATION_FIRSTNAME,
} = useValidation()


const initialValues: TAuthRegFields = {
  [EAuthRegFields.FIRSTNAME]: '',
  [EAuthRegFields.LASTNAME]: '',
  [EAuthRegFields.EMAIL]: '',
  [EAuthRegFields.PASSWORD]: '',
  [EAuthRegFields.PASSWORD_CONFIRM]: '',
}

const schema = yup.object({
  [EAuthRegFields.FIRSTNAME]: VALIDATION_FIRSTNAME,
  [EAuthRegFields.LASTNAME]: VALIDATION_LASTNAME,
  [EAuthRegFields.EMAIL]: VALIDATION_EMAIL,
  [EAuthRegFields.PASSWORD]: VALIDATION_PASSWORD,
  [EAuthRegFields.PASSWORD_CONFIRM]: VALIDATION_PASSWORD
})

const {errors, meta} = useForm({
  validationSchema: schema,
  initialValues: initialValues
})


const email = ref(initialValues[EAuthRegFields.EMAIL]);
const password = ref(initialValues[EAuthRegFields.PASSWORD]);
const passwordConfirm = ref(initialValues[EAuthRegFields.PASSWORD_CONFIRM]);
const firstname = ref(initialValues[EAuthRegFields.FIRSTNAME]);
const lastname = ref(initialValues[EAuthRegFields.LASTNAME]);

const emailError = t(errors[EAuthRegFields.EMAIL] || '')
const passwordError = t(errors[EAuthRegFields.PASSWORD] || '')
const passwordConfirmError = t(errors[EAuthRegFields.PASSWORD_CONFIRM] || '')
const firstNameError = t(errors[EAuthRegFields.FIRSTNAME] || '')
const lastNameError = t(errors[EAuthRegFields.LASTNAME] || '')

const {mutate: authReg, loading, error} = useMutation(AUTH_SIGNUP_MUTATION);


/**
 *
 */
const handleReg = async (event) => {
  event.preventDefault();

  try {
    const {data} = await authReg({
      email: email.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value
    });
    const {accessToken, refreshToken, user} = data.authSignup;

    authStore.setUser(user);

    await localStorage.setItem(LS_KEY_ACCESS_TOKEN, accessToken);
    await localStorage.setItem(LS_KEY_REFRESH_TOKEN, refreshToken);
    await router.push({name: ERouteName.HOME});
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert(t('app.auth.signUpError') + error.message);
    }
  }
};
</script>

<template>
  <n-form @submit="handleReg">
    <n-form-item-row
        :label="$t('app.auth.firstname.label')"
        :feedback="firstNameError"
        :show-feedback="firstNameError && meta[EAuthRegFields.FIRSTNAME]?.touched"
    >
      <n-input
          :name="EAuthRegFields.FIRSTNAME"
          type="text"
          :placeholder="$t('app.auth.firstname.placeholder')"
          v-model:value.trim="firstname"
      />
    </n-form-item-row>
    <n-form-item-row
        :label="$t('app.auth.lastname.label')"
        :feedback="lastNameError"
        :show-feedback="lastNameError && meta[EAuthRegFields.LASTNAME]?.touched"
    >
      <n-input
          :name="EAuthRegFields.LASTNAME"
          type="text"
          :placeholder="$t('app.auth.lastname.placeholder')"
          v-model:value.trim="lastname"
      />
    </n-form-item-row>
    <n-form-item-row
        :label="$t('app.auth.email.label')"
        :feedback="emailError"
    >
      <n-input
          :name="EAuthRegFields.EMAIL"
          type="email"
          :placeholder="$t('app.auth.email.placeholder')"
          v-model:value.trim="email"
      />
    </n-form-item-row>
    <n-form-item-row
        :label="$t('app.auth.password.label')"
        :feedback="passwordError"
    >
      <n-input
          type="password"
          :name="EAuthRegFields.PASSWORD"
          :placeholder="$t('app.auth.password.placeholder')"
          v-model:value.trim="password"
      />
    </n-form-item-row>
    <n-form-item-row
        :label="$t('app.auth.passwordConfirm.label')"
        :feedback="passwordConfirmError"
    >
      <n-input
          :name="EAuthRegFields.PASSWORD_CONFIRM"
          type="password"
          :placeholder="$t('app.auth.passwordConfirm.placeholder')"
          v-model:value.trim="passwordConfirm"
      />
    </n-form-item-row>

    <n-button
        type="primary"
        block
        strong
        :loading="loading"
        attr-type="submit"
    >
      {{ $t('app.auth.signUp') }}
    </n-button>

    <n-gradient-text v-if="error" type="error">
      {{ error }}
    </n-gradient-text>
  </n-form>
</template>
