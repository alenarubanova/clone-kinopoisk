import React from 'react'
import { Input } from '../input/input'


export function SearchBar(): React.ReactElement {
  return (
    <form>
      <Input
        type="text"
        placeholder="Search..."
        id="search-input"
        name="search"
        className="search-input"
      />
      <button type="submit">Search</button>
    </form>
  )
}