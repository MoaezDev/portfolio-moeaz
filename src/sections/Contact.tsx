/**
 * Contact — floating-label form with neon-glow focus states. Submission is
 * delegated to the useWeb3FormsSubmit hook; this component just owns the
 * inputs, the validation rules, and the presentation.
 */
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineCheckCircle, HiOutlineExclamationCircle, HiOutlineMail } from 'react-icons/hi';
import { LuLoader } from 'react-icons/lu';
import { Button } from '@components/Button';
import { SectionWrapper } from '@components/SectionWrapper';
import { PERSONAL } from '@constants/data';
import { useWeb3FormsSubmit } from '@hooks/useWeb3FormsSubmit';
import { fadeUp } from '@utils/motion';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', message: '' };

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
const SUCCESS_MESSAGE = "Thanks — your message is on its way. I'll get back to you soon.";

const INPUT_BASE =
  'w-full px-4 pt-[22px] pb-3 text-base rounded-[12px] bg-white/[0.03] border border-border outline-none text-inherit transition-[border-color,box-shadow] duration-200 resize-y focus:border-primary focus:shadow-[0_0_0_4px_rgba(59,130,246,0.18),0_0_24px_rgba(168,85,247,0.25)] disabled:opacity-60 disabled:cursor-not-allowed';

const SOCIAL_LINK =
  'inline-flex items-center gap-2 px-3.5 py-2.5 rounded-pill border border-border text-text-muted bg-white/[0.03] text-[0.9rem] max-w-full transition-[color,border-color,transform] duration-200 hover:text-text hover:border-primary hover:-translate-y-0.5 [&>span]:overflow-hidden [&>span]:text-ellipsis [&>span]:whitespace-nowrap [&>span]:max-w-[220px]';

export const Contact = (): JSX.Element => {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [focused, setFocused] = useState<keyof FormState | ''>('');
  const { submit, setError, status, feedback } = useWeb3FormsSubmit(ACCESS_KEY, {
    successMessage: SUCCESS_MESSAGE,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in your name, email, and message.');
      return;
    }

    const result = await submit({
      name: form.name,
      email: form.email,
      message: form.message,
      subject: `Portfolio enquiry from ${form.name}`,
      from_name: `${PERSONAL.shortName}.dev contact form`,
    });

    if (result.ok) setForm(EMPTY_FORM);
  };

  const isActive = (field: keyof FormState): boolean => focused === field || form[field].length > 0;

  const labelClasses = (active: boolean): string =>
    clsx(
      'absolute left-4 pointer-events-none transition-all duration-[180ms]',
      active
        ? 'top-1.5 text-[0.72rem] text-primary tracking-[0.08em] uppercase'
        : 'top-[18px] text-[0.95rem] text-text-muted tracking-normal normal-case',
    );

  const isSubmitting = status === 'submitting';

  return (
    <SectionWrapper id="contact" eyebrow="Contact" title="Let's build something">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-[1fr_1.2fr] gap-12 items-stretch max-lg:grid-cols-1 max-lg:gap-8"
      >
        <div className="flex flex-col gap-[18px] justify-center">
          <h3 className="text-[clamp(1.6rem,3vw,2.1rem)] bg-brand bg-clip-text text-transparent">
            Open to interesting roles & freelance work.
          </h3>
          <p className="text-text-muted max-w-[460px]">
            Got a Flutter project, a cross-platform idea, or a role you think I&apos;d enjoy? The
            fastest way to reach me is below — I read every message.
          </p>
          <ul className="flex flex-wrap gap-3 list-none mt-2">
            <li>
              <a
                href={`mailto:${PERSONAL.email}`}
                aria-label="Send an email"
                className={SOCIAL_LINK}
              >
                <HiOutlineMail />
                <span>{PERSONAL.email}</span>
              </a>
            </li>
            <li>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={SOCIAL_LINK}
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
            </li>
            <li>
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className={SOCIAL_LINK}
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </li>
          </ul>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative p-8 rounded-lg bg-surface border border-border backdrop-blur-[14px] flex flex-col gap-[22px] max-sm:p-5 max-sm:gap-4"
        >
          {/* Honeypot — bots fill this, humans don't see it. */}
          <input
            type="checkbox"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div className="relative">
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              autoComplete="name"
              disabled={isSubmitting}
              className={INPUT_BASE}
            />
            <label htmlFor="contact-name" className={labelClasses(isActive('name'))}>
              Your name
            </label>
          </div>

          <div className="relative">
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              autoComplete="email"
              disabled={isSubmitting}
              className={INPUT_BASE}
            />
            <label htmlFor="contact-email" className={labelClasses(isActive('email'))}>
              Email address
            </label>
          </div>

          <div className="relative">
            <textarea
              id="contact-message"
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused('')}
              disabled={isSubmitting}
              className={`${INPUT_BASE} min-h-[130px]`}
            />
            <label htmlFor="contact-message" className={labelClasses(isActive('message'))}>
              Your message
            </label>
          </div>

          {feedback && (
            <div
              role={status === 'error' ? 'alert' : 'status'}
              aria-live="polite"
              className={clsx(
                'flex items-start gap-2 text-[0.88rem] px-3.5 py-3 rounded-md border',
                status === 'success' && 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200',
                status === 'error' && 'border-danger/40 bg-danger/10 text-danger',
              )}
            >
              {status === 'success' ? (
                <HiOutlineCheckCircle className="mt-0.5 shrink-0 text-base" />
              ) : (
                <HiOutlineExclamationCircle className="mt-0.5 shrink-0 text-base" />
              )}
              <span>{feedback}</span>
            </div>
          )}

          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  Sending
                  <LuLoader aria-hidden="true" className="animate-spin text-xl" />
                </span>
              ) : (
                'Send Message'
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </SectionWrapper>
  );
};
