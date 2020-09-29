import { Token } from 'react-stripe-checkout';

//Declare  Enum
export enum DialogType {
  SignIn = 'signIn',
  SignUp = 'signUp',
}

export enum DatabaseType {
  sections = 'sections',
  inventory = 'inventory',
}

//------------------------------------>

// Declare a product

export type Product = {
  name: string;
  imageUrl: string;
  price: number;
  quantity?: number | any;
  createdAt?: Date;
  _id?: string;
  category?: string;
};

export type NewProduct = {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
  createdAt: Date;
  quantity?: number | any;
};

export type ProductCategory = {
  id?: number;
  title: string;
  routeName: string;
  items: Product[];
  key?: string;
};

//------------------------------------>
// Declare a sections
export type Section = {
  title: string;
  imageUrl: string;
  id: number;
  size?: string;
  linkUrl?: string;
};
//------------------------------------>
// Declare shop data
export type ProductData = {
  [name: string]: ProductCategory;
};

//------------------------------------>

//declare user type
export type User = {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
export type UpdatedUser = {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  userId?: string;
  authCheck?: string;
  photo: string | Blob;
};

export type UpdatedPassword = {
  oldPassword: string;
  newPassword: string;
  email?: string;
  userId?: string;
  authCheck?: string;
};

export type PaymentRequest = {
  token: Token;
  amount: number;
  userId?: string;
  authCheck?: string;
};

//------------------------------------>
export type NewUser = {
  username: string | undefined;
  firstname: string;
  lastname: string;
  email: string;
  photo?: string;
  googleId?: number;
  _id?: string;
  isBanned?: boolean;
  createdAt?: any;
  role?: string;
  emailConfirmed?: boolean;
};

//------------------------------------>

export type Admin = {
  requestType?: DatabaseType;
  adminId?: string;
  modifyId?: string;
  userId?: string;
  sections?: Section[];
  inventory?: ProductCategory[];
  product?: Product | null;
};

//------------------------------------>
//Individual States
export type CartState = {
  hidden: boolean;
  cartItems: Product[];
};
//------------------------------------>

//------------------------------------>
export type ProductState = {
  adminEdit: null | Product;
  sections: Section[];
  shopData: ProductData;
  adminProductData: NewProduct[];
  filteredProducts: NewProduct[];
  notification: null | string;
};
//------------------------------------>
// Using dynamic keys from an enum
export type UiState = {
  dialogOpen: {
    [key in DialogType]?: boolean;
  };
  toggleSignUp: boolean;
  verifiedAdmin: boolean;
  highlightName: string | undefined;
  adminView: boolean;
};
//------------------------------------>
export type UserState = {
  notification: null | string;
  isLoading: boolean;
  currentUser: null | NewUser | undefined;
  token: string | undefined;
  sessionExp: number | undefined;
  error: string | null | {};
  toggleNotifications: boolean;
  adminModification: null | NewUser;
  adminUsers: NewUser[];
  filteredUsers: NewUser[];
};
//------------------------------------>
//entire state
export type AppState = {
  cart: CartState;
  product: ProductState;
  ui: UiState;
  user: UserState;
};

//------------------------------------>
