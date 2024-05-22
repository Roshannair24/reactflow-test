import React from "react";
import { useCallback } from "react";
import { Handle, Position } from "reactflow";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-1 w-30 d-flex d-flex-dir-column gap-1 border-pri rad-3-all">
      <div className="f-14 weight-600">Types</div>
      {/* <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "input")}
        draggable
      >
        Input Node
      </div> */}

      <div
        className="dndnode input"
        onDragStart={(event) => onDragStart(event, "custom")}
        draggable
      >
        Message
      </div>
      {/* <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, "default")}
        draggable
      >
        Default Node
      </div>
      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "output")}
        draggable
      >
        Output Node
      </div>

      <div
        className="dndnode output"
        onDragStart={(event) => onDragStart(event, "text")}
        draggable
      >
        Message
      </div> */}
    </div>
  );
};

export default Sidebar;
