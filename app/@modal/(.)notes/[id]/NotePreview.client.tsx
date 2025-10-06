'use client';

import Modal from '@/components/Modal/Modal';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

interface Props {
  note: Note;
}

export default function NotePreviewClient({ note }: Props) {
  return (
    <Modal>
      <div className={css.container}>
        <header className={css.header}>
          <h2>{note.title}</h2>
          <span className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </span>
        </header>
        <p className={css.content}>{note.content}</p>
        <span className={css.tag}>{note.tag}</span>
      </div>
    </Modal>
  );
}
