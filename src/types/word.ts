import type { Phrase } from "./phrase";

export interface Word {
  id: string;
  english: string;
  portuguese: string;
  phrases: Phrase[]; 
  imageUrl: string;
  audioUrl: string;
  categoryIds?: string[];
  userId: string
}
