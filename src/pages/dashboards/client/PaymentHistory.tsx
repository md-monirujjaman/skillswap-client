import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Payment } from "../../../types";

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/payments/history")
      .then((res) => setPayments(Array.isArray(res.data) ? res.data : res.data?.payments || []))
      .catch(() => setPayments([]))
      .finally(() => setLoading(false));
  }, []);

  const totalPaid = payments.reduce((total, payment) => total + (Number(payment.amount) || 0), 0);

  return (
    <div>
      <div className="mb-10"><h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Payment History</h2><p className="mt-1.5 text-sm font-medium text-slate-500 dark:text-neutral-400">Review payments made for your completed projects.</p></div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-[#0b101d]/60"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400">Total paid</p><p className="mt-2 text-4xl font-black text-slate-900 dark:text-white">${totalPaid.toLocaleString()}</p></div>
        <div className="rounded-3xl border border-slate-200/60 bg-white p-6 dark:border-slate-800/60 dark:bg-[#0b101d]/60"><p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-neutral-400">Payments</p><p className="mt-2 text-4xl font-black text-[#e10032] dark:text-[#ff4d6d]">{payments.length}</p></div>
      </div>
      {loading ? <div className="py-24 text-center text-sm font-semibold text-slate-500 dark:text-neutral-400">Loading payment history...</div> : payments.length === 0 ? <div className="rounded-3xl border border-dashed border-slate-200 py-20 text-center font-medium text-slate-500 dark:border-slate-800 dark:text-neutral-400">No payments yet.</div> : (
        <div className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-[#0b101d]/60"><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="border-b border-slate-200/60 bg-slate-50/70 dark:border-slate-800/60 dark:bg-slate-900/40"><tr><th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Freelancer</th><th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Amount</th><th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Date</th><th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Status</th></tr></thead><tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">{payments.map((payment) => <tr key={payment._id}><td className="px-6 py-5 font-medium text-slate-700 dark:text-slate-300">{payment.freelancer_email}</td><td className="px-6 py-5 font-black text-[#e10032] dark:text-[#ff4d6d]">${payment.amount}</td><td className="px-6 py-5 text-slate-500 dark:text-neutral-500">{new Date(payment.paid_at).toLocaleDateString()}</td><td className="px-6 py-5 text-right"><span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">{payment.payment_status}</span></td></tr>)}</tbody></table></div></div>
      )}
    </div>
  );
}