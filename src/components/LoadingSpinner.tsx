"use client";

import React from "react";

const LoadingSpinner = ({ label }: { label: string }) => {
  return (
    <div className=" flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4" />
        <p className="text-gray-600">{label}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
