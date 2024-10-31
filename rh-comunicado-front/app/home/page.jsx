"use client";
import { getCookieValue } from "../util/getCookieValue";
import { useState, useEffect, createContext } from "react";
import { FiPlusCircle } from "react-icons/fi";
import axios from "axios";
import { GroupList } from "../components/GroupList";
import { Chat } from "../components/Chat";
import { NewGroupModal } from "../components/NewGroupModal";
import { useGroupsData } from "../hooks/useGroups/useGroupsData";
import { toast } from "react-toastify";
import { Toasty } from "../components/Toasty";
import { useUsersData } from "../hooks/useUsers/useUsersData";
export const ChatContext = createContext();

export default function Home() {
  const [groupName, setGroupName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [myUser, setMyUser] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [currentChatMessages, setCurrentChatMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");

  if (!getCookieValue("token_user")) toast.error("Error: Token nao encontrado");
  const { data: chats, isLoading: isLoadingGroups } = useGroupsData();
  const { data: users, isLoading: isLoadingUsers } = useUsersData();
  const filteredChats = chats?.filter(
    (chat) =>
      chat.grupoNome.toLowerCase().includes(filter.toLowerCase()) ||
      chat.autorNome?.toLowerCase().includes(filter.toLowerCase())
  );

  const filteredUsers = users?.reduce((acc, user) => {
    if (user.user_id !== getCookieValue("token_user")) {
      if (user.name.toLowerCase().includes(filterUser.toLowerCase())) {
        acc.push(user);
      }
    }
    return acc;
  }, []);
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId]
    );
  };

  useEffect(() => {
    if (users) {
      const tokenUser = getCookieValue("token_user");
      const foundUser = users.find((user) => user.user_id === tokenUser);
      if (foundUser) {
        console.log(foundUser);
        setMyUser(foundUser);
      }
    }
  }, [users]);
  return (
    <>
      <ChatContext.Provider
        value={{
          chats,
          users,
          myUser,
          filteredChats,
          selectedChat,
          setSelectedChat,
          currentChatMessages,
          filteredUsers,
          groupName,
          setGroupName,
          selectedUsers,
          setSelectedUsers,
          handleCheckboxChange,
          setFilterUser,
        }}
      >
        <main className="flex flex-col items-center justify-between bg-white">
          <Toasty></Toasty>
          <div className="flex container ml-[50px] p-3 gap-3 h-[90dvh]">
            <div className="flex flex-col w-1/2 gap-2" id="listOfChats">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Comunicados</h1>
                <div className="flex gap-2">
                  {myUser.department_id == 5 || myUser.department_id == 1 ? (
                    <button
                      onClick={() =>
                        document.getElementById("newGroup").showModal()
                      }
                      className="bg-blue-500 text-white btn"
                    >
                      {" "}
                      <FiPlusCircle color="white" size={20} />
                      Grupo
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <hr />
              <input
                type="text"
                placeholder="Filtrar por título ou usuário..."
                className="input input-bordered p-4"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
              <hr />

              {!isLoadingGroups ? (
                <GroupList></GroupList>
              ) : (
                <span className="loading loading-spinner text-info"></span>
              )}
            </div>

            <Chat></Chat>
          </div>
          <NewGroupModal></NewGroupModal>
        </main>
      </ChatContext.Provider>
    </>
  );
}
