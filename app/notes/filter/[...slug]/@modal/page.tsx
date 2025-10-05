// ← модальне вікно з деталями нотатки

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import type { Note } from '@/types/note';
import css from './NotePreview.module.css';

export default function NotePreview() {
  const router = useRouter();
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : params.id?.[0];

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchNoteById(id)
      .then((data) => {
        setNote(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || 'Failed to fetch note');
        setLoading(false);
      });
  }, [id]);

  if (!id) return null;

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {note && (
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
              <span className={css.tag}>{note.tag}</span>
            </div>
            <div className={css.content}>{note.content}</div>
            <div className={css.date}>
              Created: {new Date(note.createdAt).toLocaleString()} <br />
              Updated: {new Date(note.updatedAt).toLocaleString()}
            </div>
            <button className={css.backBtn} onClick={() => router.back()}>
              Back
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
