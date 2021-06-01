<template>
  <v-card elevation="24" outlined shaped class="mx-auto" max-width="320">
    <v-img height="250" v-bind:src="user.avatarUrl"></v-img>
    <v-card-text>
      <p class="headline text--primary">{{ user.login }}</p>
      <div class="text-caption">Zarejestrowany</div>
      <p>{{ user.createdAt | formatDate }}</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { User } from "../core/model/user";
import { formatDate } from "../core/date-formatter";

export default Vue.extend({
  name: "User",
  props: {
    user: {
      type: User,
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

<style>
</style>