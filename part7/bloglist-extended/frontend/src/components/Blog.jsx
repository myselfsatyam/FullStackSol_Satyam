import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateBlog, removeBlog } from '../store/blogSlice'
import { setNotification } from '../store/notificationSlice'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(updateBlog({ id: blog.id, updatedBlog }))
    } catch (exception) {
      dispatch(setNotification({ message: 'Error updating blog', type: 'error' }))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.remove(blog.id)
        dispatch(removeBlog(blog.id))
        dispatch(setNotification({ message: 'Blog deleted successfully', type: 'success' }))
      } catch (exception) {
        dispatch(setNotification({ message: 'Error deleting blog', type: 'error' }))
      }
    }
  }

  const canDelete = user && blog.user && blog.user.id === user.id

  return (
    <div className="blog-item">
      <Link to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
      </Link>
      <p>Author: {blog.author}</p>
      <p>Likes: {blog.likes}</p>
      <button onClick={handleLike} className="btn btn-success">
        like
      </button>
      {canDelete && (
        <button onClick={handleDelete} className="btn btn-danger">
          delete
        </button>
      )}
    </div>
  )
}

export default Blog 