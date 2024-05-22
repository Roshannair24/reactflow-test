import { Handle, Position } from "reactflow";

const CustomNode = ({ data }) => {
  return (
    <div className="text-updater-node shadow-2-5">
      <div style={{ padding: "10px 20px" }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default CustomNode;
