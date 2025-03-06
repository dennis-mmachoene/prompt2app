import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailsContext } from "@/context/UserDetailsContext";

const Header = () => {
  const { userDetails, setuserDetails } = useContext(UserDetailsContext);
  return (
    <div className="p-4 flex justify-between items-center">
      <Image src={"/logo.webp"} alt="Logo" height={40} width={40} />
      {!userDetails && (
        <div className="flex gap-5">
          <Button variant="ghost">Log In</Button>
          <Button
            className="text-white"
            style={{ backgroundColor: Colors.BLUE }}
          >
            Get Started
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
