import React, { useState, useEffect } from 'react';
import blogService from '../services/blogs'

const ToggleContent = (props) => {
  const [visible, setVisible] = useState(false);
  const [author, setAuthor] = useState('');
  const [like, setLike] = useState(props.blog && props.blog.likes);

  useEffect(() => {
    if (props.type === 'blog' && props.author && typeof props.author.then === 'function') {
      props.author.then((Author) => {
        setAuthor(Author);
      });
    }
    
  }, [props.author, props.type]);

  if (props.type === 'form') {
    return (
      <div >
        {(visible) ? props.children : (<></>)}
        <br /><br />
        <button onClick={() => setVisible(!visible)} style={{ backgroundColor: 'red' }} >
          {visible ? 'Cancel' : props.label}
        </button>
      </div>
    )
  } else if (props.type === 'blog') {
    const handleLike = () => {
      if (props.user){
        setLike(like + 1)
        props.blog.likes += 1;
        let id = props.blog.id
        let newObject1 = { ...props.blog, author: author.id, likes: like + 1 }
        let newObject2 = { ...props.blog, likes: like + 1 }
        blogService.update(id, newObject1)
        let UpdatedBogs = [...props.SortedBlogs.filter(blog => blog.id !== id), newObject2]
        UpdatedBogs = [...UpdatedBogs].sort((a, b) => b.likes - a.likes)
        props.setSortedBlogs([])
        props.setSortedBlogs(UpdatedBogs)
      }
    }

    return (
      <div className='note' >
        {props.i}{') '}title: <b>{props.blog.title}</b>
        
        &nbsp; 
       
        <button onClick={() => setVisible(!visible)} className='visible' >
          {visible ? 'hide' : props.label}
        </button>

        &nbsp; 

        <button onClick={() => props.handleDelete(props.blog)} >Delete</button>

        {(visible) ?
          <>
            <br />
            url: <a href={props.blog.url}>{props.blog.url}</a>
            <br />
            <p style={{display:'inline',cursor:'pointer',userSelect:'none'}} onClick={handleLike}  >👍</p>: {like}
            <br />
            author: {author}
          </>

          : (<></>)}
        
      </div>
    )
  }
}

export default ToggleContent