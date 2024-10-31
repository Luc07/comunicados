import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const postGroupData = async (data) => {
  const response = await axios.post(API_URL + `api/grupo`, data, {
    headers: {
      Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
    },
  });

  const messageBody = {
    grupoId: response.data.id,
    autorId: getCookieValue("token_user"),
    mensagem: "Grupo criado",
  };
  return await axios.post(API_URL + `api/mensagem`, messageBody, {
    headers: {
      Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
    },
  });
};

export const useGroupsMutate = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation({
    mutationFn: postGroupData,
    onSuccess: () => {
      toast.success("Grupo criado com sucesso");
      queryClient.invalidateQueries(["groups-data"]);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error: Algo inesperado aconteceu!");
    },
  });
  return mutate;
};
