import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useAddUserMutation = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({ selectedChat, userId }) => {
      console.log(selectedChat, userId)
      return await axios.post(
        API_URL + `api/grupo/${selectedChat}/addUser/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Usuário adicionado com sucesso");
      queryClient.invalidateQueries(["users-data"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error ao adicionar usuário: Algo inesperado aconteceu!");
    },
  });
  return mutate;
};
