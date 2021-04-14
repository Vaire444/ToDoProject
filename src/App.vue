<template>
  <div id="app">
    <div class="flex justify-center">
      <div class="min-h-screen flex overflow-x-scroll py-12">
        <div class="bg-gray-100 rounded-lg px-3 py-3 column-double-width rounded mr-4">
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">Add new todo</p>
          <new-task class="my-3" @task-added="getTasks"/>
        </div>
      </div>

      <div class="min-h-screen flex overflow-x-scroll py-12">
        <div
          v-for="column in columns"
          :key="column.title"
          class="bg-gray-100 rounded-lg px-3 py-3 column-width rounded mr-4"
        >
          <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{column.title}}</p>
          <!-- Draggable component comes from vuedraggable. It provides drag & drop functionality -->
          <draggable
            :list="column.tasks"
            :animation="200"
            :style="{height: !column.tasks.length ? '300px' : ''}"
            ghost-class="ghost-card"
            group="tasks"
            @change="moveTask($event, column)"
          >
            <!-- Each element from here will be draggable and animated. Note :key is very important here to be unique both for draggable and animations to be smooth & consistent. -->
            <task-card
              v-for="(task) in column.tasks"
              :key="task.id"
              :task="task"
              class="mt-3 cursor-move"
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
import axios from 'axios';

export default {
  name: "App",
  components: {
    TaskCard,
    draggable,
    NewTask
  },
  data() {
    return {
      columns: [
      ]
    };
  },
  async created () {
    await this.getTasks()
  },
  methods: {
    async getTasks () {
      const resTodo = await axios({
        url: 'api/todo-tasks',
        method: 'GET'
      })

      const resDone = await axios({
        url: 'api/done-tasks',
        method: 'GET'
      })

      this.columns.push(resTodo.data[0])
      this.columns.push(resDone.data[0])
    },
    async moveTask (event, column) {
      if (event.added) {
        if (column.title === 'Done') {
          await axios({
            url: `api/moveTask/${event.added.element._id}/done`,
            method: 'GET'
          })
        }
      }
    }
  }
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
