import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "../home/page";
import Avatar from "./Avatar";
import { useGroupsMutate } from "../hooks/useGroups/useGroupsMutate";
import { getCookieValue } from "../util/getCookieValue";
import { Toasty } from "./Toasty";

export const NewGroupModal = () => {
  const handleClose = () => {
    document.getElementById("newGroup").close("newGroup");
  };

  const { mutate, isSuccess, isError, isPending } = useGroupsMutate();
  const {
    groupName,
    setGroupName,
    filterUser,
    filteredUsers,
    selectedUsers,
    setSelectedUsers,
    handleCheckboxChange,
    setFilterUser,
  } = useContext(ChatContext);

  const submit = () => {
    const updatedUsers = [...selectedUsers, getCookieValue("token_user")];
    console.log(isError);
    const data = {
      nome: groupName,
      usuariosIds: updatedUsers,
    };

    mutate(data);
  };

  useEffect(() => {
    handleClose();
  }, [isSuccess]);
  return (
    <dialog
      id="newGroup"
      className="rounded-lg w-[50dvw] border-slate-200 border p-4"
    >
      <form
        id="create_group"
        className="flex flex-col h-full gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="indicator">
          <span className="indicator-item badge">Obrigatório</span>
          <input
            type="text"
            placeholder="Nome do grupo..."
            className="input input-bordered"
            value={groupName}
            required
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <hr />
        <input
          type="text"
          placeholder="Filtrar usuários..."
          className="input container input-bordered"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <div className="flex flex-col gap-3 h-full overflow-y-auto border rounded-xl">
          <ul className="grid grid-cols-3 relative overflow-y-auto max-h-96">
            {filteredUsers?.map((user) => (
              <li
                key={user.user_id}
                className="flex p-2 items-center justify-start gap-2 border border-b-gray-300 w-full"
              >
                <input
                  type="checkbox"
                  checked={selectedUsers?.includes(user.user_id)}
                  onChange={() => handleCheckboxChange(user.user_id)}
                />
                <Avatar name={user.name} />
                <p className="break-all w-full">{user.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </form>
      <div className="modal-action">
        <form method="dialog">
          <button
            className="btn btn-error text-white transition-all"
            disabled={isPending}
          >
            Cancelar
          </button>
        </form>
        <form method="dialog">
          <button
            type="submit"
            className="btn btn-success text-white transition-all"
            form="create_group"
            disabled={isPending}
          >
            Criar Grupo
          </button>
        </form>
      </div>
      <Toasty></Toasty>
    </dialog>
  );
};
