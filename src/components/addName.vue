
<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="row">
      <div class="col">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <input
          v-model="form.userName"
          type="text"
          userName="userName"
          class="mt-1 block w-full border-gray p-1"
        />
      </div>
    </div>

    <div class="row mt-5">
      <div class="col text-right">
        <button class="bg-green-400 px-4 py-2 rounded" @click="addName">
          Add name
        </button>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from "axios";

export default {
  data() {
    return {
      form: {
        userName: "John",
      },
    };
  },

  methods: {
    async addName() {
      // let name = this.form.userName;
      // await axios({
      //   // url: "https://todoapp8888.herokuapp.com/api/createTask",
      //   url: `api/getTasksByName/${name}`,
      //   method: "GET",
      //   data: this.form,
      // });

      this.$emit("name-added", {
        userName: this.form.userName,
      });
      //Tuleb app.vuest, emit saadab sündmuse 'task-added' parent componendile
      // this.form = {
      //   userName: "",
      // };
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