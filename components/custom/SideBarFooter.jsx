import { HelpCircle, LogOut, Settings, Wallet } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SideBarFooter = () => {
  const router = useRouter();
  const options = [
    {
      name: "Setting",
      icon: Settings,
    },
    {
      name: "Help Center",
      icon: HelpCircle,
    },
    {
      name: "My Subscription",
      icon: Wallet,
      path: "/pricing",
    },
    {
      name: "Sign Out",
      icon: LogOut,
    },
  ];

  const onOptionClick = (option) => {
    router.push(option.path);
  };

  return (
    <div className="p-2 mb-10">
      {options.map((option, index) => (
        <Button
          onClick={() => onOptionClick(option)}
          key={index}
          variant="ghost"
          className="flex my-3 justify-start w-full"
        >
          <option.icon />
          {option.name}
        </Button>
      ))}
    </div>
  );
};

export default SideBarFooter;
