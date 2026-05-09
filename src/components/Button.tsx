/**
 * Button — primary action element with two visual variants (filled gradient
 * and outlined glass) and optional icon slots. Renders as an anchor when
 * `href` is provided, otherwise as a native button.
 */
import clsx from 'clsx';
import type { MouseEventHandler, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: MouseEventHandler<HTMLElement>;
  icon?: ReactNode;
  external?: boolean;
  disabled?: boolean;
}

const SHARED =
  'inline-flex items-center justify-center gap-2.5 px-[26px] py-3.5 font-semibold text-[0.95rem] whitespace-nowrap rounded-pill tracking-[0.01em] transition-[transform,box-shadow,background] duration-[250ms] hover:-translate-y-0.5 max-sm:px-5 max-sm:py-3 max-sm:text-[0.9rem] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0';

const PRIMARY = 'text-white bg-brand shadow-glow-blue hover:shadow-glow-violet';

const GHOST =
  'text-text bg-white/[0.04] border border-border backdrop-blur-md hover:bg-white/[0.08] hover:border-primary';

function classes(variant: ButtonVariant): string {
  return clsx(SHARED, variant === 'primary' ? PRIMARY : GHOST);
}

export const Button = ({
  children,
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  icon,
  external = false,
  disabled = false,
}: ButtonProps): JSX.Element => {
  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
        className={classes(variant)}
      >
        {content}
      </a>
    );
  }

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} onClick={onClick} disabled={disabled} className={classes(variant)}>
      {content}
    </button>
  );
};
