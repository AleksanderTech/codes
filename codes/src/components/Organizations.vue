<template>
  <div>
    <h1 class="text-center ma-8">Organizacje</h1>
    <template v-if="dataPages.length >= 1">
      <div v-for="org in lastPage.data">
        <Organization :org="org" class="ma-5" />
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
import Organization from "./Organization.vue";
import { organizationController as controller } from "../App.vue";
import { DataPage } from "../core/model/data-page";
import { showErrorModal } from "../core/modals";
import { ModalGuts } from "../core/model/modal-guts";
import { Organization as Org } from "../core/model/organization";

export default Vue.extend({
  name: "Organizations",
  components: {
    Pagination,
    Organization,
  },
  data() {
    return {
      perPage: 2,
      dataPages: [] as DataPage<Org>[],
    };
  },
  computed: {
    lastPage(): DataPage<Org> {
      return this.dataPages[this.dataPages.length - 1];
    },
  },
  methods: {
    nextPage() {
      this.nextOrganizations(this.perPage, this.lastPage.nextResource.url);
    },
    prevPage() {
      this.prevOrganizations();
    },
    nextOrganizations(perPage: number, url?: string): void {
      controller.nextOrganizations(perPage, url).then((r) => {
        if (r.areErrors()) {
          showErrorModal(ModalGuts.errorModalGuts("Ups...", r.errors));
        }
        if (r.value) {
          this.dataPages = this.dataPages.concat(
            new DataPage<Org>(r.value.data, r.value.nextResource)
          );
        }
      });
    },
    prevOrganizations(): void {
      this.dataPages.pop();
    },
  },
  created() {
    this.nextOrganizations(this.perPage);
  },
});
</script>