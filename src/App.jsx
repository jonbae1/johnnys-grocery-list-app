import "./styles.css"

export default function App() {
  return (
    <>
      <h1 className="header">Johnny's Grocery List</h1>
      <form className="new-grocery-item-form">
        <div className="form-row">
          <label htmlFor="grocery-item">Add an item:</label>
          <input type="text" id="grocery-item" />
        </div>
        <button className="add-btn">Add</button>
      </form>
      <ul className="list">
        <li>
          <label>
            <input type="checkbox" />
            Grocery Item 1
          </label>
          <button className="delete-btn">Delete</button>
        </li>
      </ul>
    </>
  )
}
