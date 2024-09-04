// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { toast } from "sonner";

// interface CartItem {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   stock: number;
//   images: string;
//   status: string;
//   category: string;
//   description: string;
// }

// interface CartState {
//   items: CartItem[];
// }

// const initialState: CartState = {
//   items: [],
// };

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addItemToCart: (state, action: PayloadAction<CartItem>) => {
//       const existingItem = state.items.find(
//         (item) => item._id === action.payload._id
//       );

//       if (existingItem) {
//         const newQuantity = existingItem.quantity + action.payload.quantity;
//         if (newQuantity <= existingItem.stock) {
//           existingItem.quantity = newQuantity;
//           toast.success(`${existingItem.name} quantity updated!`);
//         } else {
//           toast.error(
//             `Cannot add more than available stock of ${existingItem.name}.`
//           );
//         }
//       } else {
//         state.items.push({
//           ...action.payload,
//           quantity: action.payload.quantity,
//         });
//         toast.success(`${action.payload.name} added to cart!`);
//       }
//     },

//     updateCartItemQuantity: (
//       state,
//       action: PayloadAction<{ _id: string; quantity: number }>
//     ) => {
//       const item = state.items.find((item) => item._id === action.payload._id);
//       if (
//         item &&
//         action.payload.quantity >= 1 &&
//         action.payload.quantity <= item.stock
//       ) {
//         item.quantity = action.payload.quantity;
//         toast.success("Quantity updated!");
//       } else if (item) {
//         toast.error("Quantity exceeds stock limits!");
//       }
//     },

//     removeItemFromCart: (state, action: PayloadAction<string>) => {
//       state.items = state.items.filter((item) => item._id !== action.payload);
//       toast.success("Item removed from cart!");
//     },

//     clearCart: (state) => {
//       state.items = [];
//       toast.success("Cart cleared!");
//     },
//   },
// });

// export const {
//   addItemToCart,
//   updateCartItemQuantity,
//   removeItemFromCart,
//   clearCart,
// } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number; // Quantity in the cart
  availableStock: number; // Available stock from the product
  image: string;
  status: string;
  category: string;
  description: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        const newQuantity = existingItem.quantity + action.payload.quantity;
        if (newQuantity <= existingItem.availableStock) {
          existingItem.quantity = newQuantity;
          toast.success(`${existingItem.name} quantity updated!`);
        } else {
          toast.error(
            `Cannot add more than available stock of ${existingItem.name}.`
          );
        }
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
        toast.success(`${action.payload.name} added to cart!`);
      }
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ _id: string; quantity: number }>
    ) => {
      const item = state.items.find((item) => item._id === action.payload._id);
      if (
        item &&
        action.payload.quantity >= 1 &&
        action.payload.quantity <= item.availableStock
      ) {
        item.quantity = action.payload.quantity;
        toast.success("Quantity updated!");
      } else if (item) {
        toast.error("Quantity exceeds stock limits!");
      }
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      toast.success("Item removed from cart!");
    },

    clearCart: (state) => {
      state.items = [];
      toast.success("Cart cleared!");
    },
  },
});

export const {
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
