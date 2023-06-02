<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../store/authStore';
import { useMutation } from '@vue/apollo-composable'
import { AUTH_SIGNUP_MUTATION } from '../../api/AuthRegMutation';
// import { VALIDATION_RULES } from '@/app/validation';
import { useRouter } from 'vue-router';
import { NInput, NForm, NFormItemRow, NButton } from 'naive-ui'
import {ERouteName} from "@/router";
import {LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from "@/app/constants";

const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const firstname = ref('');
const lastname = ref('');

const authStore = useAuthStore();
const { mutate: authReg, loading, error } = useMutation(AUTH_SIGNUP_MUTATION);
const router = useRouter();

const handleReg = async (event) => {
  event.preventDefault();

  try {
    const { data } = await authReg({
      email: email.value,
      password: password.value
    });
    const { accessToken, refreshToken, user } = data.authSignup;
    await localStorage.setItem(LS_KEY_ACCESS_TOKEN, accessToken);
    await localStorage.setItem(LS_KEY_REFRESH_TOKEN, refreshToken);
    authStore.setUser(user);
    router.push({ name: ERouteName.HOME});
    alert('Успех входа')
  } catch (error) {
    const alertMessage = error?.extensions?.message ?? error?.message;

    if (alertMessage) {
      alert('Ошибка регистрации ' + error.message);
    }
  }
};
</script>

<template>
  <n-form @submit="handleReg">
    <n-form-item-row label="Имя">
      <n-input type="text" placeholder="Иван" v-model:value="firstname" />
    </n-form-item-row>
    <n-form-item-row label="Фамилия">
      <n-input type="text" placeholder="Иванов" v-model:value="lastname" />
    </n-form-item-row>
    <n-form-item-row label="Email">
      <n-input type="email" placeholder="" v-model:value="email" />
    </n-form-item-row>
    <n-form-item-row label="Пароль">
      <n-input type="password" placeholder="" v-model:value="password" />
    </n-form-item-row>
    <n-form-item-row label="Подтверждение пароля">
      <n-input type="password" placeholder="" v-model:value="passwordConfirm" />
    </n-form-item-row>

    <n-button type="primary" block secondary strong attr-type="submit">
      Sign up
    </n-button>
  </n-form>
</template>
