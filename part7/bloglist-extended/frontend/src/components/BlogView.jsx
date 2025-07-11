import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../store/blogSlice'
import { setNotification } from '../store/notificationSlice'
import blogService from '../services/blogs'

const BlogView = () => {
  const [blog, setBlog] = useState(null)
  const [comment, setComment] = useState('')
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const foundBlog = blogs.find(b => b.id === id)
    if (foundBlog) {
      setBlog(foundBlog)
    }
  }, [id, blogs])

  const handleLike = async () => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })
      dispatch(updateBlog({ id: blog.id, updatedBlog }))
      setBlog(updatedBlog)
    } catch (exception) {
      dispatch(setNotification({ message: 'Error updating blog', type: 'error' }))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const updatedBlog = await blogService.addComment(blog.id, comment)
      dispatch(updateBlog({ id: blog.id, updatedBlog }))
      setBlog(updatedBlog)
      setComment('')
      dispatch(setNotification({ message: 'Comment added successfully', type: 'success' }))
    } catch (exception) {
      dispatch(setNotification({ message: 'Error adding comment', type: 'error' }))
    }
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>URL:</strong> <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a></p>
      <p><strong>Likes:</strong> {blog.likes}</p>
      <button onClick={handleLike} className="btn btn-success">like</button>

      <div className="comment-section">
        <h3>Comments</h3>
        <form onSubmit={handleComment} className="comment-form">
          <div className="form-group">
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              placeholder="Add a comment..."
            />
            <button type="submit" className="btn btn-primary">add comment</button>
          </div>
        </form>
        
        {blog.comments && blog.comments.length > 0 ? (
          <ul className="comment-list">
            {blog.comments.map((comment, index) => (
              <li key={index} className="comment-item">{comment}</li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

export default BlogView 