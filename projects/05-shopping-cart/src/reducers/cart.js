export const cartInitialState = []

export const cartReducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action
  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex(item => item.id === id)

      if (productInCartIndex >= 0) {
        // 👀 una forma sería usando structuredClone
        // const newState = structuredClone(state)
        // newState[productInCartIndex].quantity += 1

        // 👶 usando el map
        // const newState = state.map(item => {
        //   if (item.id === id) {
        //     return {
        //       ...item,
        //       quantity: item.quantity + 1
        //     }
        //   }

        //   return item
        // })

        // ⚡ usando el spread operator y slice
        const newState = [
          ...state.slice(0, productInCartIndex),
          { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
          ...state.slice(productInCartIndex + 1)
        ]

        return newState
      }

      // en caso de q el producto no esta en el carrito
      return [
        ...state,
        {
          ...action.payload, // product
          quantity: 1
        }
      ]
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      return state.filter(item => item.id !== id)
    }

    case 'CLEAR_CART': {
      return cartInitialState
    }
  }

  return state
}