import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import supabase from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email confirmation...");

  useEffect(() => {
    let isMounted = true;
    let redirectTimer;

    const verifySession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (!isMounted) return;

        if (error) {
          setStatus("error");
          setMessage(error.message || "Unable to verify your email right now.");
          return;
        }

        if (data.session) {
          setStatus("success");
          setMessage("Email confirmed successfully");
          redirectTimer = setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
          return;
        }

        setStatus("error");
        setMessage("No active session found. Please open the latest magic link again.");
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setStatus("error");
        setMessage("Verification failed. Please try the magic link again.");
      }
    };

    verifySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted || !session) return;

      setStatus("success");
      setMessage("Email confirmed successfully");
      clearTimeout(redirectTimer);
      redirectTimer = setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    });

    return () => {
      isMounted = false;
      clearTimeout(redirectTimer);
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5E9E2] px-6">
      <div className="w-full max-w-lg rounded-[32px] border border-[#E8D5C9] bg-white p-10 text-center shadow-xl">
        {status === "loading" && (
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-[#6B412E]" />
        )}
        {status === "success" && (
          <CheckCircle2 className="mx-auto h-12 w-12 text-[#6B412E]" />
        )}
        {status === "error" && (
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
        )}

        <h1 className="mt-6 text-3xl font-bold text-[#1c2537]">
          {status === "loading" && "Confirming Email"}
          {status === "success" && "Success"}
          {status === "error" && "Verification Problem"}
        </h1>

        <p className="mt-4 text-lg text-[#6B4A3A]">{message}</p>

        {status === "success" && (
          <p className="mt-3 text-sm text-[#7A5A46]">
            Redirecting you to the home page...
          </p>
        )}
      </div>
    </div>
  );
}
