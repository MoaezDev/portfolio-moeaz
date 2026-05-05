/**
 * Button — primary action element with two visual variants (filled gradient
 * and outlined glass) and optional icon slots. Renders as an anchor when
 * `href` is provided, otherwise as a native button.
 */
import type { MouseEventHandler, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
  external?: boolean;
}

const sharedStyles = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 26px;
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.radii.pill};
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
  letter-spacing: 0.01em;

  &:hover {
    transform: translateY(-2px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 12px 20px;
    font-size: 0.9rem;
  }
`;

const PrimaryStyles = css`
  ${sharedStyles};
  color: #ffffff;
  background: ${({ theme }) => theme.gradients.brand};
  box-shadow: ${({ theme }) => theme.shadows.glowBlue};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glowViolet};
  }
`;

const GhostStyles = css`
  ${sharedStyles};
  color: ${({ theme }) => theme.colors.text};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(8px);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledAnchor = styled.a<{ $variant: ButtonVariant }>`
  ${({ $variant }) => ($variant === 'primary' ? PrimaryStyles : GhostStyles)};
`;

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  ${({ $variant }) => ($variant === 'primary' ? PrimaryStyles : GhostStyles)};
`;

export function Button({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  icon,
  external = false,
}: ButtonProps): JSX.Element {
  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <StyledAnchor
        href={href}
        $variant={variant}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {content}
      </StyledAnchor>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <StyledButton type={type} $variant={variant} onClick={onClick}>
      {content}
    </StyledButton>
  );
}
