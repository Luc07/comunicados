import { API_URL } from "@/app/util/apiUrl";
import { getCookieValue } from "@/app/util/getCookieValue";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUsersData = () => {
  return useQuery({
    queryFn: async () => {
      const response = await axios.get(API_URL + `api/userAuth`, {
        headers: {
          Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
        },
      });
      return response.data;
    },

    queryKey: ["users"],
  });
};
