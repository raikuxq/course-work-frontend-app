<script setup lang="ts">
import {useI18n} from "vue-i18n";
import s from "@/modules/profile/components/ProfileWidget/ProfileWidget.module.scss";
import {RouterLink} from "vue-router";

const {locale} = useI18n()
</script>

<template>
  <template v-if="locale === 'ru'">
    <span
        :class="s.ProfileWidget__actionsIcon"
        @click.prevent="locale = 'en'"
    >
      EN
    </span>
  </template>

  <template v-else-if="locale === 'en'">
    <span
        :class="s.ProfileWidget__actionsIcon"
        @click.prevent="locale = 'ru'"
    >
      RU
    </span>
  </template>
</template>
