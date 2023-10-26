"use client"
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Update() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const router = useRouter()
  const params = useParams()
  const id = params.id
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL+'/topics/'+id)
      .then(resp=> resp.json())
      .then(result => {
        setTitle(result.title)
        setBody(result.body)
      })
  },[id])
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        const title = e.target.title.value
        const body = e.target.body.value
        const options = {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, body })
        }
        fetch(process.env.NEXT_PUBLIC_API_URL+`/topics/`+id, options)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            const lastid = data.id
            router.refresh()
            router.push(`/read/${lastid}`)
          })
      }}>
        <p>
          <input
            type="text" name="title" placeholder="title" defaultValue={title}
            onChange={e => setTitle(e.target.value)}
          />
        </p>
        <p>
          <textarea
            name="body" placeholder="body" defaultValue={body}
            onChange={e=> setBody(e.target.value)}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update" />
        </p>
      </form>
    </>
  )
}