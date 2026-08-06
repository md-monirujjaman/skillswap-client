import React from "react";

interface LogoProps {
  className?: string;
  iconSize?: string;
  showText?: boolean;
  textColorClass?: string;
}

export default function Logo({
  className = "flex items-center gap-2",
  iconSize = "w-8 h-8",
  showText = true,
  textColorClass = "text-gray-900 dark:text-white"
}: LogoProps) {
  return (
    <div className={className}>
      <img
        src="/logo.png"
        alt="Skillwrap Logo"
        className={`${iconSize} flex-shrink-0 object-contain`}
        referrerPolicy="no-referrer"
      />
      {showText && (
        <span className={`font-bold tracking-tight text-xl transition-colors ${textColorClass}`}>
          Skillwrap
        </span>
      )}
    </div>
  );
}
