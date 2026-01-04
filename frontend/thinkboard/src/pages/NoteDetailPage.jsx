import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon, SaveIcon, Edit3Icon, CalendarIcon } from "lucide-react";

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await api.get(`/notes/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Error in fetching note", error);
                toast.error(error.response?.data?.message || "Failed to fetch the note");
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this note? This action cannot be undone.")) return;

        setDeleting(true);
        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note deleted successfully! 🗑️");
            navigate("/");
        } catch (error) {
            console.log("Error deleting the note:", error);
            toast.error(error.response?.data?.message || "Failed to delete note");
            setDeleting(false);
        }
    };

    const handleSave = async () => {
        if (!note.title.trim() || !note.content.trim()) {
            toast.error("Title and content cannot be empty!");
            return;
        }

        setSaving(true);

        try {
            await api.put(`/notes/${id}`, note);
            toast.success("Note updated successfully! ✅");
            navigate("/");
        } catch (error) {
            console.log("Error saving the note:", error);
            toast.error(error.response?.data?.message || "Failed to update note");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <LoaderIcon className="animate-spin size-12 text-primary mx-auto mb-4" />
                    <p className="text-lg opacity-70">Loading your note...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header Section */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <Link
                        to="/"
                        className="btn btn-ghost gap-2 hover:gap-3 transition-all"
                    >
                        <ArrowLeftIcon className="size-5" />
                        Back to Notes
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="badge badge-secondary badge-lg gap-2">
                            <Edit3Icon className="size-4" />
                            Edit Mode
                        </div>
                        <button
                            onClick={handleDelete}
                            className="btn btn-error gap-2 hover:scale-105 transition-transform"
                            disabled={deleting}
                        >
                            {deleting ? (
                                <>
                                    <LoaderIcon className="size-5 animate-spin" />
                                    Deleting...
                                </>
                            ) : (
                                <>
                                    <Trash2Icon className="size-5" />
                                    Delete
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Main Card */}
                <div className="card bg-base-100 shadow-2xl border border-secondary/20 hover:border-secondary/40 transition-all duration-300">
                    <div className="card-body p-8">
                        {/* Title with icon */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-secondary/10 rounded-lg">
                                <Edit3Icon className="size-6 text-secondary" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                                Edit Your Note
                            </h2>
                        </div>

                        {/* Date Info */}
                        {note.createdAt && (
                            <div className="flex items-center gap-2 mb-6 text-sm opacity-70">
                                <CalendarIcon className="size-4" />
                                <span>Created: {new Date(note.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Title Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-semibold">Title</span>
                                    <span className="label-text-alt text-xs opacity-70">
                                        {note.title.length}/100
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Note title"
                                    className="input input-bordered input-lg w-full focus:input-secondary transition-all"
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                    maxLength={100}
                                />
                            </div>

                            {/* Content Textarea */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-semibold">Content</span>
                                    <span className="label-text-alt text-xs opacity-70">
                                        {note.content.length} characters
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Write your note here... ✍️"
                                    className="textarea textarea-bordered textarea-lg h-64 w-full focus:textarea-secondary transition-all leading-relaxed"
                                    value={note.content}
                                    onChange={(e) => setNote({ ...note, content: e.target.value })}
                                />
                                <label className="label">
                                    <span className="label-text-alt opacity-60">
                                        💡 Your changes are not saved until you click "Save Changes"
                                    </span>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="card-actions justify-between items-center pt-4">
                                <Link
                                    to="/"
                                    className="btn btn-ghost btn-lg gap-2"
                                    disabled={saving || deleting}
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="btn btn-primary btn-lg gap-2 min-w-[180px] hover:scale-105 transition-transform"
                                    disabled={saving || deleting || !note.title.trim() || !note.content.trim()}
                                    onClick={handleSave}
                                >
                                    {saving ? (
                                        <>
                                            <LoaderIcon className="size-5 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <SaveIcon className="size-5" />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NoteDetailPage;