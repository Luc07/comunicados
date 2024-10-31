import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useMessageMutate = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: async ({ selectedChat, newMessage, localArquivo = {} }) => {
      if (localArquivo) {
        const formData = new FormData();
        formData.append("file", localArquivo);
        console.log(formData);
        await axios.post(
          API_URL + `api/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
            },
          }
        );
      } else {
        console.log("n tem arquivo");
      }
      return await axios.post(
        API_URL + `api/mensagem`,
        {
          grupoId: selectedChat,
          autorId: getCookieValue("token_user"),
          mensagem: newMessage,
          localArquivo: localArquivo ? `/${localArquivo.name}` : null,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["groupMessages"]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return mutate;
};
