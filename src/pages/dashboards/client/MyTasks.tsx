import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { Task } from "../../../types";

export default function MyTasks() {
  const [tasks, setTasks] = useState<(Task & { freelancer_email?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activeReviewTask, setActiveReviewTask] = useState<any>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [activeEditTask, setActiveEditTask] = useState<any>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Design");
  const [editDescription, setEditDescription] = useState("");
  const [editBudget, setEditBudget] = useState("");
  const [editDeadline, setEditDeadline] = useState("");

  const fetchIt = async () => {
    try {
      const res = await api.get("/api/tasks/manage");
        const payload = res.data?.data || res.data || [];
        const taskList = Array.isArray(payload) ? payload : payload.tasks;
        setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (e) {
      console.error(e);
        setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIt();
  }, []);

  const handleDelete = async (id: string, status: string) => {
    if (status !== 'Open') {
      alert("Can only delete open tasks.");
      return;
    }
    if(confirm("Delete this task?")) {
      try {
        await api.delete(`/api/tasks/${id}`);
        setTasks(prev => prev.filter(t => t._id !== id));
      } catch (e: any) {
        alert(e.response?.data?.error || "Error deleting task");
      }
    }
  };

  const openReviewModal = (task: any) => {
    setActiveReviewTask(task);
    setRating(5);
    setComment("");
    setIsReviewOpen(true);
  };

  const submitReview = async () => {
    if (!activeReviewTask) return;
    try {
      await api.post(`/api/actions/tasks/${activeReviewTask._id}/review`, {
        reviewee_email: activeReviewTask.freelancer_email,
        rating,
        comment
      });
      alert("Review submitted!");
      setIsReviewOpen(false);
      setActiveReviewTask(null);
    } catch (e: any) {
      alert(e.response?.data?.error || "Failed to submit review");
    }
  };

  const openEditModal = (task: any) => {
    setActiveEditTask(task);
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditDescription(task.description);
    setEditBudget(task.budget.toString());
    setEditDeadline(task.deadline.split('T')[0]); // Formats Date to YYYY-MM-DD
    setIsEditOpen(true);
  };

  const submitEdit = async () => {
    if (!activeEditTask) return;
    try {
      await api.put(`/api/tasks/${activeEditTask._id}`, {
        title: editTitle,
        category: editCategory,
        description: editDescription,
        budget: Number(editBudget),
        deadline: editDeadline
      });
      // Update local state without fetching again
      setTasks(prev => prev.map(t => t._id === activeEditTask._id ? {
        ...t,
        title: editTitle,
        category: editCategory,
        description: editDescription,
        budget: Number(editBudget),
        deadline: editDeadline
      } : t));
      setIsEditOpen(false);
      setActiveEditTask(null);
    } catch (e: any) {
      alert(e.response?.data?.error || "Failed to edit task");
    }
  };

  if (loading) return (
    <div className="py-24 text-center">
      <div className="relative inline-flex items-center justify-center w-10 h-10">
        <div className="absolute w-full h-full rounded-full border-2 border-slate-100 dark:border-slate-800/80" />
        <div className="absolute w-full h-full rounded-full border-2 border-t-[#e10032] dark:border-t-[#ff4d6d] animate-spin" />
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">Loading your tasks...</p>
    </div>
  );

  return (
    <div>
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">Manage My Tasks</h2>
        <p className="text-slate-500 dark:text-neutral-400 mt-1.5 font-medium text-sm">Review applications, edit listings, and track your active projects.</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="py-20 text-center text-slate-500 dark:text-neutral-400 bg-slate-50/50 dark:bg-[#0b101d]/20 border border-dashed rounded-3xl border-slate-200 dark:border-slate-800 font-medium max-w-xl mx-auto">
          You haven't posted any tasks yet.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task._id} className="p-6 md:p-8 border border-slate-200/60 dark:border-slate-800/60 rounded-3xl bg-white dark:bg-[#0b101d]/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-[#e10032]/30 dark:hover:border-[#ff4d6d]/40 hover:shadow-[0_12px_35px_rgba(225,0,50,0.03)] dark:hover:shadow-[0_12px_45px_rgba(0,0,0,0.45)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#e10032]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="flex-1 relative z-10">
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="inline-flex px-3 py-1 bg-red-50 dark:bg-red-950/20 text-[10px] font-bold uppercase tracking-widest rounded-full text-[#e10032] dark:text-[#ff4d6d] border border-red-100/10 dark:border-red-900/10">
                    {task.category || 'General'}
                  </span>
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
                  <span>Budget: <strong className="text-[#e10032] dark:text-[#ff4d6d] font-extrabold">${task.budget}</strong></span>
                  <span className="text-slate-300 dark:text-slate-700">|</span>
                  <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
                
                {task.status === 'Completed' && task.deliverable_url && (
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800/80">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400">Deliverable:</span>
                    <a href={task.deliverable_url} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#e10032] dark:text-[#ff4d6d] hover:underline">
                      View Work Submitted
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 relative z-10 w-full md:w-auto">
                <Link to={`/dashboard/client/tasks/${task._id}/proposals`} className="flex-1 md:flex-none text-center px-5 py-2.5 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors border border-transparent dark:border-slate-700/50">Proposals</Link>
                
                {task.status === 'Open' && (
                  <>
                    <button onClick={() => openEditModal(task)} className="flex-1 md:flex-none px-5 py-2.5 text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Edit</button>
                    <button onClick={() => handleDelete(task._id, task.status)} className="flex-1 md:flex-none px-5 py-2.5 text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">Delete</button>
                  </>
                )}
                {task.status === 'Completed' && (
                  <button onClick={() => openReviewModal(task)} className="flex-1 md:flex-none px-5 py-2.5 text-white bg-gradient-to-r from-[#e10032] to-[#ff4d6d] hover:from-[#c2002b] hover:to-[#e10032] shadow-md shadow-[#e10032]/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all">Leave Review</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {isReviewOpen && activeReviewTask && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white dark:bg-[#0b101d] rounded-3xl shadow-2xl w-full max-w-md p-8 border border-slate-200/60 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#e10032] to-[#ff4d6d]" />
            <h3 className="text-2xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">Rate Freelancer</h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mb-8 font-medium">Leave a review for their work on "{activeReviewTask.title}".</p>
            
            <div className="space-y-6">
              <div>
                 <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Rating (Out of 5)</label>
                 <input 
                   type="number" 
                   min="1" max="5" 
                   value={rating} 
                   onChange={e => setRating(Number(e.target.value))}
                   className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all font-bold"
                 />
              </div>
              
              <div>
                 <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Comment</label>
                 <textarea 
                   rows={4}
                   value={comment} 
                   onChange={e => setComment(e.target.value)}
                   className="w-full px-5 py-3.5 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl resize-none focus:border-[#e10032] dark:focus:border-[#ff4d6d] focus:ring-2 focus:ring-[#e10032]/10 outline-none transition-all font-medium leading-relaxed"
                   placeholder="How was the quality of work?"
                 ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
               <button onClick={() => setIsReviewOpen(false)} className="px-6 py-3 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
               <button onClick={submitReview} className="px-6 py-3 bg-gradient-to-r from-[#e10032] to-[#ff4d6d] hover:from-[#c2002b] hover:to-[#e10032] text-white rounded-xl shadow-md shadow-[#e10032]/20 text-xs font-bold uppercase tracking-wider transition-all">Submit Review</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditOpen && activeEditTask && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="bg-white dark:bg-[#0b101d] rounded-3xl shadow-2xl w-full max-w-lg p-8 border border-slate-200/60 dark:border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400" />
            <h3 className="text-2xl font-extrabold mb-2 text-slate-900 dark:text-white tracking-tight">Edit Task</h3>
            <p className="text-sm text-slate-500 dark:text-neutral-400 mb-8 font-medium">Update the details of your open task listing.</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Title</label>
                <input type="text" value={editTitle} onChange={e => setEditTitle(e.target.value)} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Category</label>
                  <select value={editCategory} onChange={e => setEditCategory(e.target.value)} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-medium appearance-none">
                    <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Design</option>
                    <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Writing</option>
                    <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Development</option>
                    <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Marketing</option>
                    <option className="bg-white dark:bg-[#0b101d] text-slate-900 dark:text-white">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Budget (USD)</label>
                  <input type="number" min="1" value={editBudget} onChange={e => setEditBudget(e.target.value)} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-bold" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Deadline Date</label>
                <input type="date" value={editDeadline} onChange={e => setEditDeadline(e.target.value)} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-700 dark:text-neutral-300">Description</label>
                <textarea rows={4} value={editDescription} onChange={e => setEditDescription(e.target.value)} className="w-full px-4 py-3 border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-black/20 text-slate-900 dark:text-white rounded-2xl resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all font-medium"></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
               <button onClick={() => setIsEditOpen(false)} className="px-6 py-3 bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-slate-800 dark:text-slate-200 text-xs font-bold uppercase tracking-wider transition-colors">Cancel</button>
               <button onClick={submitEdit} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 text-xs font-bold uppercase tracking-wider transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
