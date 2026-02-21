export default function PathChoiceScreen({ onSelectSchool, onSelectStudy }) {
  return (
    <div className="login-screen">
      <div className="login-card path-choice-card">
        <img src="/graduation-cap-icon.svg" alt="" className="login-logo" aria-hidden />
        <h1>EduLite</h1>
        <p className="login-subtitle">EduLite is not just offline-first. It is literacy-first, language-first, and bandwidth-first.</p>
        <p className="path-choice-prompt">How would you like to use EduLite?</p>
        <div className="path-choice-buttons">
          <button type="button" className="path-choice-btn" onClick={onSelectSchool}>
            <span className="path-choice-label">I'm from a school</span>
            <span className="path-choice-desc">Student or teacher — sign in with your school account</span>
          </button>
          <button type="button" className="path-choice-btn" onClick={onSelectStudy}>
            <span className="path-choice-label">I want to learn on my own</span>
            <span className="path-choice-desc">Self-paced learning — no school account needed</span>
          </button>
        </div>
      </div>
    </div>
  )
}
