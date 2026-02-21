export default function TeacherDashboard({ user, onLogout }) {
  return (
    <div className="teacher-dashboard">
      <h1>Teacher dashboard</h1>
      <p className="teacher-dashboard-sub">Welcome, {user?.name ?? 'Teacher'}.</p>
      <p className="teacher-dashboard-placeholder">
        Here you will be able to create assignments, set sync-by dates, and view student submissions. This screen is a placeholder until the backend is connected.
      </p>
      <button type="button" className="profile-btn full outline" onClick={onLogout}>
        Log out
      </button>
    </div>
  )
}
