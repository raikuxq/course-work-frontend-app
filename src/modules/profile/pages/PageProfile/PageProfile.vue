<script setup lang="ts">
import {NButton, NDescriptions, NDescriptionsItem, NDivider, NPageHeader, NSpace} from "naive-ui";
import {computed, ref} from "vue";
import ProfileChangePassword from "@/modules/profile/components/ProfileChangePassword/ProfileChangePassword.vue";
import ProfileUpdate from "@/modules/profile/components/ProfileUpdate/ProfileUpdate.vue";
import {TUseAuthStoreStateUser, useAuthStore} from "@/modules/auth/store/authStore";
import s from './PageProfile.module.scss'

const isModalChangePasswordOpen = ref<boolean>(false)

const authStore = useAuthStore()

const userData = computed<TUseAuthStoreStateUser | null>(() => {
  return authStore.user
})
</script>

<style scoped>

</style>

<template>
  <div :class="s.PageProfile">
    <n-page-header data-dark :title="$t('app.userSettings')">
      <template #extra>
        <n-space>
          <n-button
              type="primary"
              block
              strong
              attr-type="button"
              @click="isModalChangePasswordOpen = true"
          >
            {{ $t('app.auth.changePassword') }}
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <div v-if="userData" :class="s.PageProfile__static">

      <n-descriptions label-placement="top" :column="1" :title="$t('app.userInfo')">
        <n-descriptions-item
            :label="$t('app.auth.id')"
        >
          {{ userData.id }}
        </n-descriptions-item>

        <n-descriptions-item
            :label="$t('app.auth.email.label')"
        >
          {{ userData.email }}
        </n-descriptions-item>
      </n-descriptions>

      <n-divider/>
    </div>

    <div :class="s.PageProfile__form">
      <ProfileUpdate/>
    </div>

    <ProfileChangePassword
        :isModalOpen="isModalChangePasswordOpen"
        @closeModal="isModalChangePasswordOpen = false"
    />
  </div>
</template>
