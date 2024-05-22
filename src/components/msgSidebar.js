import React from "react";

const MsgSidebar = (props) => {


console.log("props=>",props.currentNodesArr)


  return (
    <div>
      <div className="description">SidebarV2</div>

      <input
        onChange={(e) => {
          props.textCbFunc(e.target.value,props.currentNodesArr[0].id);
        }}
      ></input>
    </div>
  );
};

export default MsgSidebar;
