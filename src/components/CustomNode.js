import { Handle, Position } from "reactflow";
//text-updater-node
const CustomNode = ({ data }) => {
  return (
    <div className="d-flex d-flex-dir-column shadow-2-5 rad-3-all f-12 min-width-150">
      <div className="rad-3-up p-0-5 bg-color-green t-left">
        Send message
      </div>
      <div className="d-flex d-flex-dir-column p-1">
        <div>{data.label}</div>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </div>
    </div>
  );
};

export default CustomNode;
