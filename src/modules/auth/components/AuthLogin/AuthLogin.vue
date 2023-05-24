<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { useMutation } from '@vue/apollo-composable'
import { AUTH_LOGIN_MUTATION } from '../../api/AuthLoginMutation';
// import { VALIDATION_RULES } from '@/app/validation';
import { useRouter } from 'vue-router';
import { NButton, NInput, NSpace } from 'naive-ui'

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
    await localStorage.setItem('accessToken', accessToken);
    await localStorage.setItem('refreshToken', refreshToken);
    authStore.setUser(user);
    // router.push("/channels");
    alert('Успех входа')
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert('Ошибка входа ' + error.message);
    }
  }
};
</script>

<template>
  <div>
    <form @submit="handleLogin">
      <n-space vertical>
        <n-input type="email" placeholder="Email" v-model:value="email" />
        <n-input type="password" placeholder="Пароль" v-model:value="password" />
        <n-button type="tertiary" attr-type="submit">Войти</n-button>
      </n-space>
    </form>
  </div>
</template>
