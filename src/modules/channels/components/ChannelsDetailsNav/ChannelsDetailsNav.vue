<script setup lang="ts">
import s from "@/modules/channels/components/ChannelsDetailsNav/ChannelsDetailsNav.module.scss";
import {ERouteName} from "@/router";
import {toRefs} from "vue";
import {NButton, NDescriptions, NDescriptionsItem, NDropdown, NPageHeader, NSpace} from 'naive-ui'
import {T_GQL_channel_channel} from "@/types/graphql";

/**
 * Types
 */
type TChannelsDetailsNavProps = Pick<T_GQL_channel_channel, 'title' | 'categories' | 'id'>


/**
 * Props
 */
const props = defineProps<TChannelsDetailsNavProps>()

const {
  categories,
  title,
  id,
} = toRefs(props)


</script>

<style scoped>

</style>

<template>
  <div>
    <n-page-header data-dark :title="`${title}: ${$t('channels.labels.categories')}`">
      <template #extra>
        <n-space>
          <n-button type="primary" block strong :bordered="false">
            Создать раздел
          </n-button>

          <n-button type="primary" secondary block strong :bordered="true">
            Создать баг-трекер
          </n-button>
        </n-space>
      </template>
    </n-page-header>

    <div :class="s.ChannelsDetailsNav__content">
      <n-descriptions
          v-if="categories && categories.length"
          label-placement="top"
          :column="1"
          :class="s.ChannelsDetailsNav__descContainer"
      >
        <n-descriptions-item
            v-for="categoriesItem in categories"
            :key="categoriesItem.id"
            :label="categoriesItem.title"
        >
          <div
              v-for="trackersItem in categoriesItem.trackers"
              :key="trackersItem.id"
              :class="s.ChannelsDetailsNav__linkContainer"
          >
            <RouterLink
                :class="s.ChannelsDetailsNav__linkItem"
                :to="{ name: ERouteName.TRACKER, params: { channelId: id, trackerId: trackersItem.id } }"
            >
              <span>{{ trackersItem.title }}</span>
            </RouterLink>
          </div>
        </n-descriptions-item>
      </n-descriptions>
    </div>
  </div>
</template>
