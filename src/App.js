import React from 'react'
import store from "./store";
import { useState } from "react";
import { useSelector } from "react-redux";

function findSelectedElID(obj) {
  return parseInt(obj.target.parentNode.parentElement.id)
}

function App() {
  const todosState = useSelector(state => state.todos)
  const filtersState = useSelector(state => state.filters)

  const [input, setInput] = useState('')

  const onColorChange = (e) => {
    store.dispatch({ type: 'filters/colorFilterChanged', payload: e.target.value })
  }

  const onStatusChange = (e) => {
    store.dispatch({ type: 'filters/statusFilterChanged', payload: e.target.value })
  }

  const onInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleDeleteAllClick = () => {
    store.dispatch({ type: 'todos/completedCleared' })
  }

  const handleTodoDelete = (e) => {
    store.dispatch({ type: 'todos/todoDeleted', payload: findSelectedElID(e) })
  }

  const onCheckboxChange = (e) => {
    store.dispatch({ type: 'todos/todoToggled', payload: findSelectedElID(e) })
  }

  const onCompletedAllChange = (e) => [
    store.dispatch({ type: 'todos/allCompleted', payload: e.target.checked })
  ]

  const onSubmit = (e) => {
    e.preventDefault()

    store.dispatch({ type: 'todos/todoAdded', payload: input })

    e.target.reset()
  }

  const onColorSelect = (e) => {
    store.dispatch({ type: 'todos/colorSelected', payload: { id: findSelectedElID(e), color: e.target.value } })
  }

  const todos = todosState.filter(todo => {
    const completedFilter = filtersState.status === 'All'
      || (todo.completed && filtersState.status === 'Completed')
      || (!todo.completed && filtersState.status === 'Active')

    const color = todo.color || 'black'
    const colorFilter = color.startsWith(filtersState.color.toLowerCase())

    return completedFilter && colorFilter
  }).map(({ id, text, completed, color }) => (
      <tr key={id} id={id} style={{ backgroundColor: completed && 'deepSkyBlue', color: color }}>
        <td>{id}</td>
        <td>{text}</td>
        <td>
          <select name="color" id="color" onChange={onColorSelect} value={color} style={{ color: color, borderColor: color }}>
            <option value="black">Black</option>
            <option value="green" style={{ color: 'green' }}>Green</option>
            <option value="blue" style={{ color: 'blue' }}>Blue</option>
            <option value="red" style={{ color: 'red' }}>Red</option>
            <option value="purple" style={{ color: 'purple' }}>Purple</option>
          </select>
        </td>
        <td>
          <input type="checkbox" onChange={onCheckboxChange} checked={completed}/>
        </td>
        <td>
          <button onClick={handleTodoDelete} style={{ color: "red" }}>X</button>
        </td>
      </tr>
    )
  )

  const todosLength = todosState.length
  const allCompleted = todosState.every(todo => todo.completed === true)

  return (
    <div className="App">
      <nav>
        <section>
          <h1>Redux Fundamentals Example</h1>
        </section>
      </nav>
      <section>
        <h2>Welcome to the Redux Fundamentals example app!</h2>
      </section>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onInputChange} required/>
        <button type="submit">Add todo</button>
      </form>
      {!!todosLength &&
      <div>
        Filter by:
        <div>
          Status
          <select name="status" id="status" onChange={onStatusChange}>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="color">Color</label>
          <input type="text" onChange={onColorChange}/>
        </div>
        <table>
          <thead>
          <tr>
            <th>№</th>
            <th>Todo</th>
            <th>Color</th>
            <th>
              Mark as completed
              <input type="checkbox" onChange={onCompletedAllChange} checked={allCompleted}/>
            </th>
            <th>
              <button onClick={handleDeleteAllClick}>Delete All Completed</button>
            </th>
          </tr>
          </thead>
          <tbody>{todos}</tbody>
        </table>
      </div>}
    </div>
  )
}

export default App
