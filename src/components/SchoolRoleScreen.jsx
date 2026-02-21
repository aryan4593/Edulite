export default function SchoolRoleScreen({ onSelectStudent, onSelectTeacher, onBack }) {
  return (
    <div className="login-screen">
      <div className="login-card path-choice-card">
        <button type="button" className="back path-choice-back" onClick={onBack} aria-label="Back">
          ← Back
        </button>
        <h1>School</h1>
        <p className="path-choice-prompt">Are you a student or a teacher?</p>
        <div className="path-choice-buttons">
          <button type="button" className="path-choice-btn" onClick={onSelectStudent}>
            <span className="path-choice-label">Student</span>
            <span className="path-choice-desc">Sign in with GR number and password</span>
          </button>
          <button type="button" className="path-choice-btn" onClick={onSelectTeacher}>
            <span className="path-choice-label">Teacher</span>
            <span className="path-choice-desc">Sign in with teacher ID and password</span>
          </button>
        </div>
      </div>
    </div>
  )
}
