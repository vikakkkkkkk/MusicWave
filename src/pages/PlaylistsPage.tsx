"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import AuthModal from "../components/AuthModal"
import { useAuth } from "../hooks/useAuth"
import { Music, Plus } from "lucide-react"

export default function PlaylistsPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Sidebar onAuthClick={() => setShowAuthModal(true)} />
        <main className="main-content">
          <div className="auth-required">
            <div className="auth-required-content">
              <Music className="auth-required-icon" size={48} />
              <h2>Войдите в аккаунт</h2>
              <p>Чтобы просматривать плейлисты, необходимо войти в систему</p>
              <button className="auth-btn" onClick={() => setShowAuthModal(true)}>
                Войти
              </button>
            </div>
          </div>
        </main>
        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    )
  }

  return (
    <div className="app">
      <Sidebar onAuthClick={() => setShowAuthModal(true)} />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="page-header">
            <div className="page-title-section">
              <div className="page-title-with-icon">
                <Music className="page-icon" size={32} />
                <h1 className="page-title">Плейлисты</h1>
              </div>
              <p className="page-subtitle">Создайте свой первый плейлист</p>
            </div>
            <button className="create-playlist-btn">
              <Plus size={16} />
              Создать плейлист
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-div">
              </div>
            <button>
              Создать плейлист
            </button>
          </div>

          <div className="empty-state">
            <div className="empty-icon">
              <Music size={64} />
            </div>
            <h2>У вас пока нет плейлистов</h2>
            <p>Создайте свой первый плейлист, чтобы сохранять любимые треки</p>
            <button className="empty-action-btn">
              <Plus size={16} />
              Создать плейлист
            </button>
          </div>
        </div>
      </main>
  </div>
  )
}
