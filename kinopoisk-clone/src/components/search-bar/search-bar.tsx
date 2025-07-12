import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { Input } from '../input/input'
import { useAppSelector } from '../../redux/store'
import { locales } from '../../config/locales'
import style from './search.module.css'

export function SearchBar(): React.ReactElement {

  const navigate = useNavigate()
  const lang = useAppSelector(state => state.lang.lang)
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
        placeholder={locales[lang].searchBar.inputSearch}
        id="search-input"
        name="search"
        className={style.input}
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />

      <button type="submit" className={style.button}>{locales[lang].searchBar.buttonSearch}</button>

    </form>
  )
}