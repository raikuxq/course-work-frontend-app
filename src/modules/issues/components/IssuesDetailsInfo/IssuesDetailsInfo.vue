<script setup lang="ts">
import type {T_GQL_issueReport_issueReport} from "@/shared/types/graphql";
import {computed, toRefs} from "vue";
import {NDescriptions, NDescriptionsItem, NDivider} from 'naive-ui'
import s from './IssuesDetailsInfo.module.scss'
import {labelsPriority, labelsRole, labelsStatus, labelsType} from '@/options/options';
import {useI18n} from "vue-i18n";

type TIssuesDetailsInfoProps = T_GQL_issueReport_issueReport

const props = defineProps<TIssuesDetailsInfoProps>()

const {
  createdAt,
  updatedAt,
  priority,
  status,
  responsiblePerson,
  type,
  tracker,
  author
} = toRefs(props)

const {t} = useI18n()

const dateToDisplay = (date: string) => new Date(date).toLocaleString()

const createdAtToDisplay = computed(() => dateToDisplay(createdAt.value))
const updatedAtToDisplay = computed(() => dateToDisplay(updatedAt.value))
</script>

<template>
  <n-descriptions
      :class="s.IssuesDetailsInfo__descContainer"
      label-placement="top"
      :column="1"
      :title="$t('trackers.labels.info')"
  >
    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.created_at')"
        v-if="createdAt"
    >
      {{ createdAtToDisplay }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.updated_at')"
        v-if="updatedAt"
    >
      {{ updatedAtToDisplay }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.status')"
        v-if="status"
    >
      {{ $t(labelsStatus[status]) }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.priority')"
        v-if="priority"
    >
      {{ $t(labelsPriority[priority]) }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.type')"
        v-if="type"
    >
      {{ $t(labelsType[type]) }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.person')"
        v-if="responsiblePerson"
    >
      {{
        `${responsiblePerson.user.firstname} ${responsiblePerson.user.lastname.charAt(0)} (${$t(labelsRole[responsiblePerson.role])})`
      }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('issues.author')"
        v-if="author"
    >
      {{
        `${author.user.firstname} ${author.user.lastname.charAt(0)} (${$t(labelsRole[author.role])})`
      }}
    </n-descriptions-item>

    <n-descriptions-item
        :class="s.IssuesDetailsInfo__descItem"
        :label="$t('trackers.title')"
        v-if="tracker"
    >
      {{ tracker.title }}
    </n-descriptions-item>
  </n-descriptions>

  <n-divider :class="s.IssuesDetailsInfo__divider"/>
</template>
