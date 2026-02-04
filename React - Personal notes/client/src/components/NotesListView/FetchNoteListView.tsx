import { useQuery } from "@tanstack/react-query"
import { fetchNoteList } from "../../api/Note"
import { queryClient } from "../../api/queryClient"
import { Loader } from "../Loader";
import { NotesListView } from "./NotesListView";
import { useState } from "react";

export const FetchNoteListView = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const noteListQuery = useQuery({
    queryFn: () => fetchNoteList(currentPage),
    queryKey: ["notes", currentPage],
  }, queryClient);

  switch (noteListQuery.status) {
    case "pending":
      return <Loader />;
    case "success":
      return <NotesListView
        noteList={noteListQuery.data.list}
        pageCount={noteListQuery.data.pageCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />;
    case "error":
      return (
        <div>
          <span>Произошла ошибка</span>
          <button onClick={() => noteListQuery.refetch()}>Повторить</button>
        </div>
      );
  }
}