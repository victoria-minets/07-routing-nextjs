import Link from 'next/link';
import type { NoteTag } from '@/types/note';
import css from './SidebarNotes.module.css';

// Розширюємо тип NoteTag, додаючи "All"
type SidebarTag = 'All' | NoteTag;

export default function SidebarNotes() {
  const tags: SidebarTag[] = [
    'All',
    'Todo',
    'Work',
    'Personal',
    'Meeting',
    'Shopping',
  ];

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={tag === 'All' ? '/notes/filter' : `/notes/filter/${tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
