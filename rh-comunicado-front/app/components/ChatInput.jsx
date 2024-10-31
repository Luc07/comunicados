"use client";
import { FaPlus } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";
import { MdInsertDriveFile } from "react-icons/md";
import { useMessageMutate } from "../hooks/useMessages/useMessageMutate";
import { useRef, useEffect, useState } from "react";
import { SendHorizontal, X } from "lucide-react";

export const ChatInput = ({ isLoadingMessages, selectedChat }) => {
  const { mutate } = useMessageMutate();
  const [file, setFile] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const textareaRef = useRef(null);
  const [error, setError] = useState(false); // Estado para verificar erro

  const sendNewMessage = () => {
    if (!newMessage?.trim()) {
      // Verifica se a mensagem está vazia ou com apenas espaços
      setError(true); // Ativa o erro se a mensagem for vazia
      return;
    }

    const data = {
      selectedChat: selectedChat,
      newMessage: newMessage,
      localArquivo: file,
    };
    mutate(data);
    setFile(null);
    setNewMessage(""); // Limpa a mensagem após o envio
    setError(false); // Remove o erro após o envio
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("file: ", selectedFile);

      // Reseta o valor do input para permitir que o mesmo arquivo seja selecionado novamente
      e.target.value = null;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(); // Ajusta a altura no primeiro render e a cada atualização
  }, [newMessage]);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reseta a altura
      textarea.style.height = `${textarea.scrollHeight}px`; // Define a altura com base no conteúdo
    }
  };

  const isImage = () => {
    return file && file.type.startsWith("image/");
  };

  return (
    <div className="mt-3 flex items-end container gap-2 absolute bottom-0 left-0 p-3 bg-blue-100">
      <div className="dropdown dropdown-top">
        <div tabIndex={0} role="button" className="btn btn-circle bg-blue-500">
          <FaPlus color="white" />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <label>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt" // Define os tipos de arquivo aceitos
                onChange={handleFileChange}
              />
              <MdInsertDriveFile size={20} color="#7F66FF" /> Documento
            </label>
          </li>
          <li>
            <label>
              <input
                type="file"
                className="hidden"
                accept="image/*,video/*" // Define os tipos de arquivo aceitos (imagens e vídeos)
                onChange={handleFileChange}
              />
              <IoMdPhotos size={20} color="#007BFC" /> Foto & Vídeo
            </label>
          </li>
        </ul>
      </div>
      {file ? (
        <div className="container flex flex-col">
          <div className="preview-container container justify-between mb-2 flex items-start gap-2 p-2 border border-gray-300 rounded-lg">
            {isImage(file) ? (
              <img
                src={URL.createObjectURL(file)} // Gera uma URL temporária para o preview
                alt="Preview"
                className=" h-auto rounded-lg"
              />
            ) : (
              <div className="flex items-center gap-2">
                <MdInsertDriveFile size={30} color="#7F66FF" />
                <span>{file.name}</span>
              </div>
            )}
            <button
              onClick={() => setFile(null)}
              className="btn btn-sm btn-circle btn-error"
            >
              <X color="white" />
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">
              A mensagem não pode estar vazia
            </p>
          )}
          <textarea
            placeholder="Digite sua mensagem..."
            ref={textareaRef}
            className={`textarea textarea-bordered overflow-hidden container ${
              error ? "border-red-500" : ""
            }`}
            value={newMessage}
            rows={1}
            onChange={(e) => {
              console.log(e.target.value);
              setNewMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendNewMessage();
                setNewMessage("");
              }
            }}
          />
        </div>
      ) : (
        <div className="container flex flex-col">
          {error && (
            <p className="text-red-500 text-sm mt-1">
              A mensagem não pode estar vazia
            </p>
          )}
          <textarea
            placeholder="Digite sua mensagem..."
            ref={textareaRef}
            className={`textarea textarea-bordered overflow-hidden container ${
              error ? "border-red-500" : ""
            }`}
            value={newMessage}
            rows={1}
            onChange={(e) => {
              console.log(e.target.value);
              setNewMessage(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendNewMessage();
                setNewMessage("");
              }
            }}
          />
        </div>
      )}

      {isLoadingMessages ? (
        <button
          className="btn bg-blue-500 text-white"
          onClick={() => {
            sendNewMessage();
            setNewMessage("");
          }}
          disabled
          type="submit"
        >
          Enviar
          <SendHorizontal></SendHorizontal>
        </button>
      ) : (
        <button
          className="btn bg-blue-500 text-white"
          onClick={sendNewMessage}
          type="submit"
        >
          Enviar
          <SendHorizontal></SendHorizontal>
        </button>
      )}
    </div>
  );
};
