"use client";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailsContext } from "@/context/UserDetailsContext";
import { api } from "@/convex/_generated/api";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { ArrowRight, Link, Loader2Icon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const ChatView = () => {
  const { id } = useParams();
  const [userInput, setUserInput] = useState();
  const convex = useConvex();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);
  const [loading, setLoading] = useState(false);
  const UpdateMessages = useMutation(api.workspace.UpdateMessages);

  const GetWorkspaceData = async () => {
    const result = await convex.query(api.workspace.GetWorkspace, {
      workspaceId: id,
    });
    setMessages(result?.messages);
    console.log(result);
  };

  useEffect(() => {
    id && GetWorkspaceData();
  }, [id]);

  const GetAiResponse = async () => {
    setLoading(true);
    const prompt = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
    const result = await axios.post("/api/ai-chat", {
      prompt: prompt,
    });
    console.log(result.data.result);
    const aiResponse = {
      role: "ai",
      content: result.data.result,
    };
    setMessages((prev) => [...prev, aiResponse]);
    await UpdateMessages({
      messages: [...messages, aiResponse],
      workspaceId: id,
    });
    setLoading(false);
  };
  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages?.length - 1].role;
      if (role === "user") {
        GetAiResponse();
      }
    }
  }, [messages]);

  const onGenerate = (input) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: input,
      },
    ]);
    setUserInput("");
  };
  return (
    <div className="relative h-[85vh] flex flex-col ">
      <div className="flex-1 overflow-y-scroll scrollbar-hide ">
        {messages?.map((msg, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: Colors.CHAT_BACKGROUND,
              }}
              className="p-3 rounded-lg mb-2 flex gap-2 items-center leading-7"
            >
              {msg?.role === "user" && (
                <Image
                  className="rounded-full"
                  src={userDetails?.picture}
                  alt="User Image"
                  width={35}
                  height={35}
                />
              )}
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p className="text-base leading-relaxed my-2" {...props} />
                  ),
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-white" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc list-inside my-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-4 text-base leading-snug" {...props} />
                  ),
                }}
              >
                {msg.content}
              </ReactMarkdown>
            </div>
          );
        })}
        {loading && (
          <div
            className="p-3 rounded-lg mb-2 flex gap-2 items-center"
            style={{
              backgroundColor: Colors.CHAT_BACKGROUND,
            }}
          >
            <Loader2Icon className="animate-spin" />
            <h2>Generating response ...</h2>
          </div>
        )}
      </div>
      <div
        className="p-5 border rounded-xl max-w-xl w-full mt-3"
        style={{
          backgroundColor: Colors.BACKGROUND,
        }}
      >
        <div className="flex gap-2">
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <ArrowRight
              onClick={() => onGenerate(userInput)}
              className="bg-blue-500 p-2 h-10 w-8 rounded-md cursor-pointer"
            />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default ChatView;
