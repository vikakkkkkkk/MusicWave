"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import AuthModal from "../components/AuthModal"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="app">
      <Sidebar onAuthClick={() => setShowAuthModal(true)} />

      <main className="main-content">
        <div className="content-wrapper">
          <div className="page-header">
            <div className="page-title-section">
              <div className="page-title-with-icon">
                <Search className="page-icon" size={32} />
                <h1 className="page-title">Поиск</h1>
              </div>
              <p className="page-subtitle">Найдите любимую музыку</p>
            </div>
          </div>

          <div className="search-container">
            <div className="search-form">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Поиск треков, исполнителей, альбомов..."
                  className="search-input"
                />
              </div>
            </div>
          </div>

          {!searchQuery && (
            <div className="search-suggestions">
              <h3>Популярные запросы</h3>
              <div className="suggestion-tags">
                {["Pop", "Rock", "Hip-Hop", "Electronic", "Jazz", "Classical"].map((genre) => (
                  <button key={genre} className="suggestion-tag" onClick={() => setSearchQuery(genre)}>
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  )
}
