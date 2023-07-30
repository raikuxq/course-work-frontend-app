<script setup lang="ts">
import {ref} from 'vue';
import {useAuthStore} from '../../store/authStore';
import {useMutation} from '@vue/apollo-composable'
import {AUTH_LOGIN_MUTATION} from '../../api/AuthLoginMutation';
import {useRouter} from 'vue-router';
import {NInput, NForm, NFormItemRow, NButton, NGradientText, darkTheme, NConfigProvider} from 'naive-ui'
import {ERouteName} from "@/router";
import {LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from "@/options/constants";
import {useField} from 'vee-validate';
import {useValidation} from "@/common/hooks/useValidation";
import {useI18n} from "vue-i18n";


const router = useRouter();
const authStore = useAuthStore();
const {t} = useI18n()


const email = ref('');
const password = ref('');
const {VALIDATION_EMAIL, VALIDATION_PASSWORD} = useValidation()
const {errorMessage: emailError} = useField(email, VALIDATION_EMAIL)
const {errorMessage: passwordError} = useField(password, VALIDATION_PASSWORD)

const {mutate: authLogin, loading, error} = useMutation(AUTH_LOGIN_MUTATION);

/**
 *
 */
const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const {data} = await authLogin({
      email: email.value,
      password: password.value
    });

    const {accessToken, refreshToken, user} = data.authLogin;

    authStore.setUser(user);

    await localStorage.setItem(LS_KEY_ACCESS_TOKEN, accessToken);
    await localStorage.setItem(LS_KEY_REFRESH_TOKEN, refreshToken);

    await router.push({name: ERouteName.HOME});
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert(t('auth.singInError') + error.message);
    }
  }
};
</script>

<template>
  <n-form @submit="handleLogin">
    <n-config-provider :theme="darkTheme">

      <n-form-item-row
          :label="$t('auth.email.label')"
          :feedback="emailError || ''"
      >
        <n-input
            type="email"
            :placeholder="$t('auth.email.placeholder')"
            v-model:value.trim="email"
        />
      </n-form-item-row>
    </n-config-provider>
    <n-config-provider :theme="darkTheme">

      <n-form-item-row
          :label="$t('auth.password.label')"
          :feedback="passwordError || ''"
      >
        <n-input
            type="password"
            :placeholder="$t('auth.password.placeholder')"
            v-model:value.trim="password"
        />
      </n-form-item-row>
    </n-config-provider>

    <n-button
        type="primary"
        :loading="loading"
        block
        strong
        attr-type="submit"
    >
      {{ $t('auth.signIn') }}
    </n-button>

    <n-gradient-text v-if="error" type="error">
      {{ error }}
    </n-gradient-text>
  </n-form>
</template>
