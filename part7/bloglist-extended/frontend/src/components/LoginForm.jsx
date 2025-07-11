import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../store/userSlice'
import { setNotification } from '../store/notificationSlice'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(setNotification({ message: 'Login successful!', type: 'success' }))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ message: 'Wrong credentials', type: 'error' }))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">login</button>
      </form>
    </div>
  )
}

export default LoginForm 