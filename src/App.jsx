import { useState, useCallback } from 'react'
import { registerSW } from 'virtual:pwa-register'
import { getStoredUser, logout as doLogout } from './utils/auth'
import { getDefaultTier, setDefaultTier as saveDefaultTier, clearDefaultTier } from './utils/prefs'
import Login from './components/Login'
import Navbar from './components/Navbar'
import ContentModeScreen from './components/ContentModeScreen'
import PacketList from './components/PacketList'
import PacketView from './components/PacketView'
import Profile from './components/Profile'
import HowItWorks from './components/HowItWorks'
import './App.css'

registerSW({ immediate: true })

export default function App() {
  const [user, setUser] = useState(getStoredUser)
  const [defaultContentTier, setDefaultContentTier] = useState(getDefaultTier)
  const [openPacketId, setOpenPacketId] = useState(null)
  const [openAssignment, setOpenAssignment] = useState(null)
  const [mode, setMode] = useState('study')
  const [showProfile, setShowProfile] = useState(false)
  const [showHowItWorks, setShowHowItWorks] = useState(false)

  const handleLogin = useCallback(() => setUser(getStoredUser()), [])

  const handleLogout = useCallback(() => {
    doLogout()
    clearDefaultTier()
    setUser(null)
    setDefaultContentTier(null)
    setOpenPacketId(null)
    setOpenAssignment(null)
    setShowProfile(false)
  }, [])

  const handleContentModeSelect = useCallback((tierId) => {
    saveDefaultTier(tierId)
    setDefaultContentTier(tierId)
  }, [])

  const handleChangeContentMode = useCallback(() => {
    clearDefaultTier()
    setDefaultContentTier(null)
    setShowProfile(false)
  }, [])

  const handleOpenPacket = (packetId, assignment) => {
    setOpenPacketId(packetId)
    setOpenAssignment(assignment ?? null)
  }

  const handleBack = () => {
    setOpenPacketId(null)
    setOpenAssignment(null)
  }

  const handleHome = useCallback(() => setShowProfile(false), [])

  if (!user) {
    return (
      <div className="app">
        <Login onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="app">
      {openPacketId ? (
        <PacketView
          packetId={openPacketId}
          assignment={openAssignment}
          defaultTier={defaultContentTier}
          onBack={handleBack}
        />
      ) : (
        <>
          <Navbar
            onHome={handleHome}
            onHowItWorks={() => setShowHowItWorks(true)}
            onProfile={() => setShowProfile(true)}
            onLogout={handleLogout}
            showProfile={showProfile}
          />

          {showProfile ? (
            <Profile
              user={user}
              onUpdateUser={() => setUser(getStoredUser())}
              onChangeContentMode={handleChangeContentMode}
              onLogout={handleLogout}
            />
          ) : defaultContentTier === null ? (
            <>
              <div className="app-header">
                <div className="mode-toggle">
                  <button
                    type="button"
                    className={mode === 'study' ? 'active' : ''}
                    onClick={() => setMode('study')}
                  >
                    Study
                  </button>
                  <button
                    type="button"
                    className={mode === 'school' ? 'active' : ''}
                    onClick={() => setMode('school')}
                  >
                    School
                  </button>
                </div>
              </div>
              <ContentModeScreen onSelect={handleContentModeSelect} />
            </>
          ) : (
            <>
              <div className="app-header">
                <div className="mode-toggle">
                  <button
                    type="button"
                    className={mode === 'study' ? 'active' : ''}
                    onClick={() => setMode('study')}
                  >
                    Study
                  </button>
                  <button
                    type="button"
                    className={mode === 'school' ? 'active' : ''}
                    onClick={() => setMode('school')}
                  >
                    School
                  </button>
                </div>
              </div>
              <PacketList
                mode={mode}
                onOpenPacket={handleOpenPacket}
                onChangeContentMode={handleChangeContentMode}
              />
            </>
          )}

          {showHowItWorks && <HowItWorks onClose={() => setShowHowItWorks(false)} />}
        </>
      )}
    </div>
  )
}
