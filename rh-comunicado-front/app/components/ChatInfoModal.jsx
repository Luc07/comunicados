import { useContext, useState } from "react";
import Avatar from "./Avatar";
import { useRemoveUserMutation } from "../hooks/useChat/useRemoveUserMutate";
import { Toasty } from "./Toasty";
import { ChatContext } from "../home/page";
import { useAddUserMutation } from "../hooks/useChat/useAddUserMutate";
import { useRemoveGroupMutate } from "../hooks/useGroups/useRemoveGroupMutate";
import { getCookieValue } from "../util/getCookieValue";

export default function ChatInfoModal({ users = [], selectedChat }) {
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserToAdd, setSelectedUserToAdd] = useState(null);
  const { mutate: mutateAdd } = useAddUserMutation();
  const { mutate: mutateDelGroup } = useRemoveGroupMutate();
  const { mutate } = useRemoveUserMutation();
  const { users: allUsers, setSelectedChat, myUser } = useContext(ChatContext);

  // Filtrar apenas os usuários que não estão no grupo atual
  const filteredUsers = allUsers?.filter(
    (user) =>
      !users.some((groupUser) => groupUser.user_id === user.user_id) &&
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  const submitRemoveUser = () => {
    const data = {
      selectedChat: selectedChat,
      userId: selectedUser.user_id,
    };
    console.log(data);
    mutate(data);
  };

  const submitAddUser = () => {
    console.log(selectedUserToAdd);
    const data = {
      selectedChat: selectedChat,
      userId: selectedUserToAdd.user_id,
    };
    mutateAdd(data);
  };
  const submitRemoveGroup = () => {
    const data = {
      selectedChat: selectedChat,
    };
    mutateDelGroup(data);
  };
  return (
    <>
      <dialog id="chatInfo" className="modal">
        <div className="modal-box flex flex-col gap-3">
          <h3 className="font-bold text-lg">{users?.length} membros</h3>
          <p className="text-sm italic bg-gray-300 rounded-md px-2 text-gray-500">
            id: {selectedChat}
          </p>
          <input
            type="text"
            placeholder="Buscar usuário.."
            className="container input input-bordered grow mb-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <ul className="container overflow-y-auto max-h-96 join join-vertical">
            {search
              ? users
                  ?.filter((user) =>
                    user.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((user) => (
                    <li
                      key={user.user_id}
                      className="container flex p-2 items-center justify-start gap-2 border border-b-gray-300 join-item"
                    >
                      <Avatar name={user.name} />
                      <p className="break-all w-full">{user.name}</p>
                      {myUser.department_id == 5 ||
                      myUser.department_id == 1 ? (
                        <div>
                          <button className="btn btn-error text-white">
                            Remover
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </li>
                  ))
              : users?.map((user) => (
                  <li
                    key={user.user_id}
                    className="container flex p-2 items-center justify-start gap-2 border border-b-gray-300 join-item"
                  >
                    <Avatar name={user.name} />
                    <p className="break-all w-full">{user.name}</p>
                    {user.user_id == getCookieValue("token_user") ? (
                      ""
                    ) : myUser.department_id == 5 ||
                      myUser.department_id == 1 ? (
                      <div>
                        <button
                          className="btn btn-error text-white"
                          onClick={(_) => {
                            setSelectedUser(user);
                            document.getElementById("rmvUser").showModal();
                          }}
                        >
                          Remover
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </li>
                ))}
          </ul>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn ">Fechar</button>
            </form>
            {myUser.department_id == 5 || myUser.department_id == 1 ? (
              <>
                <button
                  className="btn btn-error text-white"
                  onClick={(_) =>
                    document.getElementById("rmvGroupConfirmation").showModal()
                  }
                >
                  Apagar Grupo
                </button>
                <button
                  className="btn btn-success text-white"
                  onClick={(_) =>
                    document.getElementById("addUser").showModal()
                  }
                >
                  Adicionar
                </button>{" "}
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </dialog>

      {/* Modal para remover usuário */}
      <dialog id="rmvUser" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmação</h3>
          <p className="py-4">
            Tem certeza que deseja remover {selectedUser.name}?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn ">Cancelar</button>
            </form>
            <form method="dialog">
              <button
                className="btn btn-error"
                onClick={() => {
                  submitRemoveUser();
                  document.getElementById("rmvUser").close("rmvUser");
                }}
                form="rmvUser"
              >
                Remover
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal para adicionar novo usuário */}
      <dialog id="addUser" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box gap-3">
          <h3 className="font-bold text-lg">Adicionar novo usuário</h3>
          <input
            type="text"
            placeholder="Nome do usuário.."
            className="input input-bordered container"
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="grid grid-cols-1 relative overflow-y-auto max-h-96">
            {filteredUsers?.map((user) => (
              <li
                key={user.user_id}
                className="flex p-2 items-center justify-start gap-2 border border-b-gray-300 w-full"
              >
                <Avatar name={user.name} />
                <p className="break-all w-full">{user.name}</p>
                <button
                  className="btn btn-success text-white"
                  onClick={() => {
                    document.getElementById("addUserConfirmation").showModal();
                    setSelectedUserToAdd(user);
                  }}
                >
                  Adicionar
                </button>
              </li>
            ))}
          </ul>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Cancelar</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        id="addUserConfirmation"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmação</h3>
          <p className="py-4">Adicionar {selectedUserToAdd?.name}?</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn ">Cancelar</button>
            </form>
            <button
              className="btn btn-success"
              onClick={() => {
                submitAddUser();
                document
                  .getElementById("addUserConfirmation")
                  .close("addUserConfirmation");
              }}
            >
              Adicionar
            </button>
          </div>
        </div>
      </dialog>

      <dialog
        id="rmvGroupConfirmation"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirmação</h3>
          <p className="mt-4">Deseja mesmo apagar o grupo?</p>
          <p className="font-bold">Essa ação não pode ser desfeita.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-error text-white">Cancelar</button>
            </form>
            <button
              className="btn btn-outline"
              onClick={() => {
                submitRemoveGroup();
                setSelectedChat(null);
                document
                  .getElementById("rmvGroupConfirmation")
                  .close("rmvGroupConfirmation");

                document.getElementById("chatInfo").close("chatInfo");
              }}
            >
              Apagar
            </button>
          </div>
        </div>
      </dialog>

      <Toasty></Toasty>
    </>
  );
}
