"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import AuthModal from "../components/AuthModal"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "../hooks/useTheme"
import { User, Settings, Crown, Bell, Volume2, LogOut, Sun, Moon } from "lucide-react"

export default function ProfilePage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [highQuality, setHighQuality] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Sidebar onAuthClick={() => setShowAuthModal(true)} />
        <main className="main-content">
          <div className="auth-required">
            <div className="auth-required-content">
              <User className="auth-required-icon" size={48} />
              <h2>Войдите в аккаунт</h2>
              <p>Чтобы просматривать профиль, необходимо войти в систему</p>
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
                <User className="page-icon" size={32} />
                <h1 className="page-title">Профиль</h1>
              </div>
              <p className="page-subtitle">Управление аккаунтом и настройками</p>
            </div>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              title={`Переключить на ${theme === "light" ? "темную" : "светлую"} тему`}
            >
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <div className="profile-grid">
            <div className="profile-card">
              <div className="profile-header">
                <div className="avatar-section">
                  <div className="avatar">
                    <User size={32} />
                  </div>
                </div>
                <div className="profile-info">
                  <h2>{user?.name}</h2>
                  <p>{user?.email}</p>
                  <span className="subscription-badge">
                    {user?.subscription === "premium" ? (
                      <>
                        <Crown size={14} />
                        Premium
                      </>
                    ) : (
                      <>
                        <User size={14} />
                        Free
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <h3>
                <Settings size={20} />
                Настройки
              </h3>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <span className="setting-title">Тема оформления</span>
                    <span className="setting-desc">Текущая тема: {theme === "light" ? "Светлая" : "Темная"}</span>
                  </div>
                  <button
                    className="theme-toggle"
                    onClick={toggleTheme}
                    title={`Переключить на ${theme === "light" ? "темную" : "светлую"} тему`}
                  >
                    {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <Bell size={16} />
                    <div>
                      <span className="setting-title">Уведомления</span>
                      <span className="setting-desc">Получать уведомления о новой музыке</span>
                    </div>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <Volume2 size={16} />
                    <div>
                      <span className="setting-title">Высокое качество</span>
                      <span className="setting-desc">Воспроизводить в высоком качестве</span>
                    </div>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" checked={highQuality} onChange={(e) => setHighQuality(e.target.checked)} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="subscription-card">
              <h3>
                <Crown size={20} />
                Подписка
              </h3>
              {user?.subscription === "free" ? (
                <div className="upgrade-section">
                  <div className="premium-features">
                    <h4>Преимущества Premium</h4>
                    <ul>
                      <li>
                        <Bell size={16} />
                        Без рекламы
                      </li>
                      <li>
                        <Volume2 size={16} />
                        Высокое качество звука
                      </li>
                      <li>
                        <User size={16} />
                        Неограниченные скачивания
                      </li>
                      <li>
                        <Settings size={16} />
                        Офлайн режим
                      </li>
                    </ul>
                  </div>
                  <button className="upgrade-btn">
                    <Crown size={16} />
                    Обновить до Premium
                  </button>
                </div>
              ) : (
                <div className="premium-active">
                  <div className="premium-status">
                    <Crown className="premium-icon" size={24} />
                    <div>
                      <h4>Premium активен</h4>
                      <p>Следующее списание: 15 января 2024</p>
                    </div>
                  </div>
                  <button className="manage-btn">Управление подпиской</button>
                </div>
              )}
              <div className="profile-actions">
                <button className="logout-profile-btn" onClick={logout}>
                  <LogOut size={16} />
                  Выйти из аккаунта
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
