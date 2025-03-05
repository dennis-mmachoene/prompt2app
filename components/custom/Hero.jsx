"use client";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useState } from "react";

const Hero = () => {
  const [userInput, setUserInput] = useState();

  const onGenerate = () => {
    
  }
  return (
    <div className="flex flex-col items-center mt-36 xl:mt-52 gap-2">
      <h2 className="font-bold text-4xl">{Lookup.HERO_HEADING}</h2>
      <p className="text-gray-400 font-medium">{Lookup.HERO_DESC}</p>
      <div className="p-5 border rounded-xl max-w-xl w-full mt-3" style={{
        backgroundColor: Colors.BACKGROUND
      }}>
        <div className="flex gap-2">
          <textarea
            onChange={(e) => setUserInput(e.target.value)}
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none"
            placeholder={Lookup.INPUT_PLACEHOLDER}
          />
          {userInput && (
            <ArrowRight className="bg-blue-500 p-2 h-10 w-8 rounded-md cursor-pointer" />
          )}
        </div>
        <div>
          <Link className="h-5 w-5" />
        </div>
      </div>
      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((suggestion, index) => {
          return (
            <h2 className=" text-sm text-gray-400 hover:text-white cursor-pointer p-1 px-2 border rounded-full" key={index}>{suggestion}</h2>
          )
        })}
      </div>
    </div>
  );
};

export default Hero;
