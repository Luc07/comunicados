"use client";

import { MoreVertical, ChevronLast, ChevronFirst, LogOut } from "lucide-react";
import { createContext, useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Comment } from "react-loader-spinner";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  return (
    <SidebarContext.Provider value={{ expanded, activeItem, setActiveItem }}>
      <aside
        className={`z-50 h-screen fixed ${expanded ? "w-[300px]" : "w-[70px]"}`}
      >
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Image
              src="/logo2.png"
              width={1000}
              height={1000}
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>
          <ul className="flex-1 px-3">{children}</ul>
          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
              </div>
              <LogOut size={20} />
            </div>
          </div>
        </nav>
      </aside>
    </SidebarContext.Provider>
  );
}

export function SidebarItem({ icon, text, alert, desiredUrl }) {
  const { expanded, activeItem, setActiveItem } = useContext(SidebarContext);
  const router = useRouter();
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          activeItem === text
            ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800"
            : "hover:bg-orange-50 text-gray-600"
        }
      `}
      onClick={() => {
        setActiveItem(text);
        router.push(`/${desiredUrl}`);
      }}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-orange-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
}
