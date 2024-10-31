import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useMessagesData = (selectedChat) => {
  return useQuery({
    queryFn: async () => {
      if (!selectedChat) return null;
      const response = await axios.get(
        API_URL + `api/grupo/${selectedChat}/mensagens`,
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
          },
        }
      );
      return response.data;
    },
    queryKey: ["groupMessages", selectedChat],
    enabled: !!selectedChat, // Evita que a query seja executada se `selectedChat` for undefined
  });
};
