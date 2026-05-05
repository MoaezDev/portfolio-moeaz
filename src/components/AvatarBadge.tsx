/**
 * AvatarBadge — circular medallion that prefers a profile photo when
 * `imageSrc` is provided and silently falls back to gradient initials
 * if the image is missing or fails to load. Wraps everything in a
 * floating, glow-pulsing frame.
 */
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

interface AvatarBadgeProps {
  initials: string;
  imageSrc?: string;
  ariaLabel?: string;
}

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

const glowPulse = keyframes`
  0%, 100% {
    box-shadow:
      0 0 22px rgba(59, 130, 246, 0.32),
      0 0 60px rgba(168, 85, 247, 0.14);
  }
  50% {
    box-shadow:
      0 0 34px rgba(168, 85, 247, 0.38),
      0 0 80px rgba(59, 130, 246, 0.20);
  }
`;

const Frame = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.gradients.brand};
  animation:
    ${float} 6s ease-in-out infinite,
    ${glowPulse} 4s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: conic-gradient(from 90deg, #3b82f6, #a855f7, #f5c46b, #3b82f6);
    z-index: -1;
    filter: blur(14px);
    opacity: 0.38;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 150px;
    height: 150px;
  }
`;

const Inner = styled.div<{ $hasImage: boolean }>`
  position: relative;
  width: calc(100% - 8px);
  height: calc(100% - 8px);
  border-radius: 50%;
  overflow: hidden;
  display: grid;
  place-items: center;
  background: ${({ theme, $hasImage }) =>
    $hasImage ? theme.colors.background : theme.colors.background};
`;

const InitialsText = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-weight: 800;
  font-size: 3.6rem;
  letter-spacing: 0.04em;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: ${({ theme }) => theme.gradients.brand};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 3rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2.6rem;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export function AvatarBadge({
  initials,
  imageSrc,
  ariaLabel = 'Personal avatar',
}: AvatarBadgeProps): JSX.Element {
  const [imageBroken, setImageBroken] = useState(false);
  const showPhoto = Boolean(imageSrc) && !imageBroken;

  return (
    <Frame role="img" aria-label={ariaLabel}>
      <Inner $hasImage={showPhoto}>
        {showPhoto ? (
          <Photo
            src={imageSrc}
            alt={ariaLabel}
            loading="eager"
            decoding="async"
            onError={() => setImageBroken(true)}
          />
        ) : (
          <InitialsText>{initials}</InitialsText>
        )}
      </Inner>
    </Frame>
  );
}
