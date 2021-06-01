<template>
  <v-card elevation="24" outlined shaped class="mx-auto" max-width="320">
    <v-card-text>
      <p class="headline text--primary">{{ org.login }}</p>
      <p>Obserwujących <span class="text--primary">{{ org.followers }}</span></p>
      <p>Repozytoriów <span class="text--primary">{{ org.repos }}</span></p>
      <v-divider class="my-3"></v-divider>
      <div class="text-caption">Utworzono</div>
      <p>{{ org.createdAt | formatDate }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Organization } from "../core/model/organization";
import { formatDate } from "../core/date-formatter";

export default Vue.extend({
  name: "Organization",
  props: {
    org: {
      type: Organization,
      required: true,
    },
  },
  filters: {
    formatDate(value: Date) {
      return formatDate(value);
    },
  },
});
</script>
