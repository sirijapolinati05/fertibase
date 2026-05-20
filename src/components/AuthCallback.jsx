import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import supabase from "../lib/supabaseClient";
import { useTranslation } from "../i18n/useTranslation";

export default function AuthCallback() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
          setMessage(
            error.message ||
              t(
                "auth_unable_to_verify_email",
                "Unable to verify your email right now."
              )
          );
          return;
        }

        if (data.session) {
          setStatus("success");
          setMessage(
            t(
              "auth_email_confirmed_successfully",
              "Email confirmed successfully"
            )
          );
          redirectTimer = setTimeout(() => {
            navigate("/", { replace: true });
          }, 2000);
          return;
        }

        setStatus("error");
        setMessage(
          t(
            "auth_no_active_session",
            "No active session found. Please open the latest magic link again."
          )
        );
      } catch (err) {
        console.error(err);
        if (!isMounted) return;
        setStatus("error");
        setMessage(
          t(
            "auth_verification_failed",
            "Verification failed. Please try the magic link again."
          )
        );
      }
    };

    verifySession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted || !session) return;

      setStatus("success");
      setMessage(
        t(
          "auth_email_confirmed_successfully",
          "Email confirmed successfully"
        )
      );
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
  }, [navigate, t]);

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
          {status === "loading" &&
            t("auth_confirming_email", "Confirming Email")}
          {status === "success" && t("auth_success", "Success")}
          {status === "error" &&
            t(
              "auth_verification_problem",
              "Verification Problem"
            )}
        </h1>

        <p className="mt-4 text-lg text-[#6B4A3A]">{message}</p>

        {status === "success" && (
          <p className="mt-3 text-sm text-[#7A5A46]">
            {t(
              "auth_redirecting_home",
              "Redirecting you to the home page..."
            )}
          </p>
        )}
      </div>
    </div>
  );
}
