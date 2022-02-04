

export type Type = {
  acoustic?: string;
  electric?: string;
  ukulele?: string;
}

export type ViewState = {
  sort?: string;
  order?: string;
  type?: string;
  stringCount?: string;
  price_gte?: string;
  price_lte?: string;
  page?: string;
}

export type StringCount = {
  fourStrings?: string;
  sixStrings?: string;
  sevenStrings?: string;
  twelveStrings?: string;
}

export type Comment = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

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
};

export type StringType = {
  id: string;
  stringCount: string;
};

export type GuitarsList = GuitarType[];

export type CompleteGuitar = GuitarType & { comments: Comment[] };
