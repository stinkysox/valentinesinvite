export interface Coordinate {
  x: number;
  y: number;
  id: number;
}

export interface PhotoData {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}

export interface CandleData {
  id: number;
  lit: boolean;
  x: string; // Tailwind class or percentage
  delay: number;
}