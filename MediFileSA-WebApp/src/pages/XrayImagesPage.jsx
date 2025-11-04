import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const XrayImagesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const xrayPictures = location.state?.xrayPictures || [];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-red-700">🩻Diagnostic Images</h1>
          <Button onClick={() => navigate(-1)} className="bg-blue-600 text-white">
            Back
          </Button>
        </div>
        {xrayPictures.length === 0 ? (
          <p className="text-gray-500 italic">No X-ray images available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {xrayPictures.map((pic, idx) => (
              <div key={idx} className="bg-gray-50 border rounded p-3">
                <img
                  src={pic.imageData}
                  alt={`X-ray ${idx + 1}`}
                  className="w-full h-auto rounded border border-gray-300 mb-2"
                />
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Description:</span> {pic.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default XrayImagesPage;
