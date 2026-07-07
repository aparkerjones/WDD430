import { useState } from 'react'

export default function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const title = newItem.trim()

    if (!title) {
      return
    }

    onSubmit(title)
    setNewItem('')
  }

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          id="item"
          type="text"
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          placeholder="Add a task"
        />
      </div>
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  )
}