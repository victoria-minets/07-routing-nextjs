import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

interface Props {
  params: { slug?: string[] }; // catch-all маршрут
  children?: React.ReactNode; // для @sidebar
}

export default async function NotesPage({ params, children }: Props) {
  const rawTag = params.slug?.[0];
  // Якщо "All" або undefined — не передаємо тег у API
  const tag = rawTag && rawTag !== 'All' ? rawTag : undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes({ page: 1, perPage: 12, search: '', tag }),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tag={tag} />
      </HydrationBoundary>
      {children} {/* Next.js вставляє @sidebar сюди */}
    </>
  );
}
