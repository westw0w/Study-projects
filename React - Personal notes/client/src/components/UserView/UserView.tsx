import "./UserView.css";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";
import { queryClient } from "../../api/queryClient";

export const UserView = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  if (meQuery.status !== "success") {
    return null;
  }

  const username = meQuery.data.username;

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
