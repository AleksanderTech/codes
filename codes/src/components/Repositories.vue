<template>
  <div class="d-flex flex-column">
    <h1 class="text-center ma-8">Repozytoria</h1>
    <v-text-field class="d-inline-block mx-auto"
      label="Użytkownika"
      color="primary"
      v-model="username"
      @keypress.enter="find">
      <template v-slot:append>
        <v-btn depressed tile color="normal" class="ma-0" @click="find">
          szukaj
        </v-btn>
      </template>
    </v-text-field>
    <template v-if="dataPages.length >= 1">
      <div v-for="repo in lastPage.data">
        <Repository :repo="repo" class="ma-5"/>
      </div>
      <Pagination
        v-on:next-page="nextPage"
        v-on:prev-page="prevPage"
        class="text-center"
        :isNext="lastPage.nextResource.isAvailable"
      >
        <v-icon slot="prev-button">mdi-arrow-left-bold</v-icon>
        <v-icon slot="next-button">mdi-arrow-right-bold</v-icon>
      </Pagination>
    </template>
  </div>
</template>


<script lang="ts">
import Vue from "vue";
import Pagination from "./Pagination.vue";
import Repository from "./Repository.vue";
import { repositoryController as controller } from "../App.vue";
import { DataPage } from "../core/model/data-page";
import { showErrorModal } from "../core/modals";
import { ModalGuts } from "../core/model/modal-guts";
import { Repository as Repo } from "../core/model/repository";

export default Vue.extend({
  name: "Repositories",
  components: {
    Pagination,
    Repository,
  },
  data() {
    return {
      username: "fabpot" as string,
      perPage: 1,
      dataPages: [] as DataPage<Repo>[],
    };
  },
  computed: {
    lastPage(): DataPage<Repo> {
      return this.dataPages[this.dataPages.length - 1];
    },
  },
  methods: {
    nextPage() {
      this.nextRepos(this.perPage, this.lastPage.nextResource.url);
    },
    prevPage() {
      this.prevRepos();
    },
    nextRepos(perPage: number, url?: string): void {
      controller.nextRepositories(this.username, perPage, url).then((r) => {
        if (r.areErrors()) {
          showErrorModal(ModalGuts.errorModalGuts("Ups...", r.errors));
        }
        if (r.value) {
          this.dataPages = this.dataPages.concat(
            new DataPage<Repo>(r.value.data, r.value.nextResource)
          );
        }
      });
    },
    prevRepos(): void {
      this.dataPages.pop();
    },
    find(){
      this.dataPages = [];
      this.nextRepos(this.perPage);
    }
  },
  created() {
    this.nextRepos(this.perPage);
  },
});
</script>