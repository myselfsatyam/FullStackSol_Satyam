import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../store/userSlice'
import { setNotification } from '../store/notificationSlice'
import blogService from '../services/blogs'

const Navigation = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(clearUser())
    dispatch(setNotification({ message: 'Logged out successfully', type: 'success' }))
  }

  if (!user) {
    return null
  }

  return (
    <nav className="nav">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <span>
        {user.name} logged in
        <button onClick={handleLogout} className="btn btn-danger" style={{ marginLeft: '1rem' }}>
          logout
        </button>
      </span>
    </nav>
  )
}

export default Navigation 