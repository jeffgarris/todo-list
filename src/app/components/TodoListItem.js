"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function TodoListItem() {
  const [activeItems, setActiveItems] = useState(["Milk", "Apples", "Bananas", "Oranges"]); // State for active items
  const [inactiveItems, setInactiveItems] = useState([]); // State for inactive items
  const [newItem, setNewItem] = useState(""); // State for input field

  // If user hits Enter and the input has a value, add input value as an active list item
  const handleAddItem = (e) => {
    if (e.key === "Enter" && newItem.trim() !== "") {
      setActiveItems((prevItems) => [...prevItems, newItem.trim()]);
      setNewItem(""); // Clear input field
    }
  };

  // Check item off list
  const completeItem = (item) => {
    removeActiveItem(item);
    setInactiveItems((prevItems) => [...prevItems, item]);
  };

  // Restore item to active list
  const restoreItem = (item) => {
    setInactiveItems((prevItems) => prevItems.filter((i) => i !== item));
    setActiveItems((prevItems) => [...prevItems, item]);
  };

  // Remove item from active list
  const removeActiveItem = (item) => {
    setActiveItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  // Remove item from inactive list
  const removeInactiveItem = (item) => {
    setInactiveItems((prevItems) => prevItems.filter((i) => i !== item));
  };

  // Drag and drop
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedItems = [...activeItems];
    const [movedItem] = reorderedItems.splice(result.source.index, 1); // Remove dragged item
    reorderedItems.splice(result.destination.index, 0, movedItem); // Insert at new position

    setActiveItems(reorderedItems); // Update state
  };

  return (
    <>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyDown={handleAddItem}
        placeholder="Add a new item..."
        className="w-full p-2 border rounded"
      />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="activeItems">
          {(provided) => (
            <div className="active-item-container pt-2" ref={provided.innerRef} {...provided.droppableProps}>
              {activeItems.length === 0 ? (
                <p className="text-gray-500 italic">No active items</p>
              ) : (
                activeItems.map((item, index) => (
                  <Draggable key={item} draggableId={item} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="active-item flex justify-between my-1 bg-white shadow-sm p-2 rounded cursor-grab"
                      >
                        <div className="item">
                          <input onChange={() => completeItem(item)} id={item} type="checkbox" />
                          <label className="ml-2 select-none" htmlFor={item}>{item}</label>
                        </div>
                        <button className="remove-item justify-self-end" onClick={() => removeActiveItem(item)}>x</button>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {inactiveItems.length > 0 && ( // Only display inactive section if there are items
        <div className="inactive-item-container border-t-2 pt-2">
          {inactiveItems.map((item) => (
            <div key={item} className="inactive-item flex justify-between p-2">
              <div className="item">
                <input onChange={() => restoreItem(item)} id={item} type="checkbox" checked className="accent-zinc-400" />
                <label className="ml-2 select-none line-through text-zinc-400" htmlFor={item}>{item}</label>
              </div>
              <button className="remove-item justify-self-end" onClick={() => removeInactiveItem(item)}>x</button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
