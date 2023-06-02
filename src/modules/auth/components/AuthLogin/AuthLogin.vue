<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { useMutation } from '@vue/apollo-composable'
import { AUTH_LOGIN_MUTATION } from '../../api/AuthLoginMutation';
// import { VALIDATION_RULES } from '@/app/validation';
import { useRouter } from 'vue-router';
import { NInput, NForm, NFormItemRow, NButton } from 'naive-ui'
import {ERouteName} from "@/router";
import {LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from "@/app/constants";

const email = ref('');
const password = ref('');

const authStore = useAuthStore();
const { mutate: authLogin, loading, error } = useMutation(AUTH_LOGIN_MUTATION);
const router = useRouter();

const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const { data } = await authLogin({
        email: email.value,
        password: password.value
    });
    const { accessToken, refreshToken, user } = data.authLogin;
    await localStorage.setItem(LS_KEY_ACCESS_TOKEN, accessToken);
    await localStorage.setItem(LS_KEY_REFRESH_TOKEN, refreshToken);
    authStore.setUser(user);
    router.push({ name: ERouteName.HOME});
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert('Ошибка входа ' + error.message);
    }
  }
};
</script>

<template>
  <n-form @submit="handleLogin">
    <n-form-item-row label="Email">
      <n-input type="email" placeholder="" v-model:value="email" />
    </n-form-item-row>
    <n-form-item-row label="Пароль">
      <n-input type="password" placeholder="" v-model:value="password" />
    </n-form-item-row>
    <n-button type="primary" block secondary strong attr-type="submit">
      Sign in
    </n-button>
  </n-form>

</template>
