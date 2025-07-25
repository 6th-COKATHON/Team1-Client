import { axiosApi } from '@apis/axios'

export interface Nag {
  id: number
  text: string
  name: string
  imageUrl: string
  faceImageUrl: string
  likes: number
  dislikes: number
  reposrts: number
  createdDate: string
}

export interface AllNagsResponse {
  status: string
  timestamp: string
  data: Nag[]
}

export const getAllNags = async (): Promise<Nag[]> => {
  const res = await axiosApi.get<AllNagsResponse>('/nags/all')
  return res.data.data
}
