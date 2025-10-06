// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import { fetchNoteById } from '@/lib/api';
// import type { Note } from '@/types/note';
// import css from './NotePreview.module.css';

// export default function NotePreview() {
//   const router = useRouter();
//   const params = useParams();

//   // Витягуємо id нотатки з catch-all або string
//   const id = typeof params.id === 'string' ? params.id : params.id?.[0];

//   const [note, setNote] = useState<Note | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id) return;

//     setIsLoading(true);
//     fetchNoteById(id)
//       .then((data) => setNote(data))
//       .catch((err) => setError((err as Error).message))
//       .finally(() => setIsLoading(false));
//   }, [id]);

//   if (!id) return null;

//   return (
//     <Modal onClose={() => router.back()}>
//       <div className={css.container}>
//         {isLoading && <p>Loading note...</p>}
//         {error && <p>Error: {error}</p>}
//         {note && (
//           <div className={css.item}>
//             <header className={css.header}>
//               <h2>{note.title}</h2>
//               <span className={css.date}>
//                 {new Date(note.createdAt).toLocaleDateString()}
//               </span>
//             </header>
//             <p className={css.content}>{note.content}</p>
//             <span className={css.tag}>{note.tag}</span>
//             <button className={css.backBtn} onClick={() => router.back()}>
//               Back
//             </button>
//           </div>
//         )}
//       </div>
//     </Modal>
//   );
// }

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import css from './NotePreview.module.css';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: Props) {
  const { id } = await params;
  const note = await fetchNoteById(id);

  if (!note) {
    return (
      <Modal>
        <p className={css.error}>Note not found</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <div className={css.container}>
        <div className={css.item}>
          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </header>
          <p className={css.content}>{note.content}</p>
          <span className={css.tag}>{note.tag}</span>
        </div>
      </div>
    </Modal>
  );
}
