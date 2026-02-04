import { LogoutButton } from "../LogoutButton";
import { NoteForm } from "../NoteForm";
import { UserView } from "../UserView";
import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../../api/User";
import { queryClient } from "../../api/queryClient";

import "./NoteList.css";
import { FetchNoteListView } from "../NotesListView/FetchNoteListView";
import { Loader } from "../Loader";

export const NoteList = () => {

  const meQuery = useQuery({
    queryFn: () => fetchMe(),
    queryKey: ["users", "me"],
    retry: 0
  }, queryClient);

  if (meQuery.status !== "success") {
    return <Loader />;
  }

  return (
    <div className="note-list">
      <UserView />
      <NoteForm />
      <FetchNoteListView />
      <LogoutButton />

    </div>
  );
};