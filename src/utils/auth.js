import { log } from './debug'

const STORAGE_KEY = 'edulite_user'

function ensureId(data) {
  if (!data.id) {
    data.id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}

/**
 * Get stored user from localStorage. Returns null if not set or invalid.
 * Supports study (name) and school (path, role, grNo/teacherId) users.
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || !data.loggedIn) return null
    const hasIdentity = data.name || data.grNo || data.teacherId
    if (!hasIdentity) return null
    if (!data.path) data.path = 'study'
    if (!data.role) data.role = data.path === 'school' ? 'student' : 'learner'
    ensureId(data)
    return data
  } catch {
    return null
  }
}

/**
 * Save user locally and mark as logged in.
 * @param {{ name?: string, studentId?: string, path?: string, role?: string, grNo?: string, teacherId?: string, id?: string }} user
 */
export function login(user) {
  const data = { ...user, loggedIn: true }
  if (!data.path) data.path = 'study'
  if (!data.role) data.role = data.path === 'school' ? (data.teacherId ? 'teacher' : 'student') : 'learner'
  if (!data.id) {
    data.id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  log('auth: login', { path: data.path, role: data.role, id: data.id })
}

const SESSION_PATH_KEY = 'edulite_path'
const SESSION_SCHOOL_ROLE_KEY = 'edulite_school_role'

export function clearPathAndRole() {
  try {
    sessionStorage.removeItem(SESSION_PATH_KEY)
    sessionStorage.removeItem(SESSION_SCHOOL_ROLE_KEY)
  } catch {}
}

/**
 * Clear stored user (logout). Also clears path/role from session so next user gets a clean flow.
 */
export function logout() {
  localStorage.removeItem(STORAGE_KEY)
  clearPathAndRole()
  log('auth: logout')
}
