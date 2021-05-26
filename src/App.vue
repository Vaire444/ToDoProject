<template>
  <div id="app">
    <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <div
          v-if="isHidden"
          class="bg-gray-100 rounded-lg px-3 py-3 column-double-width rounded mr-4"
        >
          <p
            class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
          >
            Add name
          </p>
          <add-name class="my-3" @name-added="getTasksByName($event)" />
        </div>
        <div>
          <div
            v-if="!isHidden"
            class="bg-gray-100 rounded-lg px-3 py-3 column-double-width rounded mr-4"
          >
            <p
              class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
            >
              Add new todo
            </p>
            <new-task class="my-3" @task-added="getTasksByName($event)" />
          </div>
          <div
            v-if="!isHidden"
            class="bg-gray-100 rounded-lg px-3 py-3 column-double-width rounded mr-4"
          >
            <p
              class="text-gray-700 font-semibold font-sans tracking-wide text-sm"
            >
              Download file(s)
            </p>
            <download-file class="my-3" />
          </div>
        </div>
      </div>
      <div v-if="!isHidden" class="min-h-screen flex overflow-x-scroll py-12">
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
import axios from "axios";
import AddName from "./components/addName.vue";
import DownloadFile from "./components/downloadFile.vue";
export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    NewTask,
    AddName,
    DownloadFile,
  },
  data() {
    return {
      apiURL: process.env.VUE_APP_BACKEND_URL,
      columns: [
        {
          title: "Todo",
          task: [],
        },
        {
          title: "Done",
          task: [],
        },
      ], //paneb mõlemad columsid, selleks paneme struktuuri juurde
      isHidden: true,
    };
  },
  async created() {
    await this.getTasks();
  },
  methods: {
    async getTasks() {
      const getAll = await axios({
        url: `${this.apiURL}api/all-tasks`,
        // url: "api/all-tasks", //getin kõik taskid
        // url: "https://todoapp8888.herokuapp.com/api/all-tasks",
        method: "GET",
      });

      this.columns = getAll.data; //getime kogu data mis columsites

      //this.columns.push(resTodo.data[0]);  ------> võtame maha ei pushi enamvaid tagastab kogu columiste data
      // this.columns.push(resDone.data[0]);
    },
    async getTasksByName(event) {
      const getAllByName = await axios({
         `${this.apiURL}api/getTasksByName/` + event.userName,
        // url: "api/getTasksByName/" + event.userName,
        // url: `https://todoapp8888.herokuapp.com/api/getTasksByName/${event.userName}`,
        method: "GET",
      });
      (this.isHidden = false), (this.columns = getAllByName.data.result); //getime kogu data mis columsites
    },

    async moveTask(event, column) {
      if (event.added) {
        if (column.title === "Done") {
          await axios({
            // url: `https://todoapp8888.herokuapp.com/api/moveTask/${event.added.element._id}/done`,
            // url: `api/moveTask/${event.added.element._id}/done`,
            url: `${this.apiURL}api/moveTask/${event.added.element._id}/done`,
            method: "GET",
          });
        } else if (column.title === "Todo") {
          await axios({
            // url: `https://todoapp8888.herokuapp.com/api/moveTask/${event.added.element._id}/todo`,
            // url: `api/moveTask/${event.added.element._id}/todo`,
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
