<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title v-bind:class="{ 'clr-error': modalGuts.errors }">
          {{ modalGuts.title }}
        </v-card-title>
        <v-card-text>
          <p v-bind:class="{ 'clr-error': modalGuts.errors }" v-for="t in modalGuts.texts">
            {{ t }}
          </p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn v-bind:class="{ 'clr-error': modalGuts.errors }" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Events } from "../core/event/events";
import { ModalGuts } from "../core/model/modal-guts";
import { EventBus } from "../core/event/event-bus";

export default Vue.extend({
  name: 'Modal',
  data() {
    return {
      modalGuts: ModalGuts.blank(),
      dialog: false,
    };
  },
  created() {
    EventBus.$on(Events.SHOW_MODAL, (modalGuts: ModalGuts) => {
      this.modalGuts = modalGuts;
      this.dialog = true;
    });
  },
  methods: {
    hide() {
      this.dialog= false;
    },
    ok() {
      this.modalGuts.callback();
      this.hide();
    },
  },
});
</script>
<style scoped>
.clr-error {
  color: var(--clr-error);
}
</style>