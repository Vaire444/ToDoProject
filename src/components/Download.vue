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
          v-model="form.fileType"
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
              <input class="mt-4" for="Done" label="done" type="checkbox" v-model="form.done"/>
              <span class="ml-4 font-medium text-large text-gray-700">Done</span>
              <div></div>
              <input label="todo" for="Todo" type="checkbox" v-model="form.todo" /><span
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
        <button class="bg-green-400 px-4 py-2 rounded" @click="getFile">
          Download
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data () {
    return {
      form: {
        fileType: 'PDF',
        todo: false,
        done: false
      }
    }
  },
  methods: {
    async getFile () {
      await axios({
        url: 'api/downloadFile',
        method: 'POST',
        data: this.form,
        responseType: 'arraybuffer'
      }).then(rs => {
        this.downloadBinaryFile(rs.data, rs.headers, 'Todo')
      })
    },
    downloadFile (content, headers, name) {
      const blob = new Blob([
        content
      ], { type: headers['content-type'] })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = !name ? headers['content-disposition'].split('filename=')[1].replace(/(^")|("$)/g, '') : name + (blob.type === 'application/pdf' ? '.pdf' : '')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    downloadBinaryFile (binaryContent, headers, name) {
      this.downloadFile(new Uint8Array(binaryContent), headers, name)
    }
  }
};
</script>

<style scoped>
  .border-gray {
    border-bottom: 1px solid rgba(55, 65, 81, 0.3);
    border-radius: 0;
  }
</style>