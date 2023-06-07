<script setup lang="ts">
import AuthLogin from "@/modules/auth/components/AuthLogin/AuthLogin.vue";
import AuthReg from "@/modules/auth/components/AuthReg/AuthReg.vue";
import { NTabPane, NTabs, NCard, NSpace} from 'naive-ui'
import s from "./PageAuth.module.scss"
</script>

<template>
  <div :class="s.PageAuth">
    <div :class="s.PageAuth__tabs">
      <n-card>
        <n-tabs
            default-value="signin"
            size="large"
            animated
            pane-wrapper-style="margin: 0 -4px"
            pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        >
          <n-tab-pane name="signin" :tab="$t('app.auth.signIn')">
            <n-space/>
            <br />
            <AuthLogin />
          </n-tab-pane>
          <n-tab-pane name="signup" :tab="$t('app.auth.signUp')">
            <n-space/>
            <br />
            <AuthReg />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </div>
  </div>
</template>
