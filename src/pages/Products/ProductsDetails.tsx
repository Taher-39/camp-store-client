// import { useState } from "react";
// import { useParams } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { addToCart } from "../store/cartSlice"; // Assuming you have a cartSlice setup

// const ProductDetailsPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const productId = Number(id);
//   // const product = useSelector((state) =>
//   //   state.products.find((product) => product.id === productId)
//   // );

//   // const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     // dispatch(addToCart({ ...product, quantity }));
//   };

//   // if (!product) {
//   //   return <div>Product not found</div>;
//   // }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full h-auto object-cover rounded-md"
//         />
//         <div>
//           <h2 className="text-2xl font-bold">{product.name}</h2>
//           <p className="text-xl text-gray-500 my-2">${product.price}</p>
//           <p className="text-sm text-gray-700 my-4">{product.description}</p>
//           <p className="text-sm text-gray-600 my-2">
//             Category: {product.category}
//           </p>
//           <p className="text-sm text-gray-600 my-2">
//             Stock: {product.stock || 10} units
//           </p>
//           <p className="text-sm text-gray-600 my-2">
//             Rating: {product.rating || 4.5} / 5
//           </p>

//           <div className="my-4">
//             <label htmlFor="quantity" className="block text-sm text-gray-700">
//               Quantity:
//             </label>
//             <input
//               id="quantity"
//               type="number"
//               value={quantity}
//               onChange={(e) => setQuantity(Number(e.target.value))}
//               min="1"
//               max={product.stock || 10}
//               className="border border-gray-300 p-2 rounded-md w-full max-w-xs"
//             />
//           </div>

//           <button
//             onClick={handleAddToCart}
//             disabled={quantity > (product.stock || 10)}
//             className={`mt-4 px-4 py-2 rounded-md text-white ${
//               quantity > (product.stock || 10)
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-[#9EA647] hover:bg-[#3712c2]"
//             }`}
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;
