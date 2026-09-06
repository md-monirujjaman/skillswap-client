import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function DummyCheckout() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get("session_id");
  const proposal_id = searchParams.get("proposal_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardholder, setCardholder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [error, setError] = useState("");
  const paymentStarted = useRef(false);

  useEffect(() => {
    if (!session_id || !proposal_id) {
      navigate("/");
    }
  }, [session_id, proposal_id, navigate]);

  const formatCardNumber = (value: string) => value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const isPaymentReady = cardholder.trim().length > 2 && cardNumber.replace(/\s/g, "").length === 16 && /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry) && /^\d{3,4}$/.test(cvc);

  const handlePay = () => {
    if (!isPaymentReady || paymentStarted.current) return;
    paymentStarted.current = true;
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        // Redirect to standard success page.
        navigate(`/payment/success?session_id=${session_id}&proposal_id=${proposal_id}`);
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    if (isPaymentReady && !loading && !success) {
      const timer = window.setTimeout(handlePay, 500);
      return () => window.clearTimeout(timer);
    }
  }, [isPaymentReady, loading, success]);

  const submitPayment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isPaymentReady) {
      setError("Enter a valid cardholder name, 16-digit card number, MM/YY expiry, and CVC.");
      return;
    }
    handlePay();
  };

  return (
    <div className="max-w-md mx-auto mt-20 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 bg-white dark:bg-gray-900 shadow-sm text-center">
      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Checkout</h2>
      <p className="text-gray-500 mb-8 max-w-xs mx-auto">Demo checkout only. Card details are used locally and never stored.</p>

      {success ? (
        <div className="text-green-600 dark:text-green-400 font-medium animate-in fade-in zoom-in">
          Payment Successful! Redirecting...
        </div>
      ) : (
        <form onSubmit={submitPayment} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Cardholder Name</label>
            <input required disabled={loading} value={cardholder} onChange={e => setCardholder(e.target.value)} autoComplete="cc-name" type="text" placeholder="Alex Morgan" className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white rounded-lg p-3 outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Card Number</label>
            <input required disabled={loading} value={cardNumber} onChange={e => setCardNumber(formatCardNumber(e.target.value))} autoComplete="cc-number" inputMode="numeric" type="text" placeholder="4242 4242 4242 4242" className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white rounded-lg p-3 font-mono text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Expiry</label>
              <input required disabled={loading} value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} autoComplete="cc-exp" inputMode="numeric" type="text" placeholder="12/28" className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white rounded-lg p-3 font-mono text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">CVC</label>
              <input required disabled={loading} value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))} autoComplete="cc-csc" inputMode="numeric" type="password" placeholder="123" className="w-full border border-gray-300 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white rounded-lg p-3 font-mono text-sm outline-none focus:ring-1 focus:ring-black dark:focus:ring-white" />
            </div>
          </div>
          {error && <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>}
          <button disabled={loading} type="submit" className="w-full mt-6 bg-black text-white dark:bg-white dark:text-black py-3 rounded-lg font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-60">
            {loading ? "Processing..." : isPaymentReady ? "Payment details complete" : "Complete payment details"}
          </button>
        </form>
      )}
    </div>
  );
}
