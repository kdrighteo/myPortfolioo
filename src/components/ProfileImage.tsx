"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";

type ProfileImageProps = {
  className?: string;
  containerClassName?: string;
  priority?: boolean;
};

const ProfileImage: React.FC<ProfileImageProps> = ({
  className = "",
  containerClassName = "",
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${containerClassName}`}
    >
      <Image
        src="/images/profile.jpg"
        alt="Gilbert Danso - Web Developer from Ghana"
        fill
        priority={priority}
        quality={90}
        className={`object-cover duration-700 ease-in-out ${
          isLoading ? "scale-110 blur-sm" : "scale-100 blur-0"
        } ${className}`}
        onLoad={() => setIsLoading(false)}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
};

export default ProfileImage;
