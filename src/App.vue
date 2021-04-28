<template>
  <div id="app">
    <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        
      <div>
        <div v-if="!isHidden" class="bg-gray-100 rounded-lg px-3 py-3 column-double-width rounded mr-4">
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
            Search Name
          </p>
          <name-card class="my-3" @name-added="getTasksByName" />
        </div>

         <div v-if="isHidden" class="bg-gray-100 rounded-lg px-3 py-3 column-double-width rounded mr-4">
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm"> Add new todo</p>
          <new-task class="my-3" @task-added="getTasksByName" />
        </div>

      </div>
      </div>

    
      

      <div v-if="isHidden" class="min-h-screen flex overflow-x-scroll py-12">
        <div
          v-for="column in columns"
          :key="column.title"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
        >
          <p
            class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
          >
            {{ column.title }}
          </p>
          <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
          <draggable
            :list="column.tasks"
            :animation="200"
            :style="{ height: !column.tasks.length ? '300px' : '' }"
            ghost-class="ghost-card"
            group="tasks"
            @change="moveTask($event, column)"
          >
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <task-card
              v-for="task in column.tasks"
              :key="task.id"
              :task="task"
              class="mt-3 cursor-move"
             @task-deleted="getTasksByName"
            ></task-card>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import TaskCard from "./components/TaskCard.vue";
import NewTask from "./components/NewTask.vue";
import NameCard from "./components/NameCard.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    NewTask,
    NameCard
  },
  data() {
    return {
      apiURL: process.env.VUE_APP_BACKEND_URL,
      //connections: true
      columns: [
        {
          title:"Todo",
          task: []  
        },
        {
          title:"Done",
          task: []         
        },
      ], //paneb mõlemad columsid, selleks panebe struktuuri juurde
    isHidden: false,
    userName: "John",
    };
  },
  async created() {
    await this.getTasks();

  },
  methods: {
  
    async getTasks() {
      const getAll = await axios({
        url: `${this.apiURL}api/all-tasks`,
        method: "GET",
      });
      this.columns = getAll.data//getime kogu data mis columsites
      //this.columns.push(resTodo.data[0]);  ------> võtame maha ei pushi enamvaid tagastab kogu columiste data
     // this.columns.push(resDone.data[0]);
    },

  async getTasksByName(event) {
    // eslint-disable-next-line no-console
    //console.log(event) //objet mille sees on property
      const getTasksName = await axios({
        url: `${this.apiURL}api/getTasksByName/` + event.userName, //get tasks By Name
        method: "GET",
      });
      // eslint-disable-next-line no-console
      //console.log("GetTasksByName" + getTasksName)
      this.isHidden = true;
      this.columns = getTasksName.data.result; //getime data mis columsites
},


    async moveTask(event, column) {
      if (event.added) {
        if (column.title === "Done") {
          await axios({
            url: `${this.apiURL}api/moveTask/${event.added.element._id}/done`,
            method: "GET",
          });
        }
        else if (column.title === "Todo") {
          await axios({
            url: `${this.apiURL}api/moveTask/${event.added.element._id}/todo`,
            method: "GET",
          });
        }
      }
    },


  },
};
</script>

<style scoped>
.column-double-width {
  min-width: 460px;
  width: 460px;
}

.column-width {
  min-width: 320px;
  width: 320px;
}

.ghost-card {
  opacity: 0.5;
  background: #f7fafc;
  border: 1px solid #4299e1;
}
</style>
