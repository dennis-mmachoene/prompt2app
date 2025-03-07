"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { api } from "@/convex/_generated/api";
import { UpdateFiles } from "@/convex/workspace";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { countToken } from "./ChatView";
import { UserDetailsContext } from "@/context/UserDetailsContext";

const CodeView = () => {
  const [activeTab, setActiveTab] = useState("code");
  const [files, setFiles] = useState(Lookup?.DEFAULT_FILE);
  const { messages, setMessages } = useContext(MessagesContext);
  const updateFiles = useMutation(api.workspace.UpdateFiles);
  const { id } = useParams();
  const convex = useConvex();
  const [loading, setLoading] = useState(false);
  const UpdateTokens = useMutation(api.users.UpdateToken);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const GetFiles = async () => {
    setLoading(true);
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
    setFiles(mergedFiles);
    setLoading(false);
  };
  useEffect(() => {
    id && GetFiles();
  }, [id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    setLoading(true);
    const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;
    const result = await axios.post("/api/gen-ai-code", {
      prompt: PROMPT,
    });
    console.log(result.data);
    const aiResponse = result.data;
    console.log({ files: result.data.files });
    const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResponse?.files };
    setFiles(mergedFiles);
    await updateFiles({
      workspaceId: id,
      files: aiResponse?.files,
    });
    const token =
      Number(userDetails?.token) -
      Number(countToken(JSON.stringify(aiResponse)));

    await UpdateTokens({
      userId: userDetails?._id,
      token: token,
    });
    setActiveTab("code");
    setLoading(false);
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 gap-3 bg-black p-1 w-[140px] justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${activeTab === "code" && "text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full"}`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${activeTab === "preview" && "text-blue-500 bg-blue-500/25 p-1 px-2 rounded-full"}`}
          >
            Preview
          </h2>
        </div>
      </div>
      <SandpackProvider
        template="react"
        theme={"dark"}
        files={files}
        options={{
          externalResources: ["https://unpkg.com/@tailwindcss/browser@4"],
        }}
        customSetup={{
          dependencies: {
            ...Lookup.DEPENDANCY,
          },
        }}
      >
        <SandpackLayout>
          {activeTab === "code" ? (
            <>
              <SandpackFileExplorer style={{ height: "80vh" }} />
              <SandpackCodeEditor style={{ height: "80vh" }} />
            </>
          ) : (
            <>
              <SandpackPreview
                style={{ height: "80vh" }}
                showNavigator={true}
              />
            </>
          )}
        </SandpackLayout>
      </SandpackProvider>
      {loading && (
        <div className="p-10 bg-gray-900/80 absolute top-0 rounded-lg h-full w-full items-center justify-center">
          <Loader2Icon className="animate-spin h-10 w-10 text-white " />
          <h2 className="text-white">Generating your files..</h2>
        </div>
      )}
    </div>
  );
};

export default CodeView;
