"use client"

import Form from "@/components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

export interface PostProps {
  prompt: string
  tag: string
}

const CreatePrompt = () => {
  const router = useRouter()
  const { data: session } = useSession()
  //@ts-ignore
  const userID = session?.user?.id

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState<PostProps>({
    prompt: "",
    tag: "",
  })

  const createPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: userID,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push("/")
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleSetPost = (post: PostProps) => {
    setPost(post)
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={handleSetPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  )
}

export default CreatePrompt
