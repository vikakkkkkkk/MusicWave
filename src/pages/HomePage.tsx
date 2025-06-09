"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import TrendingSection from "../components/TrendingSection"
import PlaylistSection from "../components/PlaylistSection"
import AuthModal from "../components/AuthModal"
import { useAuth } from "../hooks/useAuth"
import type { Track } from "../types/music"

const mockTrendingTracks: Track[] = [
  {
    id: "1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    duration: "3:20",
    coverUrl: "https://via.placeholder.com/300x300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Pop",
  },
  {
    id: "2",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    album: "Fine Line",
    duration: "2:54",
    coverUrl: "https://via.placeholder.com/300x300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Pop",
  },
  {
    id: "3",
    title: "Good 4 U",
    artist: "Olivia Rodrigo",
    album: "SOUR",
    duration: "2:58",
    coverUrl: "https://via.placeholder.com/300x300",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    genre: "Pop Rock",
  },
]

export default function HomePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated } = useAuth()

  const handlePlayTrack = (track: Track) => {
    console.log("Playing track:", track.title)
  }

  return (
    <div className="app">
      <Sidebar onAuthClick={() => setShowAuthModal(true)} />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Погрузитесь в мир музыки с MusicWave</h1>
              <p className="hero-subtitle">
                Откройте для себя миллионы треков, создавайте плейлисты и наслаждайтесь музыкой в высоком качестве
              </p>
              {!isAuthenticated && (
                <button className="hero-cta" onClick={() => setShowAuthModal(true)}>
                  Начать путешествие
                </button>
              )}
            </div>
            <div className="hero-visual">
              <div className="floating-note">
                <svg width="120" height="120" viewBox="0 0 24 24" fill="none" className="music-note-icon">
                  <path
                    d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"
                    fill="currentColor"
                  />
                </svg>
                <div className="music-waves">
                  <div className="wave wave-1"></div>
                  <div className="wave wave-2"></div>
                  <div className="wave wave-3"></div>
                  <div className="wave wave-4"></div>
                  <div className="wave wave-5"></div>
                </div>
              </div>
            </div>
          </div>

          <TrendingSection tracks={mockTrendingTracks} onPlayTrack={handlePlayTrack} />
          <PlaylistSection />
        </div>
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}
