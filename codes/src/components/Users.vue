<template>
  <div>
    <h1 class="text-center ma-8">Użytkownicy</h1>
    <template v-if="dataPages.length >= 1">
      <div v-for="user in lastPage.data">
        <User :user="user" class="ma-5" />
      </div>
      <Pagination
        v-on:next-page="nextPage"
        v-on:prev-page="prevPage"
        class="text-center"
        :isNext="lastPage.nextResource.isAvailable">
        <v-icon slot="prev-button">mdi-arrow-left-bold</v-icon>
        <v-icon slot="next-button">mdi-arrow-right-bold</v-icon>
      </Pagination>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Pagination from "./Pagination.vue";
import User from "./User.vue";
import { userController as controller } from "../App.vue";
import { DataPage } from "../core/model/data-page";
import { showErrorModal } from "../core/modals";
import { ModalGuts } from "../core/model/modal-guts";
import { User as Usr } from "../core/model/user";

export default Vue.extend({
  name: "Users",
  components: {
    Pagination,
    User,
  },
  data() {
    return {
      perPage: 1,
      dataPages: [] as DataPage<Usr>[],
    };
  },
  computed: {
    lastPage(): DataPage<Usr> {
      return this.dataPages[this.dataPages.length - 1];
    },
  },
  methods: {
    nextPage() {
      this.nextUsers(this.perPage, this.lastPage.nextResource.url);
    },
    prevPage() {
      this.prevUsers();
    },
    nextUsers(perPage: number, url?: string): void {
      controller.nextUsers(perPage, url).then(r => {
          if (r.areErrors()) {
            showErrorModal(ModalGuts.errorModalGuts("Ups...", r.errors));
          }
          if (r.value) {
            this.dataPages = this.dataPages.concat(new DataPage<Usr>(r.value.data,r.value.nextResource));
          }
        });
    },
    prevUsers(): void {
      this.dataPages.pop();
    },
  },
  created() {
    this.nextUsers(this.perPage);
  },
});
</script>