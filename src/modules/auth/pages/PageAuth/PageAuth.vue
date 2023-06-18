<script setup lang="ts">
import AuthLogin from "@/modules/auth/components/AuthLogin/AuthLogin.vue";
import AuthReg from "@/modules/auth/components/AuthReg/AuthReg.vue";
import {NTabPane, NTabs, NCard, darkTheme, NConfigProvider, lightTheme} from 'naive-ui'
import s from "./PageAuth.module.scss"
</script>

<template>
  <div :class="s.PageAuth">
    <div :class="s.PageAuth__tabs">
      <n-config-provider :theme="darkTheme">
        <n-card>
          <n-config-provider :theme="lightTheme">
            <n-tabs
                default-value="signin"
                size="large"
                animated
                pane-wrapper-style="margin: 0 -4px"
                pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
            >
              <n-tab-pane name="signin" :tab="$t('app.auth.signIn')">
                <br/>
                <AuthLogin/>
              </n-tab-pane>
              <n-tab-pane name="signup" :tab="$t('app.auth.signUp')">
                <br/>
                <AuthReg/>
              </n-tab-pane>
            </n-tabs>
          </n-config-provider>
        </n-card>
      </n-config-provider>
    </div>
  </div>
</template>
