const initialState = {
  status: 'All',
  color: ''
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload
      }
    }
    case 'filters/colorFilterChanged': {
      return {
        ...state,
        color: action.payload
      }
    }
    default: {
      return state
    }
  }
}
