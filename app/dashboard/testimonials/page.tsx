// app/dashboard/testimonials/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Testimonial } from '@/types';
import { testimonialSchema } from '@/lib/validations';

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        role: '',
        image: '',
        rating: 0,
        comment: '',
        featured: true,
    });

    useEffect(() => {
        fetchTestimonials();
    },);

    const fetchTestimonials = async () => {
        try {
            const url = searchTerm
                ? `/api/testimonials?search=${searchTerm}`
                : '/api/testimonials';
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                setTestimonials(data.data);
            }
        } catch {
            toast.error('Failed to fetch testimonials');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchTestimonials();
        }, 500);
        return () => clearTimeout(timer);
    },);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = testimonialSchema.safeParse(formData);
        if (!validation.success) {
            toast.error(validation.error.message);
            return;
        }

        try {
            const url = editingId
                ? `/api/testimonials/${editingId}`
                : '/api/testimonials';

            const response = await fetch(url, {
                method: editingId ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            toast.success(editingId ? 'Updated successfully' : 'Created successfully');
            resetForm();
            fetchTestimonials();
        } catch {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (testimonial: Testimonial) => {
        setFormData({
            name: testimonial.name,
            role: testimonial.role,
            image: testimonial.image,
            rating: testimonial.rating,
            comment: testimonial.comment,
            featured: testimonial.featured || true,
        });
        setEditingId(testimonial._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;

        try {
            const response = await fetch(`/api/testimonials/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            toast.success('Deleted successfully');
            fetchTestimonials();
        } catch {
            toast.error('Delete failed');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            role: '',
            image: '',
            rating: 0,
            comment: '',
            featured: true,
        });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Testimonial
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role</label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="https://..."
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
                                <input
                                    type="number"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    min="0"
                                    max="5"
                                    step="0.5"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Comment</label>
                            <textarea
                                value={formData.comment}
                                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows={4}
                                required
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-5 h-5"
                                />
                                <span className="text-sm font-medium">Featured</span>
                            </label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                            >
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search testimonials..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center py-8">Loading...</p>
                ) : testimonials.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No testimonials found</p>
                ) : (
                    <div className="space-y-4">
                        {testimonials.map((testimonial) => (
                            <div key={testimonial._id} className="border rounded-lg p-4 flex gap-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    width={80}
                                    height={80}
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold">{testimonial.name}</h3>
                                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < testimonial.rating
                                                            ? 'fill-yellow-400 text-yellow-400'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-3">{testimonial.comment}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(testimonial)}
                                            className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-200"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(testimonial._id)}
                                            className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-200"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}