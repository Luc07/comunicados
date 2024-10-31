import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookieValue } from "../../util/getCookieValue";
import { API_URL } from "../../util/apiUrl";

const fetchGroupsData = async () => {
  const response = await axios.get(
    API_URL + `api/grupo/ultimas-mensagens/${getCookieValue("token_user")}`,
    {
      headers: {
        Authorization: `Bearer ${getCookieValue("token_comunicados")}`,
      },
    }
  );
  return response.data;
};
export const useGroupsData = () => {
  const query = useQuery({
    queryFn: fetchGroupsData,
    queryKey: ["groups-data"],
    retry: false,
  });
  return query;
};
