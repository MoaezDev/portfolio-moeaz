/**
 * Contact — floating-label form with neon-glow focus states. The form is
 * intentionally local-only: on submit it composes a `mailto:` link so no
 * backend or third-party service is required.
 */
import { motion } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import styled from 'styled-components';
import { Button } from '@components/Button';
import { SectionWrapper } from '@components/SectionWrapper';
import { PERSONAL } from '@constants/data';
import { fadeUp } from '@utils/motion';

const Layout = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 48px;
  align-items: stretch;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  justify-content: center;
`;

const Heading = styled.h3`
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  background: ${({ theme }) => theme.gradients.brand};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Lead = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 460px;
`;

const SocialList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  list-style: none;
  margin-top: 8px;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radii.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  background: rgba(255, 255, 255, 0.03);
  font-size: 0.9rem;
  max-width: 100%;
  transition: color 0.2s, border-color 0.2s, transform 0.2s;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 220px;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const Form = styled.form`
  position: relative;
  padding: 32px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  gap: 22px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 18px;
    gap: 16px;
  }
`;

const Field = styled.div`
  position: relative;
`;

const sharedInput = `
  width: 100%;
  padding: 22px 16px 12px;
  font-size: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(132, 142, 200, 0.18);
  outline: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: vertical;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18), 0 0 24px rgba(168, 85, 247, 0.25);
  }
`;

const Input = styled.input`
  ${sharedInput}
`;

const Textarea = styled.textarea`
  ${sharedInput}
  min-height: 130px;
`;

const FloatingLabel = styled.label<{ $active: boolean }>`
  position: absolute;
  left: 16px;
  top: ${({ $active }) => ($active ? '6px' : '18px')};
  font-size: ${({ $active }) => ($active ? '0.72rem' : '0.95rem')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textMuted)};
  pointer-events: none;
  transition: all 0.18s ease;
  letter-spacing: ${({ $active }) => ($active ? '0.08em' : '0')};
  text-transform: ${({ $active }) => ($active ? 'uppercase' : 'none')};
`;

interface FormState {
  name: string;
  email: string;
  message: string;
}

const EMPTY_FORM: FormState = { name: '', email: '', message: '' };

export function Contact(): JSX.Element {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [focused, setFocused] = useState<keyof FormState | ''>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'someone'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ''}`,
    );
    window.location.href = `mailto:${PERSONAL.email}?subject=${subject}&body=${body}`;
  };

  const isActive = (field: keyof FormState): boolean =>
    focused === field || form[field].length > 0;

  return (
    <SectionWrapper id="contact" eyebrow="Contact" title="Let's build something">
      <Layout
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Intro>
          <Heading>Open to interesting roles & freelance work.</Heading>
          <Lead>
            Got a Flutter project, a cross-platform idea, or a role you think I&apos;d enjoy?
            The fastest way to reach me is below — I read every message.
          </Lead>
          <SocialList>
            <li>
              <SocialLink href={`mailto:${PERSONAL.email}`} aria-label="Send an email">
                <HiOutlineMail />
                <span>{PERSONAL.email}</span>
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </SocialLink>
            </li>
            <li>
              <SocialLink
                href={PERSONAL.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
                <span>GitHub</span>
              </SocialLink>
            </li>
          </SocialList>
        </Intro>

        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <Input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              autoComplete="name"
            />
            <FloatingLabel htmlFor="contact-name" $active={isActive('name')}>
              Your name
            </FloatingLabel>
          </Field>

          <Field>
            <Input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              autoComplete="email"
            />
            <FloatingLabel htmlFor="contact-email" $active={isActive('email')}>
              Email address
            </FloatingLabel>
          </Field>

          <Field>
            <Textarea
              id="contact-message"
              value={form.message}
              onChange={(event) =>
                setForm((current) => ({ ...current, message: event.target.value }))
              }
              onFocus={() => setFocused('message')}
              onBlur={() => setFocused('')}
            />
            <FloatingLabel htmlFor="contact-message" $active={isActive('message')}>
              Your message
            </FloatingLabel>
          </Field>

          <div>
            <Button type="submit">Send Message</Button>
          </div>
        </Form>
      </Layout>
    </SectionWrapper>
  );
}
