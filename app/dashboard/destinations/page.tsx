'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit, Trash2, Search, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { Destination } from '@/types/index';
import { destinationSchema } from '@/lib/validations';

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        image: '',
        rating: 0,
        price: 0,
        description: '',
        featured: true,
    });

    useEffect(() => {
        fetchDestinations();
    }, );

    const fetchDestinations = async () => {
        try {
            const url = searchTerm
                ? `/api/destinations?search=${searchTerm}`
                : '/api/destinations';
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                setDestinations(data.data);
            }
        } catch {
            toast.error('Failed to fetch destinations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchDestinations();
        }, 500);
        return () => clearTimeout(timer);
    },);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = destinationSchema.safeParse(formData);
        if (!validation.success) {
            toast.error(validation.error.message);
            return;
        }

        try {
            const url = editingId
                ? `/api/destinations/${editingId}`
                : '/api/destinations';

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
            fetchDestinations();
        } catch {
            toast.error('Operation failed');
        }
    };

    const handleEdit = (destination: Destination) => {
        setFormData({
            name: destination.name,
            location: destination.location,
            image: destination.image,
            rating: destination.rating,
            price: destination.price,
            description: destination.description || '',
            featured: destination.featured || true,
        });
        setEditingId(destination._id);
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this destination?')) return;

        try {
            const response = await fetch(`/api/destinations/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error);
            }

            toast.success('Deleted successfully');
            fetchDestinations();
        } catch {
            toast.error('Delete failed');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            location: '',
            image: '',
            rating: 0,
            price: 0,
            description: '',
            featured: true,
        });
        setEditingId(null);
        setShowForm(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Destinations</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Add Destination
                </button>
            </div>

            {showForm && (
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Edit Destination' : 'Add New Destination'}
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
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                                <label className="block text-sm font-medium mb-1">Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    min="0"
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
                                    step="0.1"
                                    required
                                />
                            </div>
                            <div>
                                <label className="flex items-center gap-2 mt-6">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-sm font-medium">Featured</span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
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
                            placeholder="Search destinations..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center py-8">Loading...</p>
                ) : destinations.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No destinations found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {destinations.map((dest) => (
                            <div key={dest._id} className="border rounded-lg overflow-hidden">
                                <Image src={dest.image} alt={dest.name} width={400} height={192} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold">{dest.name}</h3>
                                            <p className="text-sm text-gray-600">{dest.location}</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span className="text-sm">{dest.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-blue-600 font-bold mb-3">${dest.price}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(dest)}
                                            className="flex-1 flex items-center justify-center gap-1 bg-blue-100 text-blue-600 px-3 py-2 rounded hover:bg-blue-200"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(dest._id)}
                                            className="flex-1 flex items-center justify-center gap-1 bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200"
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