import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { NoteList } from "../../api/Note";
import { FC } from "react";
import { PageSelector } from "../PageSelector/PageSelector";

export interface NoteListViewProps {
  noteList: NoteList;
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}



export const NotesListView: FC<NoteListViewProps> = ({ noteList, pageCount, onPageChange, currentPage }) => {
  const handleNextPage = () => {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="note-list-view">
      <ul className="note-list-view__list">

        {noteList.length > 0 ? (
          noteList.map(note => (
            <li key={note.id}>
              <NoteView note={note} />
            </li>
          ))
        ) : (
          <p className="note-list-view__empty">Заметок пока нет</p>
        )}
      </ul>
      {pageCount > 1 && (
        <PageSelector
          currentPage={currentPage}
          pageCount={pageCount}
          canSelectNext={currentPage < pageCount}
          canSelectPrev={currentPage > 1}
          onNextClick={handleNextPage}
          onPrevClick={handlePrevPage}
        />
      )}
    </div>
  );
};




