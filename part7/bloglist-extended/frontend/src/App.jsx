import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { setBlogs } from './store/blogSlice'
import { setUser, clearUser } from './store/userSlice'
import { setNotification } from './store/notificationSlice'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import BlogView from './components/BlogView'
import Users from './components/Users'
import User from './components/User'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await blogService.getAll()
        dispatch(setBlogs(fetchedBlogs))
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }
    fetchBlogs()
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (!user) {
    return (
      <div className="container">
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Notification />
      <Navigation />
      
      <Routes>
        <Route path="/" element={
          <div>
            <BlogForm />
            <h2>Blogs</h2>
            {sortedBlogs.length > 0 ? (
              <div className="blog-list">
                {sortedBlogs.map(blog => (
                  <Blog key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <p>No blogs yet.</p>
            )}
          </div>
        } />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </div>
  )
}

export default App 