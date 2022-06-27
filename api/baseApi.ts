import type { NuxtAxiosInstance } from '@nuxtjs/axios'

export class BaseNuxtApi {
  protected axios: NuxtAxiosInstance
  constructor(axios: NuxtAxiosInstance) {
    this.axios = axios as NuxtAxiosInstance
  }
}
