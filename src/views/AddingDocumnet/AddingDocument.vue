<template>
  <div class="create">
    <div class="create-card">
      <button class="back" @click="$router.go(-1)">&lt; Go Back</button>
      <div class="create-card__header">
        <label for="doc-title">Document title</label>
        <input type="text" id="doc-title" v-model="documentTitle" />
      </div>
      <div class="create-card__body">
        <div
          class="create-card__body-item"
          v-for="(item, index) in createData"
          :key="index"
        >
          <label :for="`seq${index}`">Field sequence (weight)</label>
          <input :id="`seq${index}`" v-model="item.field_seq" type="text" />

          <label :for="`type${index}`">Field type</label>
          <select :id="`type${index}`" v-model="item.field_type">
            <option value="1">Input</option>
            <option value="2">Select</option>
            <option value="3">NumberInput</option>
          </select>

          <table v-if="item.field_type == 2">
            <tr v-show="item.select_values.length">
              <th>Id</th>
              <th></th>
              <th>Title</th>
              <th>Value</th>
              <th></th>
            </tr>
            <tr v-for="(prod, i) in item.select_values" :key="i">
              <td>{{ i + 1 }}</td>
              <td></td>
              <td><input v-model="prod.title" type="text" /></td>
              <td><input v-model="prod.value" type="text" /></td>
              <td>
                <button class="remove" @click="removeValue(index, i)">
                  Remove
                </button>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td colspan="2">
                <button @click="addOption(index)">Add option</button>
              </td>
            </tr>
          </table>

          <label :for="`name${index}`">Field name</label>
          <input :id="`name${index}`" v-model="item.field_name" type="text" />

          <div class="mandatory">
            <input
              :id="`mandat${index}`"
              v-model="item.is_mandatory"
              type="checkbox"
            />
            <label :for="`mandat${index}`">Mandatory</label>
          </div>

          <div class="remove" v-if="createData > 2 || index > 0">
            <button @click="remove(index)">Remove</button>
          </div>
        </div>
      </div>
      <p v-if="errorIsVisible">{{ errorText }}</p>
      <div class="create-card__footer">
        <button @click="addCard">Add more</button>
        <button @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "AddingDocument",
  data() {
    return {
      createData: [],
      documentTitle: "",
      errorIsVisible: false,
      errorText: "",
    };
  },

  methods: {
    addCard() {
      this.createData.push({
        field_type: 1,
        field_seq: 1,
        is_mandatory: true,
        field_name: "Name",
        select_values: [
          {
            value: undefined,
            title: undefined,
          },
        ],
      });
    },
    remove(ind) {
      this.createData.splice(ind, 1);
    },
    removeValue(ind, i) {
      this.createData[ind].select_values.splice(i, 1);
    },
    addOption(ind) {
      this.createData[ind].select_values.push({
        value: undefined,
        title: undefined,
      });
    },
    save() {
      let result = {
        document_name: this.documentTitle,
      };
      if (this.documentTitle) {
        this.errorIsVisible = false;

        this.createData.forEach((element, index) => {
          if (!element.field_seq) {
            this.errorIsVisible = true;
            this.errorText = "Please, fill the 'field_seq' blank";
            let a = "seq" + index;
            document.getElementById(a).scrollIntoView();
            return;
          } else {
            this.errorIsVisible = false;
            if (!element.field_name) {
              this.errorIsVisible = true;
              this.errorText = "Please, fill the 'field_name' blank";
              let b = "name" + index;
              document.getElementById(b).scrollIntoView();
              return;
            } else {
              this.errorIsVisible = false;

              if (element.field_type == 2) {
                let check = element.select_values.every(
                  (element) => element.value && element.title
                );

                if (check) {
                  this.errorIsVisible = false;
                  if (!result.form_values) {
                    result.form_values = [];
                  }
                  let newElement = element;
                  newElement.is_mandatory = element.is_mandatory ? 1 : 0;
                  result.form_values.push(newElement);
                } else {
                  this.errorIsVisible = true;
                  this.errorText = "Please, fill title or value of option!!!";
                  return;
                }
              } else {
                if (!result.form_values) {
                  result.form_values = [];
                }
                let newElement = {
                  field_seq: element.field_seq,
                  is_mandatory: element.is_mandatory ? 1 : 0,
                  field_type: element.field_type,
                  field_name: element.field_name,
                };
                result.form_values.push(newElement);
              }
            }
          }
        });
      } else {
        this.errorIsVisible = true;
        this.errorText = "Please, write document title!!!";
      }

      if (!this.errorIsVisible) {
        this.$store.dispatch("saveNewDocument", result);
      }
    },
  },

  mounted() {
    this.addCard();
  },
};
</script>

<style lang="scss" scoped>
@import "./AddingDocument.style.scss";
</style>
