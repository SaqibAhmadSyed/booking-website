"use client";
import React, { useState, useEffect } from "react";
import LoadingSpinner from "../../components/loading-spinner"; // Adjust path as needed

export default function ProfilePageLayout() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile/get");
        if (res.ok) {
          const data = await res.json();
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            email: data.user.email || "",
          });
          setCurrentImageUrl(data.user.profileImage);
        } else {
          setMessage({ type: "error", text: "Failed to load profile" });
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        setMessage({ type: "error", text: "Failed to load profile" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((p) => ({ ...p, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setMessage({ type: "error", text: "Please select a JPG, PNG, or GIF image" });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: "error", text: "Image must be less than 5MB" });
      return;
    }

    setProfileImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    setMessage({ type: "", text: "" });
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      let imageUrl = null;

      if (profileImage) {
        setIsUploading(true);
        const fd = new FormData();
        fd.append("file", profileImage);

        const uploadRes = await fetch("/api/profile/upload", {
          method: "POST",
          body: fd,
        });

        if (!uploadRes.ok) {
          const err = await uploadRes.json();
          throw new Error(err.error || "Image upload failed");
        }

        const result = await uploadRes.json();
        imageUrl = result.imageUrl;
        setIsUploading(false);
      }

      const updateRes = await fetch("/api/profile/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          imageUrl,
        }),
      });

      if (!updateRes.ok) {
        const err = await updateRes.json();
        throw new Error(err.error || "Profile update failed");
      }

      setMessage({ type: "success", text: "Profile updated successfully!" });

      setProfileImage(null);
      setImagePreview(null);

      if (imageUrl) {
        setCurrentImageUrl(imageUrl);
      }

    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }

    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/profile/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: passwordData.newPassword }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to change password");
      }

      setMessage({ type: "success", text: "Password changed successfully!" });
      setPasswordData({ newPassword: "", confirmPassword: "" });

      setTimeout(() => {
        setShowPasswordForm(false);
        setMessage({ type: "", text: "" });
      }, 2000);

    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    const f = formData.firstName?.[0] || "";
    const l = formData.lastName?.[0] || "";
    return (f + l).toUpperCase() || "SS";
  };

  const displayedImage = imagePreview || currentImageUrl;

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Loading profile..." />;
  }

  return (
    <main className="p-6 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Profile Information</h1>
        <p className="text-gray-600 mt-1">Update your personal details and profile photo</p>
      </div>

      {message.text && (
        <div
          className={`max-w-6xl mx-auto mb-6 p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Profile Photo Section */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Photo</h2>
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-red-400 to-red-600 p-1 shadow-lg">
                  <div className="w-full h-full rounded-full bg-white p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {displayedImage ? (
                        <img src={displayedImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-5xl font-bold text-gray-400">{getInitials()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <label
                  htmlFor="profile-image"
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-50 rounded-full transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                >
                  <div className="text-center">
                    <svg className="w-8 h-8 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-white text-sm font-medium">Change</p>
                  </div>
                </label>
                <input
                  id="profile-image"
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </div>

              <label
                htmlFor="profile-image"
                className="mt-6 block w-full px-4 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition text-center cursor-pointer"
              >
                {profileImage ? "Change Photo" : "Choose New Photo"}
              </label>
              
              {profileImage && (
                <button
                  onClick={() => {
                    setProfileImage(null);
                    setImagePreview(null);
                    setMessage({ type: "", text: "" });
                  }}
                  className="mt-3 w-full px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition text-center"
                >
                  Cancel Selection
                </button>
              )}

              <div className="mt-6 p-4 bg-gray-50 rounded-lg w-full text-xs text-gray-500">
                <p className="mb-1 font-medium text-gray-600">Photo Guidelines:</p>
                <ul className="space-y-1">
                  <li>• JPG, PNG or GIF format</li>
                  <li>• Maximum size: 5MB</li>
                  <li>• Recommended: Square image</li>
                  <li>• Minimum: 400x400 pixels</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-8">
            {!showPasswordForm ? (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>

                  <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} />

                  <div className="border-t border-gray-200 my-6"></div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(true);
                        setMessage({ type: "", text: "" });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition shadow-md"
                    >
                      Change Password
                    </button>

                    <button
                      onClick={handleSaveChanges}
                      disabled={isSaving || isUploading}
                      className="w-full sm:w-auto px-8 py-3 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isUploading ? <LoadingSpinner size="sm" color="white" /> : isSaving ? <LoadingSpinner size="sm" color="white" /> : "Save Changes"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>

                <div className="space-y-6">
                  <InputField label="New Password" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
                  <InputField label="Confirm New Password" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} />

                  <div className="border-t border-gray-200 my-6"></div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({ newPassword: "", confirmPassword: "" });
                        setMessage({ type: "", text: "" });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition shadow-md"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleChangePassword}
                      disabled={isSaving || !passwordData.newPassword || !passwordData.confirmPassword}
                      className="w-full sm:w-auto px-8 py-3 bg-red-800 hover:bg-red-700 text-white font-semibold rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? <LoadingSpinner size="sm" color="white" /> : "Update Password"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

const InputField = ({ label, type = "text", name, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-red-800 transition text-gray-900"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);
