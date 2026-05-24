import type { NextPageContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

interface ErrorPageProps {
  statusCode?: number;
}

const ERROR_COPY: Record<number, { title: string; message: string }> = {
  404: {
    title: '404: Bro opened the secret door',
    message:
      'This page took one look at your request and unplugged the router.',
  },
  500: {
    title: '500: Server went to mamak',
    message:
      'Something exploded quietly in the backend. The intern denies everything.',
  },
};

const ErrorPage = ({ statusCode = 500 }: ErrorPageProps): JSX.Element => {
  const copy = ERROR_COPY[statusCode] ?? {
    title: `${statusCode}: Website doing parkour`,
    message:
      'The app tripped over a cable, blamed DNS, then pretended nothing happened.',
  };

  return (
    <>
      <Head>
        <title>{copy.title}</title>
      </Head>
      <Shell>
        <Card>
          <Code>{statusCode}</Code>
          <Title>{copy.title}</Title>
          <Message>{copy.message}</Message>
          <Hint>
            No Vercel sad page here. We catch errors with our own nonsense.
          </Hint>
          <HomeLink href="/">Reboot to home</HomeLink>
        </Card>
      </Shell>
    </>
  );
};

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default ErrorPage;

const Shell = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
    radial-gradient(circle at 20% 20%, rgba(91, 105, 116, 0.22), transparent 30%),
    linear-gradient(135deg, #050707 0%, #101418 55%, #060708 100%);
  color: #d5dde3;
  font-family: 'JetBrains Mono', 'Consolas', monospace;
`;

const Card = styled.section`
  width: min(640px, 100%);
  border: 1px solid rgba(173, 186, 199, 0.28);
  background: rgba(9, 12, 15, 0.86);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.44);
  padding: clamp(24px, 6vw, 48px);
`;

const Code = styled.p`
  margin: 0 0 12px;
  color: #8b949e;
  letter-spacing: 0.32em;
  font-size: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(28px, 7vw, 58px);
  line-height: 1.02;
  color: #f2f5f7;
`;

const Message = styled.p`
  margin: 22px 0 0;
  max-width: 48ch;
  color: #b8c3cc;
  font-size: 15px;
`;

const Hint = styled.p`
  margin: 18px 0 0;
  color: #76838e;
  font-size: 12px;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  margin-top: 28px;
  border: 1px solid rgba(213, 221, 227, 0.32);
  padding: 10px 14px;
  color: #e7edf2;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);

  &:hover,
  &:focus-visible {
    background: rgba(255, 255, 255, 0.12);
    outline: none;
  }
`;
