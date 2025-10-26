import React, { useEffect, useState } from "react";

export default function EditModal({
  booking = null,
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
}) {
  const [form, setForm] = useState({
    name: "",
    capacity: "",
    date: "",
    time: "",
    location: "",
    type: "",
  });

  useEffect(() => {
    if (booking && isOpen) {
      setForm({
        name: booking.name || "",
        capacity: booking.capacity || "",
        date: booking.date || "",
        time: booking.time || "",
        location: booking.location || "",
        type: booking.type || "",
      });
    }
  }, [booking, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = { ...booking, ...form };
    onSubmit(updated);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Edit Booking</h3>
          </div>

          <form className="p-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Capacity</label>
                  <input
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                  <input
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                  <input
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Time</label>
                  <input
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0"
                    placeholder="09:00 – 11:00"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 transition ease-in-out duration-100 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-0"
              >
                Cancel 
              </button>

              <button
                type="submit"
                className="text-white transition ease-in-out duration-100 bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-0"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}