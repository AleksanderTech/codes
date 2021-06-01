<template>
  <div class="codes-wrapper">
    <div class="ma-5">
      <Organizations />
    </div>
    <div class="ma-5">
      <Users />
    </div>
    <div class="ma-5">
      <Repositories />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Pagination from "./Pagination.vue";
import Organizations from "./Organizations.vue";
import Users from "./Users.vue";
import Repositories from "./Repositories.vue";

export default Vue.extend({
  name: "Codes",
  components: {
    Pagination,
    Organizations,
    Users,
    Repositories
  },
  props: {
    msg: String,
  },
});
</script>
<style scoped>
.codes-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media only screen and (min-width: 1000px) {
  .codes-wrapper {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }
}
</style>

