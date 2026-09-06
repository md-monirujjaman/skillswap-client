import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import api from "@/lib/api";
import { Task } from "../../../types";

export default function ClientProposals() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/tasks/manage")
      .then((res) => {
        const payload = res.data?.data || res.data || [];
        const taskList = Array.isArray(payload) ? payload : payload.tasks;
        setTasks(Array.isArray(taskList) ? taskList : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Proposals</h2>
        <p className="mt-1.5 text-sm font-medium text-slate-500 dark:text-neutral-400">Choose a task to review freelancer applications.</p>
      </div>

      {loading ? (
        <div className="py-24 text-center text-sm font-semibold text-slate-500 dark:text-neutral-400">Loading your tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 py-20 text-center font-medium text-slate-500 dark:border-slate-800 dark:text-neutral-400">
          Post a task to start receiving proposals.
        </div>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="flex flex-col gap-5 rounded-3xl border border-slate-200/60 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#e10032]/30 hover:shadow-[0_12px_35px_rgba(225,0,50,0.08)] dark:border-slate-800/60 dark:bg-[#0b101d]/60 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-[#e10032]/8 p-3 text-[#e10032] dark:bg-[#e10032]/10 dark:text-[#ff4d6d]"><BriefcaseBusiness className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white">{task.title}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">{task.category} · {task.status}</p>
                </div>
              </div>
              <Link to={`/dashboard/client/tasks/${task._id}/proposals`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e10032] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#c7002a]">
                Review Proposals <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
