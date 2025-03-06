import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";
import React from "react";

const Workspace = () => {
  return (
    <div className="P-10">
      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        <ChatView  />
        <div className="col-span-2"><CodeView/></div>
        
      </div>
    </div>
  );
};

export default Workspace;
