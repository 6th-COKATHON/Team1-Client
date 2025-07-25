export interface Nag {
  id: number
  text: string
  name: string
  imageUrl: string
  faceImageUrl: string
  likes: number
  dislikes: number
  reports: number
  createdDate: string
}

export interface NagResponse {
  status: string
  timestamp: string
  data: Nag[]
}
