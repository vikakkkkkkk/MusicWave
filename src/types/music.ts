export interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  coverUrl: string
  audioUrl: string
  genre: string
}

export interface Playlist {
  id: string
  name: string
  description?: string
  coverUrl: string
  tracks: Track[]
  createdAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  subscription: "free" | "premium"
}
