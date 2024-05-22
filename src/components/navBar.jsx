import React, { useState, useRef, useCallback } from "react";
const Nav = (props) => {
  const [notifState, setNotifState] = useState("primary");
  let msgobj = {
    warning: {
      color: "#e34009",
      msg: "Cannot save flow",
      class: "warning-bg",
    },
    primary: {
      color: "#f0f0f0",
      msg: "",
      class: "primary-bg",
    },
  };
  const { nodes, edges } = props;
  return (
    <div className="d-flex d-flex-space-between p-1 bg-color-grey-1">
      <div className="w-80 d-flex d-flex-align-items-cent d-flex-just-cont-cent">
        <div
          style={{ backgroundColor: msgobj[notifState]["color"] }}
          className="f-14 weight-600 p-1 rad-3-all"
        >
          {msgobj[notifState]["msg"]}
        </div>
      </div>

      <button
        type="button"
        className="p-1 f-14 weight-600 rad-3-all border-v1 color-v1"
        onClick={() => {
          if (nodes.length - 1 !== edges.length) {
            setNotifState("warning");
          } else {
            setNotifState("primary");
          }
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Nav;
