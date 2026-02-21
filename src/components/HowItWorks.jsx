import { useEffect } from 'react'

export default function HowItWorks({ onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div className="how-it-works-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="how-it-works-title">
      <div className="how-it-works-modal" onClick={(e) => e.stopPropagation()}>
        <div className="how-it-works-header">
          <h2 id="how-it-works-title">How it works</h2>
          <button type="button" className="how-it-works-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="how-it-works-body">
          <p className="how-it-works-tagline">
            EduLite is not just offline-first. It is literacy-first, language-first, and bandwidth-first.
          </p>
          <ul className="how-it-works-list">
            <li>
              <strong>You open the app</strong> — It works as a PWA and offline. No install required; add to home screen for the best experience.
            </li>
            <li>
              <strong>We check your connection</strong> — You see only content modes that work for your network (2G / 3G / 4G). Adaptive content keeps learning possible on slow links.
            </li>
            <li>
              <strong>You learn</strong> — Content (text, images, audio, video by tier) plus quizzes: practice questions, then assessment. Progress is saved on your device.
            </li>
            <li>
              <strong>Progress stays on your device</strong> — Stored offline. Nothing is lost if you disconnect.
            </li>
            <li>
              <strong>When you have connection</strong> — Use “Sync now” to send progress to the server. In School mode, sync by the deadline; you can work offline for days and sync before the date.
            </li>
          </ul>
          <p className="how-it-works-footer">
            Study mode = learn at your pace. School mode = assigned courses, sync-by dates, and tier limits.
          </p>
        </div>
      </div>
    </div>
  )
}
