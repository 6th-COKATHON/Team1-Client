import { axiosApi } from './axios'
import { NagResponse } from '@constants/getNagTypes'

export const getNags = async (
  category: string,
  sort: 'latest' | 'popular',
): Promise<NagResponse> => {
  const res = await axiosApi.get<NagResponse>(`/nags/${category}/${sort}`)
  return res.data
}

export const getNagDetail = async (id: number) => {
  const res = await axiosApi.get(`/nags/${id}/nag`)
  return res.data
}
