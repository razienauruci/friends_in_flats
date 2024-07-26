'use client';
import { useFormState } from 'react-dom';
import { addRoom } from './actions';

interface RoomFormProps {
  apartmentId: number;
  onRoomAdded: () => void;
  setErrorMessage: (message: string | null) => void;
}

const initialState = {
  error: null,
  success: false,
};

export function RoomForm({ apartmentId, onRoomAdded, setErrorMessage }: RoomFormProps) {
  const [state, formAction] = useFormState(addRoom, initialState);

  if (state.error) {
    setErrorMessage(state.error);
  } else if (state.success) {
    onRoomAdded();
  }

  return (
    <form action={formAction} className="max-w-lg mx-auto mt-10 p-6 shadow-md rounded-lg bg-blue-50">
      <input type="hidden" name="apartmentId" value={apartmentId} />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Add a Room</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-blue-800 mb-1">Room Name</label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
              name="name"
              required
            />
          </div>
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-blue-800 mb-1">Size (in square meters)</label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
              name="size"
              type="number"
              required
            />
          </div>
          <div>
            <label htmlFor="equipment" className="block text-sm font-medium text-blue-800 mb-1">Equipment</label>
            <textarea
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
              name="equipment"
              rows={4}
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-blue-800 mb-1">Room Image</label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-blue-800"
              name="image"
              type="file"
              accept="image/*"
              required
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors text-lg font-semibold"
        >
          Add Room
        </button>
      </div>
    </form>
  );
}