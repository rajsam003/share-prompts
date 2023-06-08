"use client"

import { useState, useEffect } from "react"

import PromptCard from "./PromptCard"
import { IPrompt } from "@/models/prompt"

interface PromptCardListProps {
  data: IPrompt[]
  handleTagClick: (tagName: string) => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState<IPrompt[]>([])

  // Search states
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
    null
  )
  const [searchedResults, setSearchedResults] = useState<IPrompt[]>([])

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt")
    const data: IPrompt[] = await response.json()

    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterPrompts = (searchtext: string) => {
    const regex = new RegExp(searchtext, "i") // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    )
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    setSearchText(e.target.value)

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName)

    const searchResult = filterPrompts(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed
