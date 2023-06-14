<script setup lang="ts">
import {NCard} from 'naive-ui'
import type {T_GQL_comment_comment} from "@/types/graphql";
import {computed, toRefs} from "vue";

type TCommentCard = T_GQL_comment_comment;

const props = defineProps<TCommentCard>()

const {
  createdAt,
  author,
  id,
  content
} = toRefs(props)

const createdAtToDisplay = computed(() => new Date(createdAt as string).toLocaleDateString())
</script>

<template>
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
</template>
