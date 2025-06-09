import { Play, Music } from "lucide-react"

export default function PlaylistSection() {
  const playlists = [
    {
      id: "1",
      name: "Хиты 2024",
      cover: "https://via.placeholder.com/200x200",
      trackCount: 50,
      description: "Лучшие треки этого года",
    },
    {
      id: "2",
      name: "Релакс",
      cover: "https://via.placeholder.com/200x200",
      trackCount: 30,
      description: "Музыка для отдыха",
    },
    {
      id: "3",
      name: "Тренировка",
      cover: "https://via.placeholder.com/200x200",
      trackCount: 40,
      description: "Энергичная музыка для спорта",
    },
  ]

  return (
    <section className="content-section">
      <div className="section-header">
        <h2 className="section-title">
          <Music className="section-icon" size={24} />
          Плейлисты для вас
        </h2>
        <p className="section-subtitle">Подборки на любой вкус и настроение</p>
      </div>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-card">
            <div className="playlist-cover-container">
              <img src={playlist.cover || "/placeholder.svg"} alt={playlist.name} className="playlist-cover" />
              <div className="playlist-overlay">
                <button className="play-overlay-btn">
                  <Play size={20} />
                </button>
              </div>
            </div>
            <div className="playlist-info">
              <h3 className="playlist-name">{playlist.name}</h3>
              <p className="playlist-description">{playlist.description}</p>
              <span className="playlist-count">{playlist.trackCount} треков</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
