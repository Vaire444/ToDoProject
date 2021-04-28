<template>
  <div
    class="bg-white shadow rounded px-3 pt-3 pb-5 border-2"
    :class="'border-' + task.color.toLowerCase() + '-400'"
  >
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ task.title }}
      </p>
      <button class="bg-red-400 px-1 rounded" id="delete" @click="deleteTodo">
        Delete
      </button>
    </div>
    <div class="flex mt-4 justify-between items-center">
      <span class="text-sm text-gray-600">{{
        $moment(task.date).format("DD.MM.YYYY")
      }}</span>

      <badge v-if="task.priority" :color="badgeColor"
        ><span>{{
          task.priority.charAt(0).toUpperCase() +
          task.priority.toLowerCase().slice(1)
        }}</span></badge
      >
    </div>
  </div>
</template>
<script>
import Badge from "./Badge.vue";
import axios from "axios";

export default {
  data() {
    return {
      apiURL: process.env.VUE_APP_BACKEND_URL,
    };
  },

  components: {
    Badge,
  },
  props: {
    task: {
      priority: Object,
      default: () => ({}),
    },
  },
  computed: {
    badgeColor() {
      const mappings = {
        HIGH: "red",
        MEDIUM: "yellow",
        LOW: "green",
        default: "teal",
      };
      return mappings[this.task.priority] || mappings.default;
    },
  },

methods: {
    async deleteTodo() {
      let newName = this.$store.state.name
      //let test6 = this.task._id
      await axios({
        url: `${this.apiURL}api/deleteTask`,
        method: "DELETE",
        data: this.task,
      });
      // eslint-disable-next-line no-console
        //console.log("olen test6 " + test6),
      this.$emit('task-deleted', {userName: newName});
  },
},

  // async moveTask(event, column) {
  //   if (event.delete) {
  //     if (column.title === "Done") {
  //       await axios({
  //         url: `/api/DeleteTask/${event.delete.element._id}/done`,
  //         method: "DELETE",
  //       });
  //     } else if (column.title === "Todo") {
  //       await axios({
  //         url: `/api/moveTask/${event.added.element._id}/todo`,
  //         method: "GET",
  //       });
  //     }
  //   }
  // },
};
</script>

