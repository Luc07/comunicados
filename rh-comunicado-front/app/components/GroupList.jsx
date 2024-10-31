"use client";
import { useContext } from "react";
import Avatar from "./Avatar";
import { ChatContext } from "../home/page";
import { formatMessageDate } from "../util/formatMessageDate";

export const GroupList = () => {
  const { filteredChats, setSelectedChat, selectedChat } =
    useContext(ChatContext);
  const sortedChats = filteredChats?.slice().sort((a, b) => {
    const dateA = new Date(a.mensagemDataEnvio);
    const dateB = new Date(b.mensagemDataEnvio);
    return dateB - dateA;
  });

  return (
    <ul className="container overflow-y-auto custom-scrollbar border border-slate-300">
      {sortedChats?.length > 0 ? (
        sortedChats?.map((chat) => {
          return (
            <li
              key={chat.grupoId}
              onClick={() => {
                setSelectedChat(chat.grupoId);
              }}
              className={`flex p-2 items-center border border-slate-200 relative cursor-pointer ${
                selectedChat === chat.grupoId ? "bg-blue-100" : ""
              }`}
            >
              <Avatar size={"60"} name={chat.grupoNome}></Avatar>
              <div className="flex flex-col p-2 truncate">
                <p className="font-semibold">{chat.grupoNome}</p>
                <span className="text-sm text-gray-500 truncate min-w-[70%]">
                  ~{chat.autorNome ? chat.autorNome : ""}:
                  {" " + chat.mensagemConteudo}
                </span>
              </div>
              <div className="right-[15px] top-1/4 text-sm absolute">
                {chat.mensagemDataEnvio
                  ? formatMessageDate(chat.mensagemDataEnvio)
                  : ""}
              </div>
            </li>
          );
        })
      ) : (
        <p className="text-center">Você ainda não possui algum comunicado.</p>
      )}
    </ul>
  );
};
