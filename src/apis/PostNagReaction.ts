import { axiosApi } from './axios'

export const postLike = (id: number) => axiosApi.post(`/nags/${id}/like`)
export const postDislike = (id: number) => axiosApi.post(`/nags/${id}/dislike`)
