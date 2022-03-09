
export type ViewState = {
  sort?: string;
  order?: string;
  type?: string;
  stringCount?: string;
  price_gte?: string;
  price_lte?: string;
  page?: string;
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


export type CommentPost = Omit<Comment, 'createAt' | 'id'>

export type CommentData = Omit<CommentPost, 'guitarId'>

export type GuitarType = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: number;
  rating: number;
  price: number;
};

export type StringType = {
  id: string;
  stringCount: string;
};

export type GuitarsList = GuitarType[];

export type CompleteGuitar = GuitarType & { comments: Comment[] };

export type InCart = {
  [key: string]: number
}

export type TotalPrice = {
  [key: string]: number
}

export type Coupon = {
  value: string | null,
  sale: number,
}

export type Order = {
  guitarsID: number[],
  coupon: null | string
};
