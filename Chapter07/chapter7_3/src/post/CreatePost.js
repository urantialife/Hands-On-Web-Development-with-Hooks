import React, { useState, useContext, useEffect } from 'react'
import { useNavigation } from 'react-navi'
import { useResource } from 'react-request-hook'
import { StateContext } from '../contexts'

export default function CreatePost () {
  const { state, dispatch } = useContext(StateContext)
  const { user } = state

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')

  const [ post, createPost ] = useResource(({ title, content, author }) => ({
    url: '/posts',
    method: 'post',
    data: { title, content, author }
  }))

  const navigation = useNavigation()

  useEffect(() => {
    if (post && post.data) {
      navigation.navigate(`/view/${post.data.id}`)
    }
  }, [post])

  function handleTitle (evt) {
    setTitle(evt.target.value)
  }

  function handleContent (evt) {
    setContent(evt.target.value)
  }

  function handleCreate () {
    createPost({ title, content, author: user })
    dispatch({ type: 'CREATE_POST', title, content, author: user })
  }

  return (
    <div>
      <div>Author: <b>{user}</b></div>
      <div>Title: <input type="text" value={title} onChange={handleTitle} /></div>
      <textarea value={content} onChange={handleContent} />
      <input type="submit" value="Create" onClick={handleCreate} />
    </div>
  )
}
