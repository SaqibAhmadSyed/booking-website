"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * User dashboard homepage - Welcome page with booking system overview
 * Features:
 * - Hero section with call-to-action
 * - Step-by-step booking process guide
 * - Booking rules and policies
 * - System features showcase
 * - Multiple campus locations support
 */
export default function HomePage() {
  const steps = [
    {
      number: "1",
      title: "Browse Available Rooms",
      description:
        "Explore our variety of meeting rooms, study spaces, and sports facilities across all campuses.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
    },
    {
      number: "2",
      title: "Select Date & Time",
      description:
        "Choose your preferred date and time slot using our interactive calendar system.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      number: "3",
      title: "Fill Booking Details",
      description:
        "Enter your information including name, capacity needed, and any special requirements.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
    },
    {
      number: "4",
      title: "Submit & Confirm",
      description:
        "Review your booking details and submit. You'll receive confirmation once approved by admin.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const features = [
    {
      title: "Multiple Locations",
      description:
        "Access rooms across Loyola, SGW, and other Concordia campuses.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Real-Time Availability",
      description:
        "See up-to-date room availability and avoid booking conflicts.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Flexible Booking",
      description: "Book rooms for study sessions, meetings, sports, and more.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden text-white h-[600px]">
        <div className="absolute inset-0">
          <Image
            src="/img/hero.jpg"
            alt="Hero Background"
            fill
            className="object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-red-700 to-red-800 opacity-80"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Concordia Booking System
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Book meeting rooms, study spaces, and sports facilities across all
            Concordia campuses with ease
          </p>
          <Link
            href="/user/room-list"
            className="inline-block px-8 py-4 bg-red-800 text-white font-semibold rounded-lg shadow-lg hover:bg-red-600 transition transform hover:scale-102"
          >
            Book a Room Now
          </Link>
        </div>
      </div>
      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How to Book a Room
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow these simple steps to reserve your space in just minutes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
                {/* Step Number Badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4 ml-auto">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Arrow Connector (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <svg
                    className="w-8 h-8 text-red-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Booking Rules Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Booking Rules
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-3 text-sm md:text-base">
            <li>
              You cannot book multiple study rooms or multiple labs in the same
              time slot.
            </li>
            <li>Study rooms can be booked for a maximum of 3 hours.</li>
            <li>Labs can be booked for a maximum of 5 hours.</li>
            <li>
              Sports equipment and facilities can be booked for a maximum of 2
              hours.
            </li>
            <li>Do not exceed the maximum of which a room can hold</li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Booking System?
            </h2>
            <p className="text-lg text-gray-600">
              Designed for convenience and efficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition"
              >
                <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Space?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Get started now and reserve the perfect room for your needs. Whether
            it&apos;s a study session, team meeting, or sports activity, we&apos;ve got
            you covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/user/room-list"
              className="inline-block px-8 py-4 bg-white text-red-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
            >
              Start Booking
            </Link>
            <Link
              href="/admin/bookings"
              className="inline-block px-8 py-4 bg-red-800 text-white font-semibold rounded-lg border-2 border-white hover:bg-red-900 transition"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
