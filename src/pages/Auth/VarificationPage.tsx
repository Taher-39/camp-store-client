// import { useVerifyCodeMutation } from "@/redux/features/Auth/authApi";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const VerificationPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const email = new URLSearchParams(location.search).get("email") || "";
//   const [code, setCode] = useState("");
//   const [verifyCode] = useVerifyCodeMutation();

//   const handleVerify = async () => {
//     const toastID = toast.loading("Verifying code...");
//     try {
//       const res = await verifyCode({ email, code }).unwrap();
//       console.log(res);
//       toast.success("Verification successful!", { id: toastID });
//       navigate("/login");
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Verification failed", { id: toastID });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <div className="w-full max-w-md bg-white p-8 rounded shadow">
//         <h2 className="text-2xl font-bold text-center mb-6">Email Verification</h2>
//         <p className="mb-4 text-center text-sm text-gray-600">Please enter the verification code sent to <strong>{email}</strong></p>
//         <input
//           type="text"
//           value={code}
//           onChange={(e) => setCode(e.target.value)}
//           placeholder="Verification Code"
//           className="w-full p-3 border border-gray-300 rounded-md mb-4"
//         />
//         <button onClick={handleVerify} className="w-full bg-[#9EA647] text-white py-3 rounded-lg hover:bg-[#8d973f]">
//           Verify Code
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerificationPage;

import { useVerifyCodeMutation, useResendCodeMutation } from "@/redux/features/Auth/authApi";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VerificationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = new URLSearchParams(location.search).get("email") || "";
  const [code, setCode] = useState("");

  const [verifyCode] = useVerifyCodeMutation();
  const [resendCode] = useResendCodeMutation();

  const [cooldown, setCooldown] = useState(120); // seconds (2 minutes)
  const [isCooldown, setIsCooldown] = useState(true);

  // Countdown timer
  useEffect(() => {
    if (!isCooldown) return;

    const interval = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isCooldown]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleVerify = async () => {
    const toastID = toast.loading("Verifying code...");
    try {
      await verifyCode({ email, code }).unwrap();
      toast.success("Verification successful!", { id: toastID });
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Verification failed", { id: toastID });
    }
  };

  const handleResend = async () => {
    const toastID = toast.loading("Resending code...");
    try {
      await resendCode({ email }).unwrap();
      toast.success("Code resent successfully", { id: toastID });
      setIsCooldown(true);
      setCooldown(120);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to resend code", { id: toastID });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Email Verification</h2>
        <p className="mb-4 text-center text-sm text-gray-600">
          Please enter the verification code sent to <strong>{email}</strong>
        </p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Verification Code"
          className="w-full p-3 border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleVerify}
          className="w-full bg-[#9EA647] text-white py-3 rounded-lg hover:bg-[#8d973f]"
        >
          Verify Code
        </button>

        {/* Resend Button */}
        <div className="mt-4 text-center">
          {isCooldown ? (
            <p className="text-sm text-gray-500">
              Resend available in <span className="font-semibold">{formatTime(cooldown)}</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
