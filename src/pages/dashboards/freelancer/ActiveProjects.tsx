import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Star } from "lucide-react";

export default function ActiveProjects() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [deliverableUrl, setDeliverableUrl] = useState("");

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [revieweeEmail, setRevieweeEmail] = useState("");

  useEffect(() => {
    api.get("/api/tasks/assigned").then(res => {
      setTasks(res.data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const openModal = (id: string) => {
    setActiveTaskId(id);
    setIsModalOpen(true);
    setDeliverableUrl("");
  };

  const openReviewModal = (taskId: string, clientEmail: string) => {
    setActiveTaskId(taskId);
    setRevieweeEmail(clientEmail);
    setReviewRating(5);
    setReviewComment("");
    setIsReviewOpen(true);
  };

  const handleSubmitDeliverable = async () => {
    if (!deliverableUrl || !activeTaskId) return;
    try {
      await api.post(`/api/actions/tasks/${activeTaskId}/deliver`, { deliverable_url: deliverableUrl });
      setTasks(prev => prev.map(t => t._id === activeTaskId ? { ...t, status: 'Completed', deliverable_url: deliverableUrl } : t));
      setIsModalOpen(false);
    } catch (e) {
      alert("Error submitting deliverable.");
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewComment || !activeTaskId) return;
    try {
      await api.post(`/api/actions/tasks/${activeTaskId}/review`, { 
        reviewee_email: revieweeEmail,
        rating: reviewRating,
        comment: reviewComment 
      });
      alert("Review submitted successfully!");
      setIsReviewOpen(false);
    } catch (e: any) {
      alert(e.response?.data?.error || "Error submitting review.");
    }
  };

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading projects...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Active & Completed Projects</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Manage your ongoing work and submit final deliverables.</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          No active projects right now.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl bg-white dark:bg-[#0b101d]/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_12px_35px_rgba(225,0,50,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.45)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    task.status === 'Completed' ? 'text-emerald-500' :
                    task.status === 'In Progress' ? 'text-blue-500' :
                    'text-slate-500 dark:text-neutral-400'
                  }`}>
                    • {task.status}
                  </span>
                </div>
                
                <h3 className="font-extrabold text-xl text-slate-900 dark:text-white leading-tight mb-2 tracking-tight group-hover:text-[#e10032] dark:group-hover:text-[#ff4d6d] transition-colors">{task.title}</h3>
                
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-neutral-400">
                  <span>Client: <strong className="text-slate-700 dark:text-neutral-300">{task.client_email}</strong></span>
                </div>
                
                {task.deliverable_url && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Deliverable:</span>
                    <a href={task.deliverable_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#e10032] dark:text-[#ff4d6d] hover:underline">
                      View Work Submitted
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 relative z-10 w-full md:w-auto">
                {task.status === 'In Progress' && (
                  <button onClick={() => openModal(task._id)} className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-[#e10032] to-[#ff4d6d] text-white hover:from-[#c2002b] hover:to-[#e10032] rounded-xl shadow-md shadow-[#e10032]/20 text-xs font-bold uppercase tracking-wider transition-all">
                    Submit Deliverable
                  </button>
                )}
                {task.status === 'Completed' && (
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    <span className="flex-1 md:flex-none flex items-center justify-center px-6 py-3 bg-emerald-50 text-emerald-600 border border-emerald-200/50 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 rounded-xl text-xs font-bold uppercase tracking-wider">Completed</span>
                    <button onClick={() => openReviewModal(task._id, task.client_email)} className="flex-1 md:flex-none px-6 py-3 bg-red-50 text-[#e10032] border border-red-200/50 dark:bg-red-950/20 dark:text-[#ff4d6d] dark:border-red-900/30 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
                      Review Client
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white dark:bg-[#0b101d] rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800 w-full max-w-md p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e10032] to-[#ff4d6d]" />
            <h3 className="text-2xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">Submit Deliverable</h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mb-8 font-medium">Provide a link to your completed work (e.g., Google Docs, GitHub, Figma, Dropbox).</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Work URL</label>
                <input 
                  type="url" 
                  placeholder="https://..." 
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all font-medium"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitDeliverable}
                disabled={!deliverableUrl}
                className="px-6 py-3 bg-gradient-to-r from-[#e10032] to-[#ff4d6d] hover:from-[#c2002b] hover:to-[#e10032] text-white rounded-xl shadow-md shadow-[#e10032]/20 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {isReviewOpen && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white dark:bg-[#0b101d] rounded-3xl shadow-2xl border border-slate-200/60 dark:border-slate-800 w-full max-w-md p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e10032] to-[#ff4d6d]" />
            <h3 className="text-2xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">Rate the Client</h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mb-8 font-medium">How was your experience working with this client?</p>
            
            <div className="flex justify-center gap-3 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                 <button key={star} onClick={() => setReviewRating(star)} className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
                    <Star className={`w-10 h-10 ${reviewRating >= star ? 'fill-[#e10032] text-[#e10032]' : 'text-slate-200 dark:text-slate-800'}`} />
                 </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Comment</label>
              <textarea 
                rows={4}
                placeholder="Leave a comment about your experience..." 
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800/80 rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none resize-none transition-all font-medium leading-relaxed"
              />
            </div>
            
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsReviewOpen(false)}
                className="px-6 py-3 rounded-xl text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-xs font-bold uppercase tracking-wider"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitReview}
                disabled={!reviewComment}
                className="px-6 py-3 bg-gradient-to-r from-[#e10032] to-[#ff4d6d] hover:from-[#c2002b] hover:to-[#e10032] text-white rounded-xl shadow-md shadow-[#e10032]/20 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
