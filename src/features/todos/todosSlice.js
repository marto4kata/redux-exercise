const initialState = []

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0)
  return maxId + 1
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [
        ...state,
        {
          id: nextTodoId(state),
          text: action.payload,
          completed: false
        }
      ]
    }
    case 'todos/todoToggled': return state
      .map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
    case 'todos/colorSelected': {
      const { id, color } = action.payload

      return state.map(todo => todo.id === id ? { ...todo, color } : todo)
    }
    case 'todos/todoDeleted': {
      return state.filter(todo => todo.id !== action.payload)
    }
    case 'todos/allCompleted': {
      return state.map(todo => ({ ...todo, completed: action.payload }))
    }
    case 'todos/completedCleared': {
      return state.filter(todo => todo.completed === false)
    }
    default:
      return state
  }
}
