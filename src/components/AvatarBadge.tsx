/**
 * AvatarBadge — circular medallion that prefers a profile photo when
 * `imageSrc` is provided and silently falls back to gradient initials
 * if the image is missing or fails to load. Wraps everything in a
 * floating, glow-pulsing frame.
 */
import { useState } from 'react';

interface AvatarBadgeProps {
  initials: string;
  imageSrc?: string;
  ariaLabel?: string;
}

export const AvatarBadge = ({
  initials,
  imageSrc,
  ariaLabel = 'Personal avatar',
}: AvatarBadgeProps): JSX.Element => {
  const [imageBroken, setImageBroken] = useState(false);
  const showPhoto = Boolean(imageSrc) && !imageBroken;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className="relative w-[280px] h-[280px] rounded-full grid place-items-center bg-brand animate-avatar-float-glow before:content-[''] before:absolute before:-inset-[3px] before:rounded-full before:-z-10 before:blur-[14px] before:opacity-[0.38] before:[background:conic-gradient(from_90deg,#3b82f6,#a855f7,#f5c46b,#3b82f6)] max-lg:w-[250px] max-lg:h-[250px] max-md:w-[240px] max-md:h-[240px] max-sm:w-[210px] max-sm:h-[210px]"
    >
      <div className="relative w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full overflow-hidden grid place-items-center bg-background">
        {showPhoto ? (
          <img
            src={imageSrc}
            alt={ariaLabel}
            loading="eager"
            decoding="async"
            onError={() => setImageBroken(true)}
            className="w-full h-full object-cover block"
          />
        ) : (
          <span className="font-display font-extrabold text-[4.2rem] tracking-[0.04em] text-transparent bg-clip-text bg-brand max-lg:text-[3.6rem] max-md:text-[3.4rem] max-sm:text-[3rem]">
            {initials}
          </span>
        )}
      </div>
    </div>
  );
}
