"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

interface AuthModalProps {
  onClose: () => void
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(formData.email, formData.password)
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("Пароли не совпадают")
          return
        }
        await register(formData.name, formData.email, formData.password)
      }
      onClose()
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="auth-header">
          <h2>{isLogin ? "Добро пожаловать!" : "Создать аккаунт"}</h2>
          <p>{isLogin ? "Войдите в свой аккаунт" : "Присоединяйтесь к MusicWave"}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Имя</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Введите ваше имя"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Введите email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Введите пароль"
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Подтвердите пароль</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required={!isLogin}
                placeholder="Повторите пароль"
              />
            </div>
          )}

          <button type="submit" className="auth-submit" disabled={isLoading}>
            {isLoading ? "Загрузка..." : isLogin ? "Войти" : "Зарегистрироваться"}
          </button>
        </form>


        <div className="auth-switch">
          <p>
            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="switch-btn">
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
