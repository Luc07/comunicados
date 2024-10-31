import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";

export const useGroupUsersData = (selectedChat) => {
  return useQuery({
    queryKey: ["groupUsers", selectedChat], // Query key includes selectedChat
    queryFn: async () => {
      if (!selectedChat) return null;
      const response = await axios.get(
        API_URL + `api/grupo/${selectedChat}/usuarios`,
        {
          headers: {
            Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
          },
        }
      );
      return response.data;
    },
    enabled: !!selectedChat,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
