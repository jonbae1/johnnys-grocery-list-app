import { useEffect, useState } from "react"
import "./styles.css"

export default function App() {
  // Load initial state from local storage or set to empty array
  // Hook to create a new array of previous items and returns the newly added item
  const [groceryItems, setGroceryItems] = useState(() => {
    const savedItems = localStorage.getItem("groceryItems")
    return savedItems ? JSON.parse(savedItems) : []
  })


  // newGroceryItem is current state (initial value), setNewGroceryItem is a function that updates state.
  // Create a state variable using useState which is a React hook that allows interactivity
  // This hook takes what the user enters in the form and updates its state as an item on grocery list
  const [newGroceryItem, setNewGroceryItem] = useState("")

  // Effect to update local storage whenever groceryItems state changes
  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(groceryItems))
  }, [groceryItems])

  function handleSubmit(e) {

    e.preventDefault()

    setGroceryItems(currentGroceries => {
      return [
        //make a new array of current groceries
        ...currentGroceries,
        { id: crypto.randomUUID(), title: newGroceryItem, completed: false },
      ]
    })

    setNewGroceryItem("")
  }

  function toggleGroceryItem(id, completed) {
    setGroceryItems(currentGroceries => {
      return currentGroceries.map(groceryItem => {
        if (groceryItem.id === id) {
          return { ...groceryItem, completed }
        }
        return groceryItem
      })
    })
  }

  function deleteGroceryItem(id) {
    setGroceryItems(currentGroceries => {
      return currentGroceries.filter(groceryItem => groceryItem.id !== id)
    })
  }

  console.log(groceryItems)

  return (
    <>
      <h1 className="header">Johnny's Grocery List</h1>
      <form
        //attach event handler to implement add button functionality
        onSubmit={handleSubmit}
        className="new-grocery-item-form">
        <div className="form-row">
          <label htmlFor="grocery-item">Add an item:</label>
          <input
            value={newGroceryItem}
            onChange={e => setNewGroceryItem(e.target.value)}
            //'e' is parameter that represents the object that is passed to the setter
            //e.target.value retrieves what is currently in the text box
            //setter updates newGroceryItem state to what is after '=>' 
            type="text"
            id="grocery-item" />
        </div>
        <button className="add-btn">Add</button>
      </form>
      <ul className="list">

        {groceryItems.map(groceryItem => {
          //iterate over each item in groceryItems and generate a <li> for each item
          return (
            <li key={groceryItem.id}>
              <label>
                <input type="checkbox" checked={groceryItem.completed}
                  //returns value of the checkbox which is either checked or unchecked
                  onChange={e => toggleGroceryItem(groceryItem.id, e.target.checked)} />
                {groceryItem.title}
              </label>
              <button
                onClick={() => deleteGroceryItem(groceryItem.id)}
                className="delete-btn">Delete</button>
            </li>
          )
        })}

      </ul >
    </>
  )
}
