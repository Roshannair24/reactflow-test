import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "../components/sidebar";
import TextUpdaterNode from "../components/TextUpdaterNode";
import CustomNode from "../components/CustomNode";
import MsgSidebar from "../components/msgSidebar";
import Nav from "../components/navBar";

const rfStyle = {
  // backgroundColor: "#B8CEFF",
};

const initialNodes = [
  // {
  //   id: "node-1",
  //   type: "textUpdater",
  //   position: { x: 0, y: 0 },
  //   data: { value: 123 },
  // },
  // {
  //   id: "1",
  //   type: "input",
  //   data: { label: "input node" },
  //   position: { x: 250, y: 5 },
  // },
];

// defining the nodeTypes outside of the component to prevent re-renderings
const nodeTypes = { textUpdater: TextUpdaterNode, customNode: CustomNode };

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectionDetails, setSelectionDetails] = useState({});

  const memoizedCallback = useCallback((params) => {
    setSelectionDetails(params);
  }, []);

  const setTextFunc = (text, local_id) => {
    console.log("out text", text, "-", local_id);

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === local_id) {
          // it's important to create a new object here
          // in order to notify react flow about the change
          node.data = {
            ...node.data,
            label: text,
          };
        }

        return node;
      })
    );
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");

      // checking if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      } else if (type === "text") {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        // const newNode = {
        //   id: getId(),
        //   type,
        //   position,
        //   data: { label: `${type} node` },
        // };

        const newNode = {
          id: getId(),
          type: "textUpdater",
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      } else if (type === "custom") {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        // const newNode = {
        //   id: getId(),
        //   type,
        //   position,
        //   data: { label: `${type} node` },
        // };

        const newNode = {
          id: getId(),
          type: "customNode",
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      } else {
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type,
          position,
          data: { label: `${type} node` },
        };

        setNodes((nds) => nds.concat(newNode));
      }

      // setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="d-flex d-flex-dir-column" style={{ width: "100vw", height: "100vh" }}>
      <Nav nodes={nodes} edges={edges}/>

      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onSelectionChange={memoizedCallback}
              fitView
              nodeTypes={nodeTypes}
              // style={rfStyle}
            >
              <Controls />
            </ReactFlow>
          </div>
          {selectionDetails?.nodes?.length === 0 ? (
            <Sidebar />
          ) : (
            <MsgSidebar
              currentNodesArr={selectionDetails?.nodes}
              textCbFunc={setTextFunc}
            />
          )}
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DnDFlow;
