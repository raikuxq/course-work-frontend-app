<script setup lang="ts">
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_LIST_SHORT_QUERY} from "@/modules/channels/api/ChannelsList";
import {computed} from "vue";
import {ERouteName} from "@/router";
import {NList, NListItem} from 'naive-ui';
import s from './ChannelsList.module.scss'

const {result, loading, error} = useQuery(CHANNELS_LIST_SHORT_QUERY);


const channelsListMember = computed(() => {
  if (!result) {
    return [];
  }

  try {
    const {userChannelsMemberOf} = result.value

    return userChannelsMemberOf.map((userChannel) => userChannel.channel);
  } catch (e) {
    return []
  }
});


const channelsListOwn = computed(() => {
  if (!result) {
    return [];
  }

  try {
    const {userChannelsOwn} = result.value

    return userChannelsOwn
  } catch (e) {
    return []
  }
});


</script>

<template>
  <div :class="s.channelsList">
    <div :class="s.channelsList__container">
      <n-list :class="s.channelsList__containerList" :show-divider="false">
        <n-list-item
            v-for="item in channelsListOwn"
            :key="item?.id"
            :class="s.channelsList__containerListItem"
        >
          <RouterLink
              :class="s.channelsList__link"
              :to="{ name: ERouteName.CHANNEL, params: { channelId: item.id } }"
          >
            {{ item.title }}
          </RouterLink>
        </n-list-item>
      </n-list>
    </div>
    <div :class="s.channelsList__container">
      <n-list :class="s.channelsList__containerList" :show-divider="false">
        <n-list-item
            v-for="item in channelsListMember"
            :key="item?.id"
            :class="s.channelsList__containerListItem"
        >
          <RouterLink
              :class="s.channelsList__link"
              :to="{ name: ERouteName.CHANNEL, params: { channelId: item.id } }"
          >
            {{ item.title }}
          </RouterLink>
          {{ item.title }}
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<style lang="scss" module src="./ChannelsList.module.scss" />

