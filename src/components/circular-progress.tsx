
"use client";

import * as React from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({ value, size = 80, strokeWidth = 8 }: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-secondary"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-green-500"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
            transition: "stroke-dashoffset 0.5s ease-in-out",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-semibold text-green-600">{value}%</span>
      </div>
    </div>
  );
}
