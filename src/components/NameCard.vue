<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">

    <div class="row">
      <div class="col">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >User Name</label
        >
        <input
          v-model="form.userName"
          type="text"
          name="title"
          class="mt-1 block w-full border-gray p-1"
        />
      </div>
    </div>

    <col class="row mt-5">
      <div class="col text-right">
        <button class="bg-green-400 px-4 py-2 rounded" @click="addName();  $store.commit('setName', form.userName);">
          Find your Tasks
        </button>
      </div>



  </div>
</template>
<script>
//import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      form: {
        userName: "John"
      },
  input: "",
    };
  },
 computed: mapState({
    name: (state) => state.name,
    nameAlias: "name",
  }),

  methods: {
    async addName() {
      //axioust ei ole vaja eraldi välja tuua
      this.$emit('name-added', { 
        userName: this.form.userName
      }) //Tuleb app.vuest, emit saadab sündmuse 'task-added' parent componendile
      // this.form = { //selle osa saadame evendiga kaasa
      //   userName: "John"
      // }
    },
  },
};
</script>
<style scoped>
.border-gray {
  border-bottom: 1px solid rgba(55, 65, 81, 0.3);
  border-radius: 0;
}
</style>
