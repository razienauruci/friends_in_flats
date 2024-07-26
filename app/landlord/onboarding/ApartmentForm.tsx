'use client';
import { useFormState } from 'react-dom';
import { addApartment } from './actions';

interface ApartmentFormProps {
    onApartmentCreated: (id: number) => void;
    setErrorMessage: (message: string | null) => void;
}

const initialState = {
    error: null,
    success: false,
    id: null,
};

export function ApartmentForm({ onApartmentCreated, setErrorMessage }: ApartmentFormProps) {
    const [state, formAction] = useFormState(addApartment, initialState);

    if (state.error) {
        setErrorMessage(state.error);
    } else if (state.success && state.id) {
        onApartmentCreated(state.id);
    }

    return (
        <form action={formAction} className="max-w-lg mx-auto mt-10 p-6 shadow-md rounded-lg bg-blue-50">
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Add an Apartment</h2>
            <div className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">Apartment Name</label>
                    <input
                        className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
                        name="name"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-blue-800 mb-1">Location</label>
                    <input
                        className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
                        name="location"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-blue-800 mb-1">Price (per month)</label>
                    <input
                        className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
                        name="price"
                        type="number"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-blue-800 mb-1">Description</label>
                    <textarea
                        className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
                        name="description"
                        rows={4}
                        required
                    />
                </div>
            </div>
            <div className="mt-8">
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors text-lg font-semibold"
                >
                    Add Apartment
                </button>
            </div>
        </form>
    );
}