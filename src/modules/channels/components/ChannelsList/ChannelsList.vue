<script setup lang="ts">
import {useQuery} from "@vue/apollo-composable";
import {CHANNELS_LIST_SHORT_QUERY} from "@/modules/channels/api/ChannelsList";
import {computed} from "vue";
import {ERouteName} from "@/router";
import {NList, NListItem} from 'naive-ui';

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
  <div>
    <n-list>
      <n-list-item
          v-for="item in channelsListOwn"
          :key="item?.id"
      >
        <RouterLink
            :to="{ name: ERouteName.CHANNEL, params: { channelId: item.id } }"
        >
          {{ item.title }}
        </RouterLink>
      </n-list-item>
    </n-list>
  </div>
  <br>
  <div>
    <n-list>
      <n-list-item
          v-for="item in channelsListMember"
          :key="item?.id"
      >
        <RouterLink
            :to="{ name: ERouteName.CHANNEL, params: { channelId: item.id } }"
        >
          {{ item.title }}
        </RouterLink>
        {{ item.title }}
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped>

</style>
