import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./hooks/useAuth"
import { ThemeProvider } from "./hooks/useTheme"
import HomePage from "./pages/HomePage"
import SearchPage from "./pages/SearchPage"
import FavoritesPage from "./pages/FavoritesPage"
import HistoryPage from "./pages/HistoryPage"
import DownloadsPage from "./pages/DownloadsPage"
import PlaylistsPage from "./pages/PlaylistsPage"
import ArtistsPage from "./pages/ArtistsPage"
import AlbumsPage from "./pages/AlbumsPage"
import ProfilePage from "./pages/ProfilePage"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/playlists" element={<PlaylistsPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/albums" element={<AlbumsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
