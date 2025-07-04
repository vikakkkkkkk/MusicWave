"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import AuthModal from "../components/AuthModal"
import { useAuth } from "../hooks/useAuth"
import { Disc } from "lucide-react"

export default function AlbumsPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Sidebar onAuthClick={() => setShowAuthModal(true)} />
        <main className="main-content">
          <div className="auth-required">
            <div className="auth-required-content">
              <Disc className="auth-required-icon" size={48} />
              <h2>Войдите в аккаунт</h2>
              <p>Чтобы просматривать альбомы, необходимо войти в систему</p>
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
                <Disc className="page-icon" size={32} />
                <h1 className="page-title">Альбомы</h1>
              </div>
              <p className="page-subtitle">Коллекция альбомов</p>
            </div>
          </div>

          <div className="empty-state">
            <div className="empty-icon">
              <Disc size={64} />
            </div>
            <h2>Нет сохраненных альбомов</h2>
            <p>Добавьте альбомы в свою коллекцию</p>
          </div>
        </div>
      </main>
    </div>
  )
}
