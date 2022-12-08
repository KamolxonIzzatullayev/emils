<template>
  <div class="home">
    <div class="home-view">
      <div class="home-view__header">
        <button @click="newDocument">New document form</button>
      </div>
      <div class="home-view__table">
        <table cellspacing="0">
          <tr>
            <th>ID</th>
            <th>document title</th>
            <th>created date</th>
            <th>document size</th>
            <th></th>
          </tr>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{ item.id }}</td>
            <td>{{ item.document_name }}</td>
            <td>{{ item.created_at.slice(0, 10) }}</td>
            <td>{{ item.field_count }}</td>
            <td><router-link :to="`/review/${item.id}`">Document preview</router-link></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",

  computed: {
    tableData() {
      return this.$store.getters.getDocuments;
    },
  },

  methods: {
    newDocument() {
      this.$router.push("/create");
    },
  },

  mounted() {
    this.$store.dispatch("getDocuments");
  },
};
</script>

<style lang="scss" scoped>
@import "./HomeView.style.scss";
</style>
