export interface Word {
  id: string;
  english: string;
  portuguese: string;
  phrases: string[]; // - [ ] converter para um objeto
  imageUrl: string;
  audioUrl: string;
  categoryIds?: string[];
  userId: string
}
