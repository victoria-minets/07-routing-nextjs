// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { fetchNoteById } from '@/lib/api';
// import { useRouter } from 'next/navigation';
// import Modal from '@/components/Modal/Modal';
// import css from './NotePreview.module.css';

// interface Props {
//   noteId: string;
// }

// export default function NotePreviewClient({ noteId }: Props) {
//   const router = useRouter();

//   // Отримання даних через React Query
//   const {
//     data: note,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['note', noteId],
//     queryFn: () => fetchNoteById(noteId),
//   });

//   // Обробка станів завантаження і помилки
//   if (isLoading) {
//     return (
//       <Modal onClose={() => router.back()}>
//         <p className={css.loading}>Loading note...</p>
//       </Modal>
//     );
//   }

//   if (isError || !note) {
//     return (
//       <Modal onClose={() => router.back()}>
//         <p className={css.error}>Note not found</p>
//       </Modal>
//     );
//   }

//   // Основний вміст модального вікна
//   return (
//     <Modal onClose={() => router.back()}>
//       <div className={css.container}>
//         <header className={css.header}>
//           <h2>{note.title}</h2>
//           <span className={css.date}>
//             {new Date(note.createdAt).toLocaleDateString()}
//           </span>
//         </header>

//         <p className={css.content}>{note.content}</p>
//         <span className={css.tag}>{note.tag}</span>

//         <button className={css.backBtn} onClick={() => router.back()}>
//           Close
//         </button>
//       </div>
//     </Modal>
//   );
// }

'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

interface Props {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: Props) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) {
    return (
      <Modal onClose={() => router.back()}>
        <div className={css.container}>
          <p className={css.loading}>Loading note...</p>
        </div>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={() => router.back()}>
        <div className={css.container}>
          <p className={css.error}>Note not found</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={() => router.back()}>
      <div className={css.container}>
        <div className={css.item}>
          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.date}>
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </header>

          <p className={css.content}>{note.content}</p>

          {note.tag && <span className={css.tag}>{note.tag}</span>}

          <button className={css.backBtn} onClick={() => router.back()}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
