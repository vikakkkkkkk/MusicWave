"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import {
  Home,
  Search,
  Heart,
  Clock,
  Download,
  Music,
  Mic,
  Disc,
  User,
  LogOut,
  ChevronLeft,
  Menu,
  X,
} from "lucide-react"

interface SidebarProps {
  onAuthClick: () => void
}

export default function Sidebar({ onAuthClick }: SidebarProps) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const navItems = [
    { href: "/", label: "Главная", icon: Home },
    { href: "/search", label: "Поиск", icon: Search },
    { href: "/favorites", label: "Избранное", icon: Heart },
    { href: "/history", label: "История", icon: Clock },
    { href: "/downloads", label: "Загрузки", icon: Download },
  ]

  const libraryItems = [
    { href: "/playlists", label: "Плейлисты", icon: Music },
    { href: "/artists", label: "Исполнители", icon: Mic },
    { href: "/albums", label: "Альбомы", icon: Disc },
  ]

  const toggleMobile = () => setIsMobileOpen(!isMobileOpen)

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="mobile-menu-btn" onClick={toggleMobile}>
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} ${isMobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-header">
          <Link to="/" className="logo">
            <Music className="logo-icon" size={28} />
            {!isCollapsed && <span className="logo-text">MusicWave</span>}
          </Link>
          <button
            className={`collapse-btn ${isCollapsed ? "collapsed" : ""}`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`nav-item ${location.pathname === item.href ? "active" : ""}`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <Icon className="nav-icon" size={20} />
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </Link>
              )
            })}
          </div>

          <div className="nav-divider"></div>

          <div className="nav-section">
            {!isCollapsed && <div className="section-title-small">Библиотека</div>}
            {libraryItems.map((item) => {
              const Icon = item.icon
              return (
                <Link key={item.href} to={item.href} className="nav-item" onClick={() => setIsMobileOpen(false)}>
                  <Icon className="nav-icon" size={20} />
                  {!isCollapsed && <span className="nav-label">{item.label}</span>}
                </Link>
              )
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          {isAuthenticated ? (
            <div className="user-section">
              <Link
                to="/profile"
                className={`user-profile ${location.pathname === "/profile" ? "active" : ""}`}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="user-avatar">
                  <User size={20} />
                </div>
                {!isCollapsed && (
                  <div className="user-info">
                    <span className="user-name">{user?.name}</span>
                    <span className="user-plan">{user?.subscription === "premium" ? "Premium" : "Free"}</span>
                  </div>
                )}
              </Link>
              {!isCollapsed && (
                <button className="logout-btn" onClick={logout}>
                  <LogOut size={16} />
                </button>
              )}
            </div>
          ) : (
            <button className="auth-button" onClick={onAuthClick}>
              <User className="auth-icon" size={20} />
              {!isCollapsed && <span>Войти</span>}
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)}></div>}
    </>
  )
}
