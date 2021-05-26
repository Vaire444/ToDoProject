
<template>
  <div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white">
    <div class="row">
      <div class="col">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Name</label
        >
        <select v-model="form.userName" class="form-control">
          <option disabled selected value="">Please select value</option>
          <option
            v-for="existingUserName in existingUserNames"
            :value="existingUserName"
            :key="existingUserName"
          >
            {{ existingUserName }}
          </option>
        </select>
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
        <button
          class="bg-green-400 px-4 py-2 rounded"
          @click="
            addName();
            $store.commit('setName', form.userName);
          "
        >
          Add name
        </button>
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
        userName: "",
      },
      existingUserNames: [],
    };
  },

  computed: mapState({
    name: (state) => state.name,
    nameAlias: "name",
  }),
  beforeMount() {
    this.getAllDistinctUsers();
    this.$store.state.name;
  },

  methods: {
    async getAllDistinctUsers() {
      const getAll = await axios({
        url: `${this.apiURL}api/distinctUsers`,
        method: "GET",
      });
      this.existingUserNames = getAll.data;
    },
    async addName() {
      this.$emit("name-added", {
        userName: this.form.userName,
      });
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