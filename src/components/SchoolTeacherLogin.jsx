import { useState } from 'react'
import { login } from '../utils/auth'
import { log } from '../utils/debug'

// Mock: replace with real API later.
const MOCK_TEACHER_ID = 'teacher1'
const MOCK_PASSWORD = 'pass'

export default function SchoolTeacherLogin({ onLogin, onBack }) {
  const [teacherId, setTeacherId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    const trimmedId = teacherId.trim()
    if (!trimmedId || !password) {
      setError('Enter teacher ID and password.')
      return
    }
    if (trimmedId !== MOCK_TEACHER_ID || password !== MOCK_PASSWORD) {
      setError('Invalid teacher ID or password.')
      return
    }
    const user = {
      path: 'school',
      role: 'teacher',
      teacherId: trimmedId,
      name: `Teacher ${trimmedId}`,
    }
    login(user)
    log('SchoolTeacherLogin: submitted', { teacherId: trimmedId })
    onLogin()
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <button type="button" className="back path-choice-back" onClick={onBack} aria-label="Back">
          ← Back
        </button>
        <h1>School — Teacher</h1>
        <p className="login-subtitle">Sign in with your teacher ID and password.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="teacher-id">Teacher ID</label>
          <input
            id="teacher-id"
            type="text"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            placeholder="e.g. T001"
            autoComplete="username"
            className="login-input"
          />
          <label htmlFor="teacher-password">Password</label>
          <input
            id="teacher-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="login-input"
          />
          {error && <p className="login-error" role="alert">{error}</p>}
          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
