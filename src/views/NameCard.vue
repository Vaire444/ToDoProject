<template>
<div class="container"> 
  <div class ="firstrow row"> 
  <div class="search-name bg-white shadow rounded px-3 pt-3 pb-5 border border-white col-lg-6 ">

    <div class="row">
      <div class="col">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >User Name</label
        >

    <select class="form-control" @change="selectName($event)">
    <option value="" selected disabled>Choose</option>
    <option v-for="existingUserName in existingUserNames" :value="existingUserName" :key="existingUserName">{{ existingUserName}}</option>
  </select>

        <input
          v-model="name"
          type="text"
          name="title"
          class="mt-1 block w-full border-gray p-1"
        />
      </div>
    </div>

    <col class="row mt-5">
      <div class="col text-right">
        <button class="bg-green-400 px-4 py-2 rounded" @click="addName(), $store.commit('setName', name);">

          Find your Tasks
        </button>
      </div>
  </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
    apiURL: process.env.VUE_APP_BACKEND_URL,
      form: {
        userName: this.$store.state.name
      },
  existingUserNames: [],
    };
  },
 computed: mapState({
    name: (state) => state.name,
    nameAlias: "name",
  }),
  beforeMount() {
    this.getAllUsers();
  },
  methods: {
  selectName(event) {
  this.$store.state.name = event.target.options[event.target.options.selectedIndex].text
  },

  async getAllUsers() {
      const getAll = await axios({
        url: `${this.apiURL}api/all-users`,
        method: "GET",
      });
      this.existingUserNames = getAll.data;
    },

    async addName() {
      //eslint-disable-next-line no-console
      //axioust ei ole vaja eraldi välja tuua
      //this.$emit('name-added', { 
       // userName: this.form.userName
      //})
      this.$router.push("/tasks")
      //Tuleb app.vuest, emit saadab sündmuse 'task-added' parent componendile
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
.search-name {
  border-bottom: 1px solid rgba(55, 65, 81, 0.3);
  border-radius: 0;
  justify-content: center;
  margin: 100px;
}
.firstrow {
  justify-content: center;
  display: flex;
  margin: 100px;
}
</style>
