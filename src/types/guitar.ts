import { Comment } from './comment';

export type Comments = Comment[];

export type GuitarType = {
  id: string;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number & {'guitar intrinsic property': void};
  rating: number;
  price: number;
  // comments?: Comments;
};

export type GuitarsList = GuitarType[];
