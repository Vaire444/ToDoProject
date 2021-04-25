<template>
  <div
    class="bg-white shadow rounded px-3 pt-3 pb-5 border-2"
    :class="'border-' + task.color.toLowerCase() + '-400'"
  >
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ task.title }}
      </p>
      <!-- <button class="text-gray-700 px-2 rounded">X</button> -->
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
// import axios from "axios";
import Badge from "./Badge.vue";

export default {
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
  // methods: {
  //   async deleteTask(event, column) {
  //     if (event.delete) {
  //       if (column.title === "Done") {
  //         await axios({
  //           // url: `https://todoapp8888.herokuapp.com/api/moveTask/${event.delete.element._id}/done`,
  //           url: `/api/moveTask/${event.delete.element._id}/done`,
  //           method: "GET",
  //         });
  //       } else if (column.title === "Todo") {
  //         await axios({
  //           // url: `https://todoapp8888.herokuapp.com/api/moveTask/${event.delete.element._id}/todo`,
  //           url: `/api/moveTask/${event.delete.element._id}/todo`,
  //           method: "GET",
  //         });
  //       }
  //     }
  //   },
  // },
};
</script>

