"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Loader2, Mail, X } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function AuthModal({ open, mode, onClose, onLogin, onSwitchMode }) {
  const [step, setStep] = useState("details");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [devOtp, setDevOtp] = useState("");
  const firstOtpRef = useRef(null);

  const isSignUp = mode === "signup";
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const nameValid = !isSignUp || name.trim().length >= 2;
  const canSendOtp = emailValid && nameValid;
  const otpValue = otp.join("");
  const canVerify = otpValue.length === OTP_LENGTH;

  useEffect(() => {
    if (!open) {
      setStep("details");
      setEmail("");
      setName("");
      setOtp(Array(OTP_LENGTH).fill(""));
      setError("");
      setLoading(false);
      setResendIn(0);
      setDevOtp("");
    }
  }, [open, mode]);

  useEffect(() => {
    if (step === "otp" && open) firstOtpRef.current?.focus();
  }, [step, open]);

  useEffect(() => {
    if (resendIn <= 0) return;
    const t = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [resendIn]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const payload = () => ({
    email: email.trim().toLowerCase(),
    purpose: isSignUp ? "register" : "login",
    ...(isSignUp ? { name: name.trim() } : {}),
  });

  const sendOtp = async () => {
    if (!canSendOtp) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send OTP");
      setDevOtp(data.devOtp || "");
      setStep("otp");
      setResendIn(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!canVerify) return;
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload(), otp: otpValue }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Invalid OTP");
      onLogin(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const resendOtp = async () => {
    if (resendIn > 0) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend OTP");
      if (data.devOtp) setDevOtp(data.devOtp);
      setResendIn(RESEND_SECONDS);
      setOtp(Array(OTP_LENGTH).fill(""));
      firstOtpRef.current?.focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-navy/50 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        className="relative w-full max-w-md animate-sheet-up rounded-t-2xl border border-line bg-white shadow-pop sm:animate-scale-in sm:rounded-2xl"
      >
        <div className="relative border-b border-line px-6 py-5">
          <button type="button" onClick={onClose} aria-label="Close" className="icon-btn absolute right-3 top-3">
            <X className="h-5 w-5" />
          </button>
          <span className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-brand-light text-brand">
            <Mail className="h-5 w-5" />
          </span>
          <h2 id="auth-title" className="text-xl font-bold text-ink">
            {step === "otp" ? "Verify Email OTP" : isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {step === "otp"
              ? `Enter the 6-digit code sent to ${email.trim()}`
              : isSignUp
                ? "Create your account with email verification"
                : "Sign in with your email — we'll send an OTP"}
          </p>
        </div>

        <div className="px-6 py-6">
          {step === "details" ? (
            <div className="space-y-4">
              {isSignUp && (
                <Field label="Full name">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                    autoComplete="name"
                  />
                </Field>
              )}

              <Field label="Email address">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </Field>

              {error && <p role="alert" className="animate-fade-in text-sm font-medium text-danger">{error}</p>}

              <button
                type="button"
                onClick={sendOtp}
                disabled={!canSendOtp || loading}
                className="btn btn-primary btn-lg w-full"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Sending OTP..." : isSignUp ? "Get Email OTP" : "Send OTP & Sign In"}
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    ref={i === 0 ? firstOtpRef : null}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="h-12 w-10 rounded-lg border border-line text-center text-lg font-bold text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10 sm:h-14 sm:w-12"
                  />
                ))}
              </div>

              {devOtp && (
                <p className="rounded-lg bg-brand-soft px-3 py-2 text-center text-xs text-brand">
                  Dev OTP: <span className="font-bold tracking-widest">{devOtp}</span>
                </p>
              )}

              {error && <p role="alert" className="animate-fade-in text-center text-sm font-medium text-danger">{error}</p>}

              <button
                type="button"
                onClick={verifyOtp}
                disabled={!canVerify || loading}
                className="btn btn-primary btn-lg w-full"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loading ? "Verifying..." : "Verify & Continue"}
              </button>

              <p className="text-center text-sm text-muted">
                {resendIn > 0 ? (
                  <>Resend OTP in {resendIn}s</>
                ) : (
                  <button
                    type="button"
                    onClick={resendOtp}
                    disabled={loading}
                    className="cursor-pointer font-semibold text-brand transition hover:text-brand-dark"
                  >
                    Resend OTP
                  </button>
                )}
              </p>

              <button
                type="button"
                onClick={() => {
                  setStep("details");
                  setError("");
                  setOtp(Array(OTP_LENGTH).fill(""));
                }}
                className="flex w-full cursor-pointer items-center justify-center gap-1.5 text-sm font-semibold text-muted transition hover:text-brand"
              >
                <ArrowLeft className="h-4 w-4" />
                Change email
              </button>
            </div>
          )}
        </div>

        <div className="border-t border-line px-6 py-4 text-center text-sm text-muted">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => onSwitchMode("signin")}
                className="cursor-pointer font-semibold text-brand transition hover:text-brand-dark"
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              New here?{" "}
              <button
                type="button"
                onClick={() => onSwitchMode("signup")}
                className="cursor-pointer font-semibold text-brand transition hover:text-brand-dark"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const inputClass = "input h-12";

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
    </label>
  );
}
