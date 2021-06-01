<template>
  <v-app>
    <v-main>
      <Modal />
      <Codes />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Codes from "./components/Codes.vue";
import Modal from './components/Modal.vue';
import { OrganizationController } from "./core/controller/organization-controller";
import { RepositoryController } from "./core/controller/repository-controller";
import { UserController } from "./core/controller/user-controller";
import { HttpRequests } from "./core/request/http-requests";

const baseUrl = "https://api.github.com";
const endpoints = {
  organizations: `${baseUrl}/organizations`,
  orgs: `${baseUrl}/orgs`,
  repo: {
    userRepositories: (username:string) => `${baseUrl}/users/${username}/repos`,
    repos: `${baseUrl}/repos`,
    reposPulls: (fullName:string) => `${endpoints.repo.repos}/${fullName}/pulls`,
    reposIssues: (fullName:string) => `${endpoints.repo.repos}/${fullName}/issues`,
  },
  users: `${baseUrl}/users`,
};

const httpRequest = new HttpRequests();
export const organizationController = new OrganizationController(
  endpoints.organizations,
  endpoints.orgs,
  httpRequest
);
export const repositoryController = new RepositoryController(endpoints.repo,httpRequest);
export const userController = new UserController(endpoints.users,httpRequest);

export default Vue.extend({
  name: "App",
  components: {
    Codes,
    Modal
  },
});
</script>
<style>
:root {
  font-size: 18px;
  --clr-error: #ff2667;
  --primary-color: #6300A5;
}

.text-primary-clr{
  color: var(--primary-color);
}
</style>