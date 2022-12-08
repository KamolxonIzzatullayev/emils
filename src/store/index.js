import { createStore } from 'vuex'
import Axios from 'axios'
import router from '../router'
export default createStore({
  state: {
    documents: [],
    documentById: {}
  },
  getters: {
    getDocuments(state) { return state.documents },
    getDocumentById(state) { return state.documentById },
  },
  mutations: {
    SET_DOCUMENTS(state, data) {
      state.documents = data;
    },
    SET_DOCUMENT_BY_ID(state, data) {
      state.documentById = data;
    },
  },
  actions: {
    async getDocuments({ commit }) {
      const headers = {
        'API-KEY': 'secret-api-key'
      };
      await Axios.get('http://23.100.5.244:8083/api/v1/documents', { headers })
        .then(response => commit('SET_DOCUMENTS', response.data))
        .catch(error => {
          console.error('There was an error!', error);
        });
    },

    async getDocumentById({ commit }, payload) {
      const headers = {
        'API-KEY': 'secret-api-key'
      };
      await Axios.get(`http://23.100.5.244:8083/api/v1/document/${payload}`, { headers })
        .then(response => commit('SET_DOCUMENT_BY_ID', response.data))
        .catch(error => {
          console.error('There was an error!', error);
        });
    },

    async saveNewDocument(_, payload) {
      const article = payload;
      const headers = {
        "API-KEY": "secret-api-key",
      };
      await Axios.post(
        "http://23.100.5.244:8083/api/v1/documents/create",
        article,
        { headers }
      )
        .then(() => {
          alert("Successfully created!!!");
          router.go(-1);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  },


  modules: {
  }
})
