import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input } from '../input/input'
import style from './search.module.css'

export function SearchBar(): React.ReactElement {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (searchQuery.trim() == '') {
      alert('Please enter a search query')
      return
    } 
    navigate(`/results?query=${encodeURIComponent(searchQuery)}`)
    setSearchQuery('')
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search"
        id="search-input"
        name="search"
        className={style.input}
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />

      <button type="submit" className={style.button}>Search</button>
      
    </form>
  )
}