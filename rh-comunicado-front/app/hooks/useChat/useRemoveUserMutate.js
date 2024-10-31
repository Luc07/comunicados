import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useRemoveUserMutation = () => {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationFn: async ({ selectedChat, userId }) => {
      return await axios.delete(
        API_URL + `api/grupo/${selectedChat}/removeUser/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Usuário removido com sucesso");
      queryClient.invalidateQueries(["groups-data"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error ao remover usuário: Algo inesperado aconteceu!");
    },
  });
  return mutate;
};
