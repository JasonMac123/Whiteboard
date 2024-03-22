"use client";

import Image from "next/image";
import Link from "next/link";

interface EmptyState {
  image: string;
  altImage: string;
  attributionLink: string;
  error: string;
  errorMessage: string;
  children?: React.ReactNode;
}

export const EmptyState = ({
  image,
  altImage,
  attributionLink,
  error,
  errorMessage,
  children,
}: EmptyState) => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src={image} height={400} width={400} alt={altImage} />
      <Link href={attributionLink} className="text-xs text-muted-foreground text-neutral-700">
        @Icon created by Freepik - Flaticon
      </Link>
      <h2 className="text-2xl font-semibold mt-6">{error}</h2>
      <p className="text-muted-foreground text-sm mt-2">{errorMessage}</p>
      {children}
    </div>
  );
};
