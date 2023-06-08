<script setup lang="ts">
import {computed, ref} from 'vue';
import {useAuthStore} from '../../store/authStore';
import {useMutation} from '@vue/apollo-composable'
import {AUTH_SIGNUP_MUTATION} from '../../api/AuthRegMutation';
import {useRouter} from 'vue-router';
import {NInput, NForm, NFormItemRow, NButton, NGradientText} from 'naive-ui'
import {ERouteName} from "@/router";
import {LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from "@/app/constants";
// import {useForm} from 'vee-validate';
// import {useValidation} from "@/common/hooks/useValidation";
// import {useI18n} from "vue-i18n";
// import * as yup from 'yup';


enum EAuthRegFields {
  FIRSTNAME = 'FIRSTNAME',
  LASTNAME = 'LASTNAME',
  PASSWORD = 'PASSWORD',
  PASSWORD_CONFIRM = 'PASSWORD_CONFIRM',
  EMAIL = 'EMAIL'
}


const router = useRouter();
const authStore = useAuthStore();
// const {t} = useI18n()

const t = (s) => s


const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const firstname = ref('');
const lastname = ref('');

// const {
//   VALIDATION_EMAIL,
//   VALIDATION_PASSWORD,
//   VALIDATION_LASTNAME,
//   VALIDATION_FIRSTNAME,
// } = useValidation()

// const schema = computed(() => {
//   return yup.object({
//     [EAuthRegFields.FIRSTNAME]: VALIDATION_FIRSTNAME,
//     [EAuthRegFields.LASTNAME]: VALIDATION_LASTNAME,
//     [EAuthRegFields.EMAIL]: VALIDATION_EMAIL,
//     [EAuthRegFields.PASSWORD]: VALIDATION_PASSWORD,
//     [EAuthRegFields.PASSWORD_CONFIRM]: VALIDATION_PASSWORD
//   })
// })
//
// const { errors } = useForm({
//   validationSchema: schema
// })

const errors = {}

const { errorMessage: emailError } = errors[EAuthRegFields.EMAIL]
const { errorMessage: passwordError } = errors[EAuthRegFields.PASSWORD]
const { errorMessage: passwordConfirmError } = errors[EAuthRegFields.PASSWORD_CONFIRM]
const { errorMessage: firstNameError } = errors[EAuthRegFields.FIRSTNAME]
const { errorMessage: lastNameError } = errors[EAuthRegFields.LASTNAME]


const {mutate: authReg, loading, error} = useMutation(AUTH_SIGNUP_MUTATION);

/**
 *
 */
const handleReg = async (event) => {
  event.preventDefault();

  try {
    const {data} = await authReg({
      email: email.value,
      password: password.value
    });
    const {accessToken, refreshToken, user} = data.authSignup;

    authStore.setUser(user);

    await localStorage.setItem(LS_KEY_ACCESS_TOKEN, accessToken);
    await localStorage.setItem(LS_KEY_REFRESH_TOKEN, refreshToken);
    await router.push({name: ERouteName.HOME});
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert(t('auth.signUpError') + error.message);
    }
  }
};
</script>

<template>
  <n-form @submit="handleReg">
    <n-form-item-row :label="$t('auth.firstname.label')">
      <n-input
          :name="EAuthRegFields.FIRSTNAME"
          type="text"
          :placeholder="$t('auth.firstname.placeholder')"
          v-model:value.trim="firstname"
      />

      <n-gradient-text v-if="firstNameError" type="error">
        {{ firstNameError }}
      </n-gradient-text>
    </n-form-item-row>
    <n-form-item-row :label="$t('auth.lastname.label')">
      <n-input
          :name="EAuthRegFields.LASTNAME"
          type="text"
          :placeholder="$t('auth.lastname.placeholder')"
          v-model:value.trim="lastname"
      />

      <n-gradient-text v-if="lastNameError" type="error">
        {{ lastNameError }}
      </n-gradient-text>
    </n-form-item-row>
    <n-form-item-row :label="$t('auth.email.label')">
      <n-input
          :name="EAuthRegFields.EMAIL"
          type="email"
          :placeholder="$t('auth.email.placeholder')"
          v-model:value.trim="email"
      />

      <n-gradient-text v-if="emailError" type="error">
        {{ emailError }}
      </n-gradient-text>
    </n-form-item-row>
    <n-form-item-row :label="$t('auth.password.label')">
      <n-input
          :name="EAuthRegFields.PASSWORD"
          type="password"
          :placeholder="$t('auth.password.placeholder')"
          v-model:value.trim="password"
      />

      <n-gradient-text v-if="passwordError" type="error">
        {{ passwordError }}
      </n-gradient-text>
    </n-form-item-row>
    <n-form-item-row :label="$t('auth.passwordConfirm.label')">
      <n-input
          :name="EAuthRegFields.PASSWORD_CONFIRM"
          type="password"
          :placeholder="$t('auth.passwordConfirm.placeholder')"
          v-model:value.trim="passwordConfirm"
      />

      <n-gradient-text v-if="passwordConfirmError" type="error">
        {{ passwordConfirmError }}
      </n-gradient-text>
    </n-form-item-row>

    <n-button
        type="primary"
        block
        strong
        :loading="loading"
        attr-type="submit"
    >
      {{ $t('auth.signUp') }}
    </n-button>

    <n-gradient-text v-if="error" type="error">
      {{ error }}
    </n-gradient-text>
  </n-form>
</template>
