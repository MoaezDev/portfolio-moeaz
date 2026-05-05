/**
 * Footer — minimal closing strip with credit and social links.
 */
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import styled from 'styled-components';
import { PERSONAL } from '@constants/data';

const Wrapper = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: ${({ theme }) => theme.colors.textDim};
  font-size: 0.88rem;
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    max-width: 1180px;
    margin: 0 auto;
    text-align: left;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 22px 16px;
    font-size: 0.82rem;
  }
`;

const SocialList = styled.ul`
  display: flex;
  gap: 14px;
  list-style: none;
`;

const SocialLink = styled.a`
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export function Footer(): JSX.Element {
  return (
    <Wrapper>
      <span>
        © {new Date().getFullYear()} {PERSONAL.name}. Built with React, TypeScript &
        Framer Motion.
      </span>
      <SocialList>
        <li>
          <SocialLink href={PERSONAL.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
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
          </SocialLink>
        </li>
        <li>
          <SocialLink href={`mailto:${PERSONAL.email}`} aria-label="Email">
            <HiOutlineMail />
          </SocialLink>
        </li>
      </SocialList>
    </Wrapper>
  );
}
