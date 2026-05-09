/**
 * Footer — minimal closing strip with credit and social links.
 */
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { PERSONAL } from '@constants/data';

const SOCIAL_LINK =
  'grid place-items-center w-[38px] h-[38px] rounded-full border border-border text-text-muted transition-[color,border-color,transform] duration-200 hover:text-text hover:border-primary hover:-translate-y-0.5';

export const Footer = (): JSX.Element => (
    <footer className="border-t border-border px-6 py-7 flex flex-col items-center gap-3.5 text-text-dim text-[0.88rem] text-center md:flex-row md:justify-between md:max-w-[1180px] md:mx-auto md:text-left max-sm:px-4 max-sm:py-5 max-sm:text-[0.82rem]">
      <span>
        © {new Date().getFullYear()} {PERSONAL.name}. Built with React, TypeScript & Framer
        Motion.
      </span>
      <ul className="flex gap-3.5 list-none">
        <li>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className={SOCIAL_LINK}
          >
            <FaGithub />
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
          </a>
        </li>
        <li>
          <a href={`mailto:${PERSONAL.email}`} aria-label="Email" className={SOCIAL_LINK}>
            <HiOutlineMail />
          </a>
        </li>
      </ul>
    </footer>
  )
