import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const SchemeFormModal = ({ onClose }) => {
  const [show, setShow] = useState(false);
  // State to store the list of states and loading status
  const [states, setStates] = useState([]);
  const [loadingStates, setLoadingStates] = useState(true);

  // Effect for modal open animation
  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // Effect to fetch states from the API when the component mounts
  useEffect(() => {
    axios
      .get(
        "https://api.data.gov.in/resource/a71e60f0-a21d-43de-a6c5-fa5d21600cdb",
        {
          params: {
            "api-key":
              "579b464db66ec23bdd000001a4aeda66a76a4b6f659d40e02dc93e83",
            format: "json",
            limit: 100,
          },
        }
      )
      .then((res) => {
        // Sort the states alphabetically for better user experience
        const sortedStates = res.data.records.sort((a, b) =>
          a.state_name_english.localeCompare(b.state_name_english)
        );
        setStates(sortedStates);
      })
      .catch((err) => {
        console.error("Failed to fetch states data:", err);
      })
      .finally(() => {
        setLoadingStates(false);
      });
  }, []); // Empty array [] ensures this runs only once

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40 px-4">
      <div
        className={`relative w-full max-w-2xl transition-all duration-300 transform ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 max-h-[90vh] overflow-y-auto`}
      >
        <button
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-700 transition"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-semibold text-center text-[#16355D] mb-6">
          Scheme For Me
        </h2>

        <form className="space-y-5 text-sm">
          {/* Age */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Age</label>
            <input
              type="number"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white"
              placeholder="Enter your age"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Gender
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* State - DYNAMIC */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              State
            </label>
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white"
              disabled={loadingStates}
            >
              <option value="">
                {loadingStates ? "Loading states..." : "Select your state"}
              </option>
              {states.map((state) => (
                <option key={state.state_code} value={state.state_name_english}>
                  {state.state_name_english}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Category
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select category</option>
              <option value="student">Student</option>
              <option value="farmer">Farmer</option>
              <option value="job-seeker">Job Seeker</option>
              <option value="entrepreneur">Entrepreneur</option>
              <option value="retired">Retired</option>
              <option value="unemployed">Unemployed</option>
              <option value="housewife">Housewife</option>
              <option value="disabled">Person with Disability</option>
              <option value="minority">Minority Community</option>
              <option value="artisan">Artisan</option>
              <option value="working-professional">Working Professional</option>
            </select>
          </div>

          {/* Education Level */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Education
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select education level</option>
              <option value="none">No formal education</option>
              <option value="10th">Up to 10th</option>
              <option value="12th">12th Pass</option>
              <option value="graduate">Graduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="technical">Technical/Diploma</option>
            </select>
          </div>

          {/* Annual Income */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Annual Income
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select income range</option>
              <option value="<1L">&lt; ₹1 Lakh</option>
              <option value="1L-3L">₹1–3 Lakh</option>
              <option value="3L-5L">₹3–5 Lakh</option>
              <option value="5L-10L">₹5–10 Lakh</option>
              <option value=">10L">&gt; ₹10 Lakh</option>
            </select>
          </div>

          {/* Disability */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Disability
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Do you have a disability?</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Marital Status */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Marital Status
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widowed">Widowed</option>
              <option value="divorced">Divorced</option>
            </select>
          </div>

          {/* Scheme Type */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Scheme Type
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select one</option>
              <option value="state">State Government</option>
              <option value="central">Central Government</option>
            </select>
          </div>

          {/* Caste */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Caste
            </label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#16355D] focus:outline-none bg-white">
              <option value="">Select caste</option>
              <option value="general">General</option>
              <option value="obc">OBC</option>
              <option value="sc">SC</option>
              <option value="st">ST</option>
              <option value="minority">Minority</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#16355D] text-white font-medium hover:bg-[#1f4b7f] transition duration-200"
            >
              Find Suitable Schemes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchemeFormModal;
