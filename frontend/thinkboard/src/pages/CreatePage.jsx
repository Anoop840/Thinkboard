import { ArrowLeftIcon, LoaderIcon, PenLineIcon, SaveIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreatePage = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await api.post("/notes", {
                title,
                content,
            });

            toast.success("Note created successfully!");
            navigate("/");
        } catch (error) {
            console.log("Error creating note", error);
            if (error.response?.status === 429) {
                toast.error("Slow down! You're creating notes too fast", {
                    duration: 4000,
                    icon: "💀",
                });
            } else {
                toast.error(error.response?.data?.message || "Failed to create note");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <Link
                        to={"/"}
                        className="btn btn-ghost gap-2 hover:gap-3 transition-all"
                    >
                        <ArrowLeftIcon className="size-5" />
                        Back to Notes
                    </Link>
                    <div className="badge badge-primary badge-lg gap-2">
                        <PenLineIcon className="size-4" />
                        New Note
                    </div>
                </div>

                {/* Main Card */}
                <div className="card bg-base-100 shadow-2xl border border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="card-body p-8">
                        {/* Title with icon */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <PenLineIcon className="size-6 text-primary" />
                            </div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Create New Note
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title Input */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-semibold">Title</span>
                                    <span className="label-text-alt text-xs opacity-70">
                                        {title.length}/100
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter a catchy title..."
                                    className="input input-bordered input-lg w-full focus:input-primary transition-all"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    maxLength={100}
                                />
                            </div>

                            {/* Content Textarea */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-semibold">Content</span>
                                    <span className="label-text-alt text-xs opacity-70">
                                        {content.length} characters
                                    </span>
                                </label>
                                <textarea
                                    placeholder="Write your thoughts here... ✍️"
                                    className="textarea textarea-bordered textarea-lg h-64 w-full focus:textarea-primary transition-all leading-relaxed"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <label className="label">
                                    <span className="label-text-alt opacity-60">
                                        💡 Tip: Use markdown for better formatting
                                    </span>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="card-actions justify-between items-center pt-4">
                                <Link
                                    to="/"
                                    className="btn btn-ghost btn-lg gap-2"
                                    disabled={loading}
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg gap-2 min-w-[160px]"
                                    disabled={loading || !title.trim() || !content.trim()}
                                >
                                    {loading ? (
                                        <>
                                            <LoaderIcon className="size-5 animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <SaveIcon className="size-5" />
                                            Create Note
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreatePage;