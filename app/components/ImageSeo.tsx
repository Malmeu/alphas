'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface ImageSeoProps extends Omit<ImageProps, 'alt'> {
  alt: string;
  title?: string;
  caption?: string;
  priority?: boolean;
}

export default function ImageSeo({
  alt,
  title,
  caption,
  priority = false,
  ...props
}: ImageSeoProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <figure className="relative">
      <Image
        {...props}
        alt={alt}
        title={title || alt}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        className={`${props.className || ''} ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-500`}
        data-seo-image="true"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
