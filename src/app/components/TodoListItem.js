"use client"

import { useState } from "react";

export default function TodoListItem() {
  const [activeItems, setActiveItems] = useState(["Milk", "Apples", "Bananas", "Oranges"]);
  const [inactiveItems, setInactiveItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = (e) => {
    if (e.key === "Enter" && newItem !== "") {
      setActiveItems((prevItems) => [...prevItems, newItem]);
      setNewItem("");
    }
  }
  
  const completeItem = (item) => {
    removeActiveItem(item);
    setInactiveItems((prevItems) => [...prevItems, item]);
  }

  const restoreItem = (item) => {
    setInactiveItems((previousItems) => previousItems.filter((i) => i !== item));
    setActiveItems((prevItems) => [...prevItems, item]);
  }

  const removeActiveItem = (item) => {
    setActiveItems((previousItems) => previousItems.filter((i) => i !== item));
  }

  const removeInactiveItem = (item) => {
    setInactiveItems((previousItems) => previousItems.filter((i) => i !== item));
  }

  return (
      <>
        <input
          type="text"
          value={newItem}
          placeholder="Add item"
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={handleAddItem}
          className="w-full p-2 mb-4 border rounded"
        />
        {activeItems.length > 0 ? (
          <div className="active-item-container">
            {activeItems.map((item, index) => (
              <div key={item + "-" + index} className="active-item flex justify-between py-2">
                <div className="item">
                  <input onChange={() => completeItem(item)} id={item} type="checkbox" />
                  <label className="ml-2 select-none" htmlFor={item}>{item}</label>
                </div>
                <button className="remove-item justify-self-end" onClick={() => removeActiveItem(item)}>x</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 py-2">There are no active items</p>
        )}
        {inactiveItems.length > 0 && (
          <div className="inactive-item-container border-t-2 pt-4">
            {inactiveItems.map((item, index) => (
              <div key={item + "-" + index} className="inactive-item flex justify-between py-2">
                <div className="item">
                  <input onChange={() => restoreItem(item)} id={item} type="checkbox" checked />
                  <label className="ml-2 select-none text-gray-400 line-through" htmlFor={item}>{item}</label>
                </div>
                <button className="remove-item justify-self-end" onClick={() => removeInactiveItem(item)}>x</button>
              </div>
            ))}
          </div>
        )}   
      </>
  );
}