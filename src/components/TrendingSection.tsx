"use client"

import { TrendingUp } from "lucide-react"
import type { Track } from "../types/music"

interface TrendingSectionProps {
  tracks: Track[]
  onPlayTrack: (track: Track) => void
}

export default function TrendingSection({ tracks, onPlayTrack }: TrendingSectionProps) {
  return (
    <section className="content-section">
      <div className="section-header">
        <h2 className="section-title">
          <TrendingUp className="section-icon" size={24} />
          Популярное сейчас
        </h2>
        <p className="section-subtitle">Самые прослушиваемые треки этой недели</p>
      </div>

      <div className="track-list">
        {tracks.map((track, index) => (
          <div key={track.id} className="track-row" onClick={() => onPlayTrack(track)}>
            <div className="track-index">{index + 1}</div>
            <div className="track-info">
              <div className="track-cover">
                <img src={track.coverUrl || "/placeholder.svg"} alt={track.title} />
              </div>
              <div className="track-details">
                <div className="track-title">{track.title}</div>
                <div className="track-artist">{track.artist}</div>
              </div>
            </div>
            <div className="track-album">{track.album}</div>
            <div className="track-duration">{track.duration}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
