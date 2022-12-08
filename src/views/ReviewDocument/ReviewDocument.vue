<template>
  <div class="review">
    <div class="review-card">
      <h1 class="review-card__title">{{ allData.document_name }}</h1>
      <div
        class="review-card__item"
        v-for="(field, index) in allData.fields"
        :key="index"
      >
        <label :for="`${field.id}`">{{ field.field_name }}</label>

        <input v-if="field.field_type == 1" type="text" :id="`${field.id}`" />
        <select v-else-if="field.field_type == 2" :id="`${field.id}`">
          <option
            v-for="(value, index) in field.select_values"
            :key="index"
            :value="value.value"
          >
            {{ value.title }}
          </option>
        </select>
      </div>

      <div class="review-card__footer">
        <button @click="$router.go(-1)">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    allData() {
      return this.$store.getters.getDocumentById;
    },
  },
  mounted() {
    this.$store.dispatch("getDocumentById", this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import "./ReviewDocument.style.style.scss";
</style>
