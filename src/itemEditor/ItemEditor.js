import React from "react";
import "./ItemEditor.css";

function ItemEditor({ item }) {
  return (
    <div className="item-editor">
      This will be the interface for {JSON.stringify(item)}
    </div>
  );
}

export default ItemEditor;
