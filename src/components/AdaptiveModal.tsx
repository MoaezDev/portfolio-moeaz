/**
 * AdaptiveModal — accessible overlay that renders as a centered modal on
 * desktop and as a bottom-anchored drawer on mobile. Closes on Escape or
 * backdrop tap. Locks body scroll while open. Children control their own
 * padding so the surface can host edge-to-edge content like cover images.
 */
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useMediaQuery } from '@hooks/useMediaQuery';

interface AdaptiveModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  maxWidth?: number;
}

const desktopMotion = {
  initial: { opacity: 0, scale: 0.94, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96 },
};

const mobileMotion = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
};

export const AdaptiveModal = ({
  open,
  onClose,
  children,
  ariaLabel,
  ariaLabelledBy,
  maxWidth = 560,
}: AdaptiveModalProps): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  const motionProps = isMobile ? mobileMotion : desktopMotion;
  const transition = isMobile
    ? { type: 'spring' as const, stiffness: 320, damping: 34, mass: 0.7 }
    : { duration: 0.32, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="presentation"
          className="fixed inset-0 z-overlay bg-[rgba(4,6,18,0.78)] backdrop-blur-md grid place-items-center p-6 max-md:p-0 max-md:items-end"
        >
          <motion.div
            initial={motionProps.initial}
            animate={motionProps.animate}
            exit={motionProps.exit}
            transition={transition}
            onClick={(event) => event.stopPropagation()}
            drag={isMobile ? 'y' : false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabelledBy ? undefined : ariaLabel}
            aria-labelledby={ariaLabelledBy}
            style={{ maxWidth: isMobile ? '100%' : `${maxWidth}px` }}
            className={clsx(
              'relative w-full overflow-hidden bg-surface-solid border border-border text-text shadow-card flex flex-col',
              isMobile
                ? 'max-h-[88vh] rounded-t-lg border-b-0'
                : 'max-h-[calc(100vh-48px)] rounded-lg',
            )}
          >
            {isMobile && (
              <div className="relative flex-shrink-0 h-[22px] grid place-items-center before:content-[''] before:w-11 before:h-1 before:rounded-pill before:bg-white/[0.18]" />
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-3 right-3 w-[34px] h-[34px] grid place-items-center rounded-full bg-[rgba(6,8,26,0.65)] text-text text-base z-[3] border border-border hover:bg-[rgba(6,8,26,0.9)]"
            >
              <HiOutlineX />
            </button>
            <div className="overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
