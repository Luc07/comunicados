import { useContext, useRef, useEffect, useState } from "react";
import { ChatContext } from "../home/page";
import date from "date-and-time";
import { useGroupUsersData } from "../hooks/useChat/useGroupUsersData";
import Avatar from "./Avatar";
import ChatInfoModal from "./ChatInfoModal";
import { useMessagesData } from "../hooks/useMessages/useMessagesData";
import { LockKeyhole } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { MdInsertDriveFile } from "react-icons/md";
import { useViewMessageMutate } from "../hooks/useMessages/useViewMessageMutate";
import { API_URL } from "../util/apiUrl";

export const Chat = () => {
  const { selectedChat, myUser } = useContext(ChatContext);
  const [viewers, setViewers] = useState(null);
  const { data: groupUsersData, isLoading } = useGroupUsersData(selectedChat);
  const { data: groupMessagesData, isLoading: isLoadingMessages } =
    useMessagesData(selectedChat);

  const { mutate: viewMessage } = useViewMessageMutate();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    if (!isLoading && groupMessagesData?.length > 0) {
      scrollToBottom();
    }
  }, [groupMessagesData, isLoading]);

  const isMessageViewedByCurrentUser = (msg) => {
    return msg.visualizacoes?.some(
      (viewer) => viewer.user_id === myUser.user_id
    );
  };

  const handleViewMessage = (messageId) => {
    viewMessage({ userId: myUser.user_id, messageId });
  };

  return (
    <>
      <form
        className="overflow-hidden flex flex-col w-1/2 border border-slate-200 relative bg-blue-100 rounded-lg"
        id="chatArea"
        onSubmit={(event) => event.preventDefault()}
      >
        {selectedChat ? (
          <>
            {isLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <>
                <div className="container bg-white flex flex-wrap md:flex-nowrap gap-1 p-4 shadow">
                  <Avatar
                    size={"60"}
                    name={groupMessagesData[0]?.grupo.nome}
                  ></Avatar>
                  <div className="flex-grow min-w-0">
                    <h1 className="text-lg font-semibold truncate">
                      {groupMessagesData[0]?.grupo.nome}
                    </h1>
                    <ul className="flex overflow-hidden gap-2 whitespace-nowrap text-ellipsis max-w-full">
                      {groupUsersData?.map((user, index) => (
                        <li key={index} className="text-sm text-gray-400 block">
                          ~{user.name.split(" ")[0]}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("chatInfo").showModal()
                    }
                  >
                    ver mais
                  </button>
                </div>

                <ul className="flex-grow overflow-y-auto p-9 mb-10">
                  {groupMessagesData.map((msg, index) => {
                    const filePath = msg.localArquivo
                      ? `${API_URL}/files${msg.localArquivo}`
                      : null;

                    const isImage =
                      filePath &&
                      (filePath.endsWith(".png") ||
                        filePath.endsWith(".jpg") ||
                        filePath.endsWith(".jpeg") ||
                        filePath.endsWith(".gif"));

                    const isViewed = isMessageViewedByCurrentUser(msg); // Verifica se a mensagem já foi visualizada

                    return (
                      <>
                        <li
                          key={msg.id}
                          className={`container p-2 shadow rounded-lg break-all ${
                            msg.autor.user_id === "Você"
                              ? "bg-blue-200 self-end"
                              : "bg-white self-start"
                          }`}
                        >
                          <p className="font-semibold">{msg.autor.name}</p>

                          {filePath ? (
                            isImage ? (
                              <>
                                <p style={{ whiteSpace: "pre-wrap" }}>
                                  {msg.conteudo}
                                </p>
                                <a
                                  href={filePath}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <img
                                    src={filePath}
                                    alt="imagem"
                                    className="max-w-full h-auto mt-2 cursor-pointer rounded-3xl border-2 border-gray-300"
                                  />
                                </a>
                              </>
                            ) : (
                              <>
                                <p style={{ whiteSpace: "pre-wrap" }}>
                                  {msg.conteudo}
                                </p>
                                <a
                                  href={filePath}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <div className="flex items-center gap-2 border p-2 bg-gray-100 rounded cursor-pointer">
                                    <MdInsertDriveFile
                                      size={24}
                                      color="#7F66FF"
                                    />
                                    <span>
                                      {msg.localArquivo.split("/").pop()}
                                    </span>
                                  </div>
                                </a>
                              </>
                            )
                          ) : (
                            <p style={{ whiteSpace: "pre-wrap" }}>
                              {msg.conteudo}
                            </p>
                          )}

                          <span className="text-xs text-gray-400">
                            {date.format(
                              new Date(msg?.dataEnvio),
                              "DD/MM/YYYY [às] HH:mm"
                            )}
                          </span>
                        </li>

                        {/* Botão para marcar como visualizada */}

                        {isViewed ? (
                          <div
                            className="tooltip-top"
                            data-tip={msg.visualizacoes
                              .map((viewer) => viewer.name)
                              .join(", ")}
                          >
                            <button
                              className={`btn btn-xs mb-2 text-white bg-blue-500 cursor-not-allowed`}
                              onClick={() => {
                                document
                                  .getElementById("viewUsersModal")
                                  .showModal();
                                setViewers(msg.visualizacoes);
                                console.log(viewers);
                              }}
                            >
                              ✌️ Visualizado
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleViewMessage(msg.id)}
                            className={`btn btn-xs mb-4 text-white bg-green-500`}
                          >
                            👍 Visualizar
                          </button>
                        )}
                      </>
                    );
                  })}

                  <div ref={messagesEndRef}></div>
                </ul>

                {myUser.department_id == 5 || myUser.department_id == 1 ? (
                  <ChatInput
                    isLoadingMessages={isLoadingMessages}
                    selectedChat={selectedChat}
                  />
                ) : (
                  ""
                )}
              </>
            )}
          </>
        ) : myUser.department_id == 5 || myUser.department_id == 1 ? (
          <button
            className="my-auto block border-2 h-full text-2xl font-semibold border-blue-800 border-dashed text-blue-800"
            onClick={() => {
              document.getElementById("newGroup").showModal();
            }}
          >
            Criar Grupo
          </button>
        ) : (
          <button
            className="btn border-2 h-full text-2xl font-semibold border-blue-800 border-dashed text-blue-800"
            onClick={() => {
              document.getElementById("newGroup").showModal();
            }}
            disabled
          >
            <LockKeyhole></LockKeyhole> Selecione um Chat
          </button>
        )}
      </form>

      <ChatInfoModal
        users={groupUsersData}
        selectedChat={selectedChat}
      ></ChatInfoModal>
      <dialog id="viewUsersModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Visualizador por: </h3>
          {viewers?.map((viewer) => (
            <li
              key={viewer.user_id}
              className="container flex p-2 items-center justify-start gap-2 border border-b-gray-300 join-item"
            >
              <Avatar name={viewer.name} />
              <p className="break-all w-full">{viewer.name}</p>
            </li>
          ))}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Fechar</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
