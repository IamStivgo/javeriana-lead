export type Category = "Pregrado" | "Posgrado" | "Educación Continua";

export type Modality = "Presencial" | "Híbrida" | "Virtual";

export interface Program {
  id: number;
  title: string;
  category: Category;
  modality: Modality;
  duration: string;
  startDate: string;        // ISO yyyy-mm-dd
  location: string;
  seats: number;
  seatsLeft: number;
  price: number;            // COP (pesos colombianos)
  rating: number;           // 0-5
  faculty: string;
  summary: string;
  highlights: string[];
}
