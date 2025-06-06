import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "@/redux/features/Auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/Auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { toast } from "sonner";
import { TUser } from "@/types";
import Shop_Auth_Image from "@/assets/SHOP_AUTH_LOGO.png";

const loginSchema = yup.object({
  email: yup.string().email("Invalid email address").required("Email is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });



  const onSubmit = async (data: any) => {
    const toastID = toast.loading("Logging in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login Successfully", { id: toastID });
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed", { id: toastID });
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
          <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                {...register("email")}
                placeholder="Email Address"
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

            <button
              type="submit"
              className="w-full bg-[#9EA647] text-white py-3 rounded-lg hover:bg-[#8d973f] transition-colors font-medium"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-800">
              New user?{" "}
              <Link to="/register" className="text-[#9EA647] hover:underline font-medium">
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;