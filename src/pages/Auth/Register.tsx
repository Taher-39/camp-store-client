// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRegisterMutation } from "@/redux/features/Auth/authApi";
// import { toast } from "sonner";
// import Shop_Auth_Image from "@/assets/SHOP_AUTH_LOGO.png";

// const registerSchema = yup.object({
//   name: yup.string(),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup.string().min(4, "Password too short").required("Password is required"),
//   confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
// });

// const Register = () => {
//   const navigate = useNavigate();
//   const [registerMutation] = useRegisterMutation();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(registerSchema),
//   });

//   const onSubmit = async (data: any) => {
//     const toastID = toast.loading("Registering");
//     try {
//       const { name, email, password } = data;
//       const res = await registerMutation({ name, email, password }).unwrap();
//       if (res.data.status === "active") navigate("/login");
//       toast.success("Registered Successfully", { id: toastID });
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Registration failed", { id: toastID });
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
//       <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
//         {/* Image Section */}
//         <div className="md:w-1/2 p-8 flex justify-center bg-gray-100">
//           <img
//             src={Shop_Auth_Image}
//             alt="Shop Auth"
//             className="max-h-[80vh] object-contain"
//           />
//         </div>

//         {/* Form Section */}
//         <div className="md:w-1/2 p-8">
//           <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">Sign Up</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <input
//                 {...register("name")}
//                 placeholder="Name (Optional)"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
//               />
//             </div>

//             <div>
//               <input
//                 {...register("email")}
//                 placeholder="Email"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
//               />
//               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
//             </div>

//             <div>
//               <input
//                 type="password"
//                 {...register("password")}
//                 placeholder="Password"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
//               />
//               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
//             </div>

//             <div>
//               <input
//                 type="password"
//                 {...register("confirmPassword")}
//                 placeholder="Confirm Password"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
//               />
//               {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
//             </div>

//             <div className="flex items-start space-x-2">
//               <input
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 mt-1 accent-[#9EA647]"
//               />
//               <span className="text-sm text-gray-800">
//                 I agree to the <Link to="/terms" className="text-[#9EA647] hover:underline">Terms & Conditions</Link>
//               </span>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#9EA647] text-white py-3 rounded-lg hover:bg-[#8d973f] transition-colors font-medium"
//             >
//               Sign Up
//             </button>

//             <p className="text-center text-sm text-gray-800">
//               Already have an account?{" "}
//               <Link to="/login" className="text-[#9EA647] hover:underline font-medium">
//                 Login
//               </Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRegisterMutation } from "@/redux/features/Auth/authApi";
import { toast } from "sonner";
import Shop_Auth_Image from "@/assets/SHOP_AUTH_LOGO.png";

const registerSchema = yup.object({
  name: yup.string(),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(4, "Password too short").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();
  const [registerMutation] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    const toastID = toast.loading("Registering");
    try {
      const { name, email, password } = data;
      await registerMutation({ name, email, password }).unwrap();
      toast.success("Registered Successfully. Please check your email for verification code.", { id: toastID });
      navigate(`/verify?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed", { id: toastID });
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="md:w-1/2 p-8 flex justify-center bg-gray-100">
          <img
            src={Shop_Auth_Image}
            alt="Shop Auth"
            className="max-h-[80vh] object-contain"
          />
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                {...register("name")}
                placeholder="Name (Optional)"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
              />
            </div>

            <div>
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9EA647]"
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                required
                className="h-4 w-4 mt-1 accent-[#9EA647]"
              />
              <span className="text-sm text-gray-800">
                I agree to the <Link to="/terms" className="text-[#9EA647] hover:underline">Terms & Conditions</Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#9EA647] text-white py-3 rounded-lg hover:bg-[#8d973f] transition-colors font-medium"
            >
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-800">
              Already have an account?{" "}
              <Link to="/login" className="text-[#9EA647] hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
