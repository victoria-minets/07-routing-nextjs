import axios from 'axios';
import type { Note, CreateNoteRequest } from '../types/note';

// Відповідь від бекенду для списку нотаток
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

// Параметри для запиту нотаток (пошук + пагінація)
interface FetchNotesRequest {
  page?: number;
  perPage?: number;
  search?: string;
}

// Базовий URL та заголовки для всіх запитів
axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Отримати список нотаток (з пагінацією та пошуком)
export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesRequest): Promise<FetchNotesResponse> {
  const { data } = await axios.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return data;
}

// Створити нову нотатку
export async function createNote(data: CreateNoteRequest): Promise<Note> {
  const { data: note } = await axios.post<Note>('/notes', data);
  return note;
}

// Видалити нотатку за ID (повертаємо видалену нотатку)
export async function deleteNote(id: string): Promise<Note> {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
}

// Розкрити нотатку за ID (повертаємо нотатку)
export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
}
