<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="row">
      <div class="col">
        <label for="title" class="block text-sm font-medium text-gray-700"
          >Download file(s)</label
        >
      </div>
    </div>

    <div class="row mt-4">
      <div class="col">
        <label
          for="File Type"
          class="inline-block text-sm font-medium text-gray-700"
          >File type</label
        >
        <select
          v-model="form.filetype"
          name="filetype"
          class="mt-1 block w-full border-gray text-gray-700 p-1"
        >
          <option value="XLSX">XLSX</option>
          <option value="PDF">PDF</option>
        </select>

              <div class="row mt-4">
        <div class="col">
          <label for="title" class="block text-sm font-medium text-gray-700"
            >Statuses to include in the file</label
          >
          <div>
            <div>
              <input class="mt-4" for="Done" label="done" type="checkbox" v-model="form.pdf"/>
              <span class="ml-4 font-medium text-large text-gray-700">Done</span>
              <div></div>
              <input label="todo" for="Todo" type="checkbox" v-model="form.xlsx" /><span
                class="ml-4 font-medium text-large text-gray-700"
                >Todo</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    
      </div>


    <div class="row mt-5">
      <div class="col text-right">
        <button class="bg-green-400 px-4 py-2 rounded" @click="addTodo">
          Download
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

//import NameCard from "./NameCard.vue";

export default {
  data() {
    return {
      apiURL: process.env.VUE_APP_BACKEND_URL,
      form: {
        title: "New Task",
        date: new Date(),
        filetype: "XLSX",
        userName: "Mary",
      },
    };
  },
  components: {
    //NameCard
  },
  computed: {},

  methods: {
    async addTodo() {
      let newName = this.name;
      this.form.userName = newName;
      await axios({
        url: `${this.apiURL}api/createTask`,
        method: "POST",
        data: this.form,
      });

      this.$emit("task-added", { userName: newName }); //Tuleb app.vuest, emit saadab sündmuse 'task-added' parent componendile

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
