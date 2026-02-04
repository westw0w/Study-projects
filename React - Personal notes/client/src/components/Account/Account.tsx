import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User"
import { queryClient } from "../../api/queryClient";
import { Loader } from "../Loader";
import { AuthForm } from "../AuthForm";
import { NoteList } from "../NoteList/NoteList";

export const Account = () => {
  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);
  switch (meQuery.status) {
    case "pending":
      return <Loader />;

    case "error":
      return <AuthForm />;

    case "success":
      return <NoteList />;
  }
}