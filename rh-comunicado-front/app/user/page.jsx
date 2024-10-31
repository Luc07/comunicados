"use client";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useForm } from "react-hook-form";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash, FiTrash2 } from "react-icons/fi";
import { UserPlus } from "lucide-react";
import axios from "axios";
import Avatar from "../components/Avatar";

export default function Login() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [type, setType] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { register, handleSubmit, getValues, setValue } = useForm();

  const getCookieValue = (name) => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  useEffect(() => {
    if (getCookieValue("token_comunicados")) {
      try {
        axios
          .get(`${process.env.API_URL}/userAuth`, {
            headers: {
              Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
            },
          })
          .then((result) => {
            setUsers(result.data);
            setFilteredUsers(result.data);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, users]);

  const editUser = async (data) => {
    console.log(users);
    document.getElementById("my_modal_1").close();
  };

  const handleDeleteConfirm = async (userIdToDelete) => {
    if (getCookieValue("token_comunicados")) {
      try {
        await axios.delete(
          `${process.env.API_URL}auth/delete/${userIdToDelete}`,
          {
            headers: {
              Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
            },
          }
        );
        window.location.reload();

        setUsers(users.filter((user) => user.user_id !== userIdToDelete));
        setFilteredUsers(
          filteredUsers.filter((user) => user.user_id !== userIdToDelete)
        );
      } catch (error) {
        console.log(error);
        alert(`${error.response.data}`);
      }
      document.getElementById("my_modal_5").close();
    } else {
      setError("Token não encontrado. Redirecionando...");
      window.location.href = `${process.env.CONNECT}`;
    }
  };

  const onSubmit = async (data) => {
    if (getCookieValue("token_comunicados")) {
      try {
        const response = await axios.post(
          `${process.env.API_URL}`,
          {
            name: data.nome,
            user: data.usuario,
            password: data.senha,
            department_id: 0,
            role: "USER",
          },
          {
            headers: {
              Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
            },
          }
        );
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.log(error);
        alert(`${error.response.data}`);
      }
    } else {
      setError("Token não encontrado. Redirecionando...");
    }
  };

  return (
    <>
      <main className="flex justify-around items-center h-screen p-8 bg-white">
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box flex items-center justify-center bg-white">
            <div className="modal-action">
              <form
                method="dialog"
                className="flex flex-col flex-wrap border-[1px] rounded-xl p-5 gap-3 border-gray-300 mb-6 "
                onSubmit={handleSubmit(editUser)}
              >
                <h1 className="text-gray-500 self-center text-lg font-semibold">
                  Editar Usuário
                </h1>
                <div className="border border-gray-400 rounded-md h-14 w-96 text-sm relative focus-within:border-orange-600">
                  <input
                    {...register("nomeEdit")}
                    className="w-full h-full px-4 pt-3 outline-none bg-transparent text-gray-500 peer"
                    required
                    type="text"
                    autoComplete="off"
                    placeholder=""
                  />
                  <label
                    className="z-0 text-gray-400 absolute left-4 top-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    htmlFor=""
                  >
                    Nome
                  </label>
                </div>
                <div className="border border-gray-400 rounded-md h-14 w-96 text-sm relative focus-within:border-orange-600">
                  <input
                    {...register("usuarioEdit")}
                    className="w-full h-full px-4 pt-3 outline-none bg-transparent text-gray-500 peer"
                    required
                    type="text"
                    autoComplete="off"
                    placeholder=""
                  />
                  <label
                    className="z-0 text-gray-400 absolute left-4 top-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    htmlFor=""
                  >
                    Nome de usuário
                  </label>
                </div>
                <div className="border border-gray-400 rounded-md h-14 w-96 text-sm relative focus-within:border-orange-600">
                  <input
                    {...register("senhaEdit")}
                    className="w-full h-full px-4 pt-3 outline-none bg-transparent text-gray-500 peer"
                    required
                    type={type ? "password" : "text"}
                    autoComplete="off"
                    placeholder=""
                  />
                  <label
                    className="z-0 text-gray-400 absolute left-4 top-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
                    htmlFor=""
                  >
                    Senha
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn bg-orange-300 border-orange-600"
                >
                  Salvar
                </button>
                <button
                  className="btn border-none btn-sm btn-circle absolute right-2 top-2 bg-white text-[20px] text-black hover:bg-white hover:scale-125"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  X
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="w-96"></div>

        <form
          className="flex flex-col flex-wrap border-[1px] rounded-xl p-5 gap-3 border-gray-300 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-gray-500 self-center text-lg font-semibold">
            Cadastrar Usuário
          </h1>
          <div className="border border-gray-400 rounded-md h-14 w-96 text-sm relative focus-within:border-orange-600">
            <input
              {...register("nome")}
              className="w-full h-full px-4 pt-3 outline-none bg-transparent text-gray-500 peer"
              type="text"
              autoComplete="off"
              placeholder=""
            />
            <label
              className="text-gray-400 absolute left-4 top-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
              htmlFor=""
            >
              Nome
            </label>
          </div>
          <div className="border border-gray-400 rounded-md h-14 w-96 text-sm relative focus-within:border-orange-600">
            <input
              {...register("usuario")}
              className="w-full h-full px-4 pt-3 outline-none bg-transparent text-gray-500 peer"
              type="text"
              autoComplete="off"
              placeholder=""
            />
            <label
              className="text-gray-400 absolute left-4 top-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
              htmlFor=""
            >
              Nome de usuário
            </label>
          </div>
          <div className="border border-gray-400 rounded-md h-14 w-96 text-sm relative focus-within:border-orange-600">
            <input
              {...register("senha")}
              className="w-full h-full px-4 pt-3 outline-none bg-transparent text-gray-500 peer"
              type={type ? "password" : "text"}
              autoComplete="off"
              placeholder=""
            />
            <label
              className="text-gray-400 absolute left-4 top-4 transition-all duration-200 peer-focus:text-xs peer-focus:top-2 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs"
              htmlFor=""
            >
              Senha
            </label>
            <div
              className="absolute top-[1rem] right-3 hover:cursor-pointer"
              onClick={() => setType(!type)}
            >
              {type ? (
                <IoMdEyeOff size={24} color="gray" />
              ) : (
                <IoMdEye color="gray" size={24} />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-center items-center gap-5 hover:border hover:border-orange-400 hover:text-orange-400 hover:bg-white transition-all duration-300 bg-orange-400 text-white font-bold py-3 px-4 rounded-md"
          >
            <UserPlus size={20} /> Cadastrar Usuário
          </button>
        </form>

        <div className="w-80 h-[90%] flex flex-col gap-8">
          <div className="">
            <h1 className="p-5 font-semibold text-orange-800 text-xl">
              Usuários
            </h1>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
          <ul className="text-black h-3/5 overflow-y-auto custom-scrollbar border border-gray-400 rounded-xl">
            {filteredUsers.map((user) => (
              <li
                key={user.user_id}
                className="flex p-3 items-center justify-between border border-t-gray-300 w-[100%]"
              >
                <Avatar name={user.name}></Avatar>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="break-all w-[100%]">{user.name}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-center cursor-pointer">
                  <FiTrash
                    size={20}
                    onClick={() => {
                      document.getElementById("my_modal_5").showModal();
                      setSelectedUser(user);
                    }}
                  />
                  <FaRegEdit
                    size={20}
                    onClick={() => {
                      setValue("nomeEdit", user.name);
                      setValue("usuarioEdit", user.user);
                      document.getElementById("my_modal_1").showModal();
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Remover usuário!</h3>
            <p className="py-4">Deseja remover este usuário?</p>
            <div className="modal-action">
              <button
                className="btn btn-success"
                onClick={() => {
                  handleDeleteConfirm(selectedUser.user_id);
                }}
              >
                Confirmar
              </button>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-error">Cancelar</button>
              </form>
            </div>
          </div>
        </dialog>
      </main>
    </>
  );
}
