<template>
  <v-card elevation="24" outlined shaped class="mx-auto" max-width="320">
    <v-card-text>
      <p class="headline text--primary">{{ repo.fullName }}</p>
      <p>Otwarte PR <span class="text--primary"> {{ repo.openPR }}</span></p>
      <p>Gwiazdek <span class="text--primary"> {{ repo.stars }}</span></p>
      <p>Otwarte i zamknięte issue <span class="text--primary">{{ repo.openIssues }} / {{ repo.closedIssues }}</span></p>
      <p>Stosunek PR/Issue <span class="text--primary">{{ repo.prIssueRatio | truncateNumber }}</span></p>
      <v-divider class="my-3"></v-divider>
      <div class="text-caption">Ostatni commit</div>
      <p>{{ repo.lastCommit | formatDate }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Repository } from "../core/model/repository";
import { formatDate } from "../core/date-formatter";

export default Vue.extend({
  name: "Repository",
  props: {
    repo: {
      type: Repository,
      required: true,
    },
  },
  filters: {
    formatDate(value: Date) {
        return formatDate(value);
    },
    truncateNumber(value:number) {
        return value.toFixed(2);
    }
  },
});
</script>