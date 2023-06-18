<script setup lang="ts">
import {TUseAuthStoreStateUser, useAuthStore} from "@/modules/auth/store/authStore";
import {NAvatar, NIcon, NTooltip} from 'naive-ui'
import {Person as IconPerson, SettingsSharp as IconSettings} from "@vicons/ionicons5";
import {computed} from "vue";
import {ERouteName} from "@/router";
import {useLogout} from "@/common/hooks/useLogout";
import {RouterLink} from "vue-router";
import {LogOutOutline as IconLogOut} from "@vicons/ionicons5";
import s from './ProfileWidget.module.scss'
import WidgetLocale from "@/common/components/widget/WidgetLocale/WidgetLocale.vue";

const authStore = useAuthStore()
const {logout} = useLogout()

const userData = computed<TUseAuthStoreStateUser | null>(() => {
  return authStore.user
})

</script>

<style scoped>

</style>

<template>
  <div :class="s.ProfileWidget">
    <RouterLink
        v-if="userData"
        :to="{ name: ERouteName.PROFILE }"
        :class="s.ProfileWidget__container"
    >
      <div :class="s.ProfileWidget__avatar">
        <n-avatar
            size="medium"
            round
            object-fit="cover"
            :class="s.ProfileWidget__avatarIcon"
        >
          <n-icon>
            <icon-person/>
          </n-icon>
        </n-avatar>
      </div>

      <div :class="s.ProfileWidget__user">
        <div :class="s.ProfileWidget__userRow">{{ userData.firstname }}</div>
        <div :class="s.ProfileWidget__userRow">{{ userData.lastname }}</div>
      </div>
    </RouterLink>

    <div :class="s.ProfileWidget__actions">

      <WidgetLocale />

      <n-tooltip placement="bottom" trigger="hover">
        <template #trigger>
          <RouterLink
              :class="s.ProfileWidget__actionsIcon"
              :to="{ name: ERouteName.AUTH }"
              @click.prevent="logout"
          >
            <n-icon size="28">
              <icon-log-out/>
            </n-icon>
          </RouterLink>
        </template>
        <span>{{ $t('app.auth.logout') }}</span>
      </n-tooltip>


    </div>
  </div>
</template>
