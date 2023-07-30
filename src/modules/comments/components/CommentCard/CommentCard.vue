<script setup lang="ts">
import {darkTheme, NCard, NConfigProvider} from 'naive-ui'
import type {T_GQL_comment_comment} from "@/shared/types/graphql";
import {computed, toRefs} from "vue";

type TCommentCard = T_GQL_comment_comment;

const props = defineProps<TCommentCard>()

const {
  createdAt,
  author,
  id,
  content
} = toRefs(props)

const createdAtToDisplay = computed(() => new Date(createdAt.value).toLocaleDateString())
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <n-card
        :key="id"
        size="small"
    >
      <template #header v-if="author">
        {{ author.user.firstname }} {{ author.user.lastname }}
      </template>

      <template #footer>
        ({{ createdAtToDisplay }})
      </template>

      <template #default>
        {{ content }}
      </template>
    </n-card>
  </n-config-provider>
</template>
