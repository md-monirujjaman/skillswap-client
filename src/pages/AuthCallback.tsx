import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { checkAuth } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const finishLogin = async () => {
      if (searchParams.get("error")) {
        navigate(`/login?error=${encodeURIComponent(searchParams.get("error") || "Google login failed")}`, { replace: true });
        return;
      }

      const user = await checkAuth();
      if (!active) return;

      if (!user) {
        setError("Google sign-in could not be completed.");
        return;
      }

      if (user.role === "Admin") navigate("/dashboard/admin", { replace: true });
      else if (user.role === "Freelancer") navigate("/dashboard/freelancer", { replace: true });
      else navigate("/dashboard/client", { replace: true });
    };

    finishLogin().catch(() => {
      if (active) setError("Google sign-in could not be completed.");
    });

    return () => {
      active = false;
    };
  }, [checkAuth, navigate, searchParams]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 text-center">
      <div>
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[#e10032] dark:border-slate-800 dark:border-t-[#ff4d6d]" />
        <p className="mt-5 text-sm font-semibold text-slate-600 dark:text-slate-300">
          {error || "Finishing Google sign-in..."}
        </p>
      </div>
    </div>
  );
}
