"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

export default function EditRoom() {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.id;

  const AMENITIES = {
    conference: ["Projector", "Whiteboard", "Video Conferencing", "TV Screen"],
    meeting: ["Whiteboard", "Conference Phone", "WiFi"],
    study: ["Tables", "Chairs", "Whiteboard", "WiFi"],
    lab: ["Computers", "Projector", "Whiteboard", "Lab Equipment"],
    gym: ["Equipment", "Changing Room", "Storage", "Safety Equipment"],
    basketball: ["Court", "Scoreboard", "Locker Room"],
    auditorium: ["Stage", "Sound System", "Lighting", "Seating"],
    lecture: ["Projector", "Podium", "Whiteboard", "Microphones"],
  };

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    type: "",
    description: "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (roomId) {
      fetchRoomData();
    }
  }, [roomId]);

  const fetchRoomData = async () => {
    try {
      const res = await fetch(`/api/resource/get-room?id=${roomId}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.room.name,
          location: data.room.location,
          capacity: data.room.capacity,
          type: data.room.type,
          description: data.room.description || "",
        });
        setCurrentImage(data.room.image);
        setAmenities(data.room.amenities || []);
      } else {
        setMessage({ type: "error", text: "Failed to load room data" });
      }
    } catch (err) {
      console.error("Error fetching room:", err);
      setMessage({ type: "error", text: "Failed to load room data" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: "error", text: "Image must be less than 5MB" });
        return;
      }

      setNewImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setMessage(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData((prev) => ({ ...prev, type: newType }));
    setAmenities(AMENITIES[newType] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      let base64Image = currentImage;

      // Convert new image to base64 if selected
      if (newImageFile) {
        base64Image = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(newImageFile);
        });
      }

      const updateData = {
        id: roomId,
        name: formData.name,
        location: formData.location,
        capacity: Number(formData.capacity),
        type: formData.type,
        amenities,
        description: formData.description,
        image: base64Image,
      };

      const res = await fetch("/api/resource/update-room", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update room");
      }

      const json = await res.json();
      setMessage({ type: "success", text: "Room updated successfully!" });
      setCurrentImage(json.room.image);
      setImagePreview(null);
      setNewImageFile(null);

      setTimeout(() => {
        router.push("/admin/room-list");
      }, 1500);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: err.message || "Failed to update room" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    );
  }

  if (!roomId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Room ID</h2>
          <button
            onClick={() => router.push("/admin/rooms")}
            className="mt-4 px-6 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    );
  }

  const displayedImage = imagePreview || currentImage;

  return (
    <main className="p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Room</h1>
        <p className="text-gray-600 text-sm">Update room information and details</p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`max-w-4xl w-full mb-4 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Card */}
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center mb-3">
              {displayedImage ? (
                <Image
                  src={displayedImage}
                  alt="Room preview"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-xs text-gray-500">No image uploaded</p>
                </div>
              )}
            </div>

            <label
              htmlFor="room-image"
              className="px-3 py-1.5 bg-red-800 text-white rounded-md hover:bg-red-700 cursor-pointer transition text-sm"
            >
              {currentImage ? "Change Image" : "Upload Image"}
            </label>
            <input
              id="room-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {newImageFile && (
              <button
                onClick={() => {
                  setNewImageFile(null);
                  setImagePreview(null);
                }}
                className="mt-3 px-3 py-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel Change
              </button>
            )}

            <p className="text-xs text-gray-500 mt-2 text-center leading-tight">
              JPG, PNG, or GIF (max 5MB)
              <br />
              Recommended: 800×600px
            </p>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Room Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Room Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g., Conference Room A"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            {/* Location & Capacity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  <option value="H">Henry F. Hall (H)</option>
                  <option value="LB">J.W. McConnell (LB)</option>
                  <option value="JMSB">John Molson (JMSB)</option>
                  <option value="GN">Grey Nuns (GN)</option>
                  <option value="FB">Faubourg (FB)</option>
                  <option value="EV">Engineering & Visual Arts (EV)</option>
                  <option value="MB">Montreal Building (MB)</option>
                  <option value="FG">Faubourg Tower (FG)</option>
                  <option value="AD">Administration (AD)</option>
                  <option value="CC">Central Building (CC)</option>
                  <option value="PY">Psychology Building (PY)</option>
                  <option value="SP">Sports Complex (SP)</option>
                  <option value="RA">Richard J. Arena (RA)</option>
                  <option value="PC">Performing Arts (PC)</option>
                  <option value="VL">Vanier Library (VL)</option>
                  <option value="JR">Jesuit Residence (JR)</option>
                </select>
              </div>

              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  max="200"
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleTypeChange}
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select type</option>
                <optgroup label="Meeting Spaces">
                  <option value="conference">Conference Room</option>
                  <option value="meeting">Meeting Room</option>
                </optgroup>
                <optgroup label="Study Spaces">
                  <option value="study">Study Room</option>
                  <option value="lab">Computer Lab</option>
                </optgroup>
                <optgroup label="Sports Facilities">
                  <option value="gym">Gym</option>
                  <option value="basketball">Basketball Court</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="auditorium">Auditorium</option>
                  <option value="lecture">Lecture Hall</option>
                </optgroup>
              </select>
            </div>

            {amenities.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                <ul className="list-disc pl-5 text-sm text-gray-700">
                  {amenities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Add room details..."
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-gray-200 mt-3">
              <button
                type="button"
                onClick={() => router.push("/admin/rooms")}
                className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-4 py-1.5 bg-red-800 text-white rounded-md hover:bg-red-700 text-sm shadow-sm disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Update Room"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}