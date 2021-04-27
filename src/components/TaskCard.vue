<template>
  <div
    class="bg-white shadow rounded px-3 pt-3 pb-5 border-2"
    :class="'border-' + task.color.toLowerCase() + '-400'"
  >
    <div class="flex justify-between">
      <p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">
        {{ task.title }}
      </p>
      <!-- <button class="bg-red-400 px-1 rounded" id="delete" @click="deleteTodo">
        Delete
      </button> -->
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

  // async deleteTodo(id, index) {

  //   if (confirm("Oled kindel?"))
  //     await axios
  //       .delete("/api/Todo/" + id)
  //       .then((response) => {
  //         this.tasks.splice(index, 1);
  //         console.log(response);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  // },

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

