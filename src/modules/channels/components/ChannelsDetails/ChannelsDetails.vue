<script setup lang="ts">
import type {T_GQL_channel_channel} from "@/types/graphql";
import {toRefs} from "vue";

type TChannelsDetailsProps = Omit<T_GQL_channel_channel, '__typename'>

const props = defineProps<TChannelsDetailsProps>()

const {
  author,
  categories,
  id,
  description,
  members,
  title,
  inviteLink
} = toRefs(props)

</script>

<template>
  <div>
    <div v-if="id" class="details-item">
      <span class="details-item-label">ID: </span>
      <span>{{ id || '' }}</span>
    </div>

    <div v-if="title" class="details-item">
      <span class="details-item-label">Заголовок: </span>
      <span>{{ title || '' }}</span>
    </div>

    <div v-if="author" class="details-item">
      <span class="details-item-label">Автор: </span>
      <span>{{ author.firstname || '' }} {{ author.lastname || '' }}</span>
    </div>

    <div v-if="inviteLink" class="details-item">
      <span class="details-item-label">Код для приглашения: </span>
      <span>{{ inviteLink || '' }}</span>
    </div>

    <div v-if="description" class="details-item">
      <span class="details-item-label">Описание: </span>
      <span>{{ description || '' }}</span>
    </div>

    <div v-if="members && members.length" class="details-item">
      <span class="details-item-label">Участники: </span>
      <span>
        {{ members.map(member => `${member.lastname} ${member.firstname.charAt(0)}.`).join(', ') }}
      </span>
    </div>

    <div v-if="categories && categories.length" class="details-item">
      <span class="details-item-label">Категории: </span>
      <span>
        {{ categories.map(category => category.title).join(', ') }}
      </span>
    </div>
  </div>
</template>
