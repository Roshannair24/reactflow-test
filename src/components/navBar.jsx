import React, { useState, useRef, useCallback } from "react";
const Nav = (props) => {
  console.log("nav props=>", props);
  const [notifState, setNotifState] = useState("primary");
  let msgobj = {
    warning: {
      color: "red",
      msg: "Cannot save flow",
    },
    primary: {
      color: "white",
      msg: "",
    },
  };
  const { nodes, edges } = props;
  return (
    <div className="d-flex d-flex-space-between p-1 bg-color-grey-1">
      <div className="w-80 ">
        <div style={{ backgroundColor: msgobj[notifState]["color"] }}>
          {msgobj[notifState]["msg"]}
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          console.log("nodes,edges", nodes.length, edges.length);

          if (nodes.length - 1 !== edges.length) {
            setNotifState("warning");
          } else {
            setNotifState("primary");
          }
        }}
      >
        Save flow
      </button>
    </div>
  );
};

export default Nav;
