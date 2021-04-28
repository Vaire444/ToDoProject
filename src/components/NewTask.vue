<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="row">
      <div class="col">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Title</label
        >

       <!-- <name-card class="my- 3" @name-added="newName" /> -->
     
        <input
          v-model="form.title"
          type="text"
          name="title"
          class="mt-1 block w-full border-gray p-1"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <label for="first_name" class="block text-sm font-medium text-gray-700"
          >Date</label
        >
        <datepicker
          class="block text-sm font-medium text-gray-700 p-1"
          placeholder="Select Date"
          v-model="form.date"
        ></datepicker>

      </div>

     <div class="col">
        <label class="block text-sm font-medium text-gray-700">Name</label>

        <span class="block text-sm font-medium text-gray-700 p-1">
          {{ name }}
        </span> 

      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
  
        <div
          class="inline-block w-2 h-2 rounded-full mr-2"
          :class="'bg-' + priorityColor + '-400'"
        />
        <label
          for="priority"
          class="inline-block text-sm font-medium text-gray-700"
          >Priority</label
        >
        <select
          v-model="form.priority"
          name="priority"
          class="mt-1 block w-full p-1"
        >
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      <div class="col">
        <div
          class="inline-block w-2 h-2 rounded-full mr-2"
          :class="'bg-' + form.color.toLowerCase() + '-400'"
        />
        <label
          for="color"
          class="inline-block text-sm font-medium text-gray-700"
          >Color</label
        >

        <select
          v-model="form.color"
          name="color"
          class="mt-1 block w-full border-gray p-1"
        >
          <option value="GRAY">Gray</option>
          <option value="BLUE">Blue</option>
          <option value="INDIGO">Indigo</option>
          <option value="PURPLE">Purple</option>
          <option value="PINK">Pink</option>
        </select>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col text-right">
        <button class="bg-green-400 px-4 py-2 rounded" @click="addTodo">
          Add todo
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Datepicker from "vuejs-datepicker";
//import NameCard from "./NameCard.vue";
import { mapState } from "vuex";

export default {
  data() {
    return {
      apiURL: process.env.VUE_APP_BACKEND_URL,
      form: {
        title: "New Task",
        date: new Date(),
        priority: "MEDIUM",
        color: "GRAY",
        userName: "Mary",
      },
    };
  },
  components: {
    Datepicker,
    //NameCard
  },
  computed: {
    priorityColor() {
      const mappings = {
        HIGH: "red",
        MEDIUM: "yellow",
        LOW: "green",
        default: "teal",
      };
      
      return mappings[this.form.priority] || mappings.default;
    },

   ...mapState({
    name: (state) => state.name,
    nameAlias: "name",
  }),
  },

  methods: {
    async addTodo() {
      let newName = this.name;
      this.form.userName = newName;
      await axios({
   
        url: `${this.apiURL}api/createTask`,
        method: "POST",
        data: this.form,
      })

      this.$emit('task-added', {userName: newName}) //Tuleb app.vuest, emit saadab sündmuse 'task-added' parent componendile
      
      // this.form = { //selle osa saadame evendiga kaasa
      //   title: "New Task",
      //   date: new Date(),
      //   priority: "MEDIUM",
      //   color: "GRAY",
      //   userName: "MARY"
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
