import React from "react";

const MsgSidebar = (props) => {
  return (
    <div className="w-30 d-flex d-flex-dir-column border-pri rad-3-all">
      <div className="f-14 weight-600 border-v2 p-1">Message</div>

      <div className="d-flex d-flex-dir-column gap-1 p-1 border-v2">
        <div className="f-14 t-left" style={{ color: "grey" }}>
          text
        </div>

        <input
          onChange={(e) => {
            props.textCbFunc(e.target.value, props.currentNodesArr[0].id);
          }}
        ></input>
      </div>
    </div>
  );
};

export default MsgSidebar;
