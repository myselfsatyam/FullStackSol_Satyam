import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog } from '../store/blogSlice'
import { setNotification } from '../store/notificationSlice'
import blogService from '../services/blogs'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      })
      dispatch(appendBlog(newBlog))
      dispatch(setNotification({ message: `a new blog ${title} by ${author} added`, type: 'success' }))
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      dispatch(setNotification({ message: 'Error creating blog', type: 'error' }))
    }
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">create</button>
      </form>
    </div>
  )
}

export default BlogForm 