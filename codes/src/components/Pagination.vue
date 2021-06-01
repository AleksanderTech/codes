<template>
  <div>
    <slot>
      <v-btn color=primary icon primary class="pagination-button" @click="prev" :disabled="!isPrev">
        <slot name="prev-button"><v-icon>mdi-arrow-left-bold</v-icon></slot>
      </v-btn>
      <span class="mx-5">{{ page }}</span>
      <v-btn color=primary icon class="pagination-button" @click="next" :disabled="!isNext">
        <slot name="next-button"><v-icon>mdi-arrow-right-bold</v-icon></slot>
      </v-btn>
    </slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Pagination",
  props: {
    isNext: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    isPrev(): boolean {
      return this.page > 1;
    },
  },
  methods: {
    prev(): void {
      if (this.page > 0) {
        this.page--;
        this.$emit("prev-page");
      }
    },
    next(): void {
      if (this.isNext) {
        this.page++;
        this.$emit("next-page");
      }
    },
  },
});
</script>
<style scoped>
.pagination-button {
  cursor: pointer;
}
</style>