import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import jwtService from './jwt.storage'
import { API_URL, TIME_OUT } from '@/common/config'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = API_URL
Vue.axios.defaults.timeout = TIME_OUT

/*
 Adapted from gothinkers/vue-realworld-example-app repository
 Source: https://github.com/gothinkster/vue-realworld-example-app/blob/master/src/common/api.service.js
 Structure and some general methods are approximately the same as in the "real world" example.
 */
export const API_SERVICE = {

  setHeader() {
    Vue.axios.defaults.headers.common['Authorization'] = `Bearer ${jwtService.getToken()}`
  },
  delete(path, slug = '') {
    return axios.delete(`${path}/${slug}`).catch(err => {
      throw err
    })
  },
  get(path, slug = '') {
    return axios.get(`${path}/${slug}`).then(res => res).catch(err => {
      throw err
    })
  },
  post(path, params) {
    return axios.post(`${path}`, params).then(res => res).catch(err => {
      throw err
    })
  },
  put(path, slug = '', params) {
    return axios.put(`${path}/${slug}`, params).then(res => res).catch(err => {
      throw err
    })
  },
  patch(path, slug = '') {
    return axios.patch(`${path}/${slug}`).then(res => res).catch(err => {
      throw err
    })
  }
}

export const TOURNAMENT_SERVICE = {
  path: 'tournament',
  delete(slug) {
    return API_SERVICE.delete(this.path, slug)
  },
  get(slug) {
    return API_SERVICE.get(this.path, slug)
  },
  post(params) {
    return API_SERVICE.post(this.path, params)
  },
  put(params) {
    return API_SERVICE.put(this.path, params)
  }

}

export const PLAYER_SERVICE = {
  path: 'player',
  get(slug) {
    return API_SERVICE.get(this.path, slug)
  },
  patch(slug) {
    return API_SERVICE.patch(this.path, slug)
  },
  put(slug, payload) {
    return API_SERVICE.put(this.path, slug, payload)
  }
}
