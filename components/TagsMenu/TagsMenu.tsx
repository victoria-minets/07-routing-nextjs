'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NoteTag } from '@/types/note';
import css from './TagsMenu.module.css';

// Розширюємо NoteTag, додаючи "All"
const tags: ('All' | NoteTag)[] = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button
        className={css.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link
                href={`/notes/filter/${tag}`}
                className={css.menuLink}
                onClick={() => setIsOpen(false)}
              >
                {tag === 'All' ? 'All notes' : tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import type { NoteTag } from '@/types/note';
// import css from './TagsMenu.module.css';

// type Props = {
//   tags: NoteTag[];
// };

// const TagsMenu = ({ tags }: Props) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);

//   // Додаємо 'All' як перший елемент
//   const allTags: ('All' | NoteTag)[] = ['All', ...tags];

//   return (
//     <div className={css.menuContainer}>
//       <button
//         className={css.menuButton}
//         onClick={toggle}
//         aria-haspopup="true"
//         aria-expanded={isOpen}
//       >
//         Notes ▾
//       </button>

//       {isOpen && (
//         <ul className={css.menuList}>
//           {allTags.map((tag) => (
//             <li key={tag} className={css.menuItem}>
//               <Link
//                 href={`/notes/filter/${tag.toLowerCase()}`}
//                 className={css.menuLink}
//                 onClick={toggle}
//               >
//                 {tag === 'All' ? 'All notes' : tag}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default TagsMenu;

<div className={css.menuContainer}>
  <button className={css.menuButton}>Notes ▾</button>
  <ul className={css.menuList}>
    {/* список тегів */}
    <li className={css.menuItem}>
      <a href={`url до сторінки за відповідним тегом`} className={css.menuLink}>
        Назва тегу
      </a>
    </li>
  </ul>
</div>;
