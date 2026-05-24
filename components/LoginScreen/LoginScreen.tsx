import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

interface Props {
  isVisible: boolean;
  onLoginComplete: () => void;
}

/**
 * Kali LightDM-style login screen
 */
const LoginScreen = ({ isVisible, onLoginComplete }: Props): JSX.Element => {
  const DEMO_PASSWORD = process.env.NEXT_PUBLIC_DEMO_PASSWORD || '1234';
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'authenticating' | 'starting'>(
    'idle'
  );
  const [loginError, setLoginError] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    setStatus('idle');
    setPassword('');
    setLoginError('');

    const formatTime = () =>
      new Date().toLocaleString('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      });

    setCurrentTime(formatTime());
    const timer = setInterval(() => setCurrentTime(formatTime()), 30000);

    return () => clearInterval(timer);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;
    setTimeout(() => inputRef.current?.focus(), 250);
  }, [isVisible]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;
    if (password !== DEMO_PASSWORD) {
      setLoginError('Authentication failed. Hint: 1234');
      return;
    }
    setLoginError('');

    setStatus('authenticating');
    setTimeout(() => {
      setStatus('starting');
      setTimeout(() => onLoginComplete(), 900);
    }, 700);
  };

  if (!isVisible) return <></>;

  return (
    <Container>
      <Wallpaper />
      <Backdrop />

      <TopPanel>
        <PanelLeft>
          <BrandDot />
          <span>kali</span>
        </PanelLeft>

        <PanelRight>
          <span>{currentTime}</span>
          <span>en_US.UTF-8</span>
          <StatusItem title="Network connected">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 12.55a11 11 0 0 1 14.08 0" />
              <path d="M1.42 9a16 16 0 0 1 21.16 0" />
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
              <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
            </svg>
          </StatusItem>
          <StatusItem title="Power menu">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
              <line x1="12" y1="2" x2="12" y2="12" />
            </svg>
          </StatusItem>
        </PanelRight>
      </TopPanel>

      <LoginPanel>
        <Avatar>
          <Image
            src="/assets/avatars/memoji-zi.jpg"
            alt="User avatar"
            width={62}
            height={62}
            objectFit="cover"
          />
        </Avatar>
        <Username>zis3c</Username>

        {status === 'idle' ? (
          <LoginForm onSubmit={handleLogin}>
            <InputRow>
              <InputLabel>Password</InputLabel>
              <PasswordInput
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (loginError) setLoginError('');
                }}
                placeholder="Enter password"
              />
            </InputRow>
            {loginError && <ErrorText>{loginError}</ErrorText>}

            <Actions>
              <LoginButton type="submit">Log In</LoginButton>
            </Actions>
          </LoginForm>
        ) : (
          <StatusBox>
            <StatusText>
              {status === 'authenticating'
                ? 'Authenticating...'
                : 'Starting Xfce session...'}
            </StatusText>
          </StatusBox>
        )}
      </LoginPanel>

      <Footer>
        <span>kali tty7</span>
        <span>Kali GNU/Linux Rolling</span>
      </Footer>
    </Container>
  );
};

export default LoginScreen;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: ${fadeIn} 0.32s ease both;
`;

const Wallpaper = styled.div`
  position: absolute;
  inset: 0;
  background: url('/kali-neon.png') center/cover no-repeat;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(
      ellipse at center,
      rgba(10, 14, 19, 0.25) 0%,
      rgba(10, 14, 19, 0.58) 60%,
      rgba(10, 14, 19, 0.72) 100%
    ),
    rgba(8, 10, 12, 0.24);
`;

const TopPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: rgba(215, 220, 226, 0.92);
  font-size: 11px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  background: linear-gradient(
    180deg,
    rgba(45, 49, 57, 0.95) 0%,
    rgba(31, 35, 42, 0.95) 100%
  );
  border-bottom: 1px solid rgba(8, 10, 12, 0.86);
  z-index: 2;
`;

const PanelLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const BrandDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #63d0ff;
  box-shadow: 0 0 6px rgba(99, 208, 255, 0.65);
`;

const PanelRight = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatusItem = styled.span`
  display: inline-flex;
  align-items: center;
  color: rgba(205, 212, 220, 0.9);
`;

const LoginPanel = styled.div`
  position: relative;
  z-index: 2;
  width: 356px;
  padding: 22px 24px 18px;
  background: linear-gradient(180deg, #262d35 0%, #1f252c 100%);
  border: 1px solid rgba(10, 12, 15, 0.9);
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
`;

const Avatar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 50%;
  margin: 0 auto 8px;
  overflow: hidden;
  border: 1px solid rgba(150, 160, 172, 0.35);

  span {
    display: block !important;
  }
`;

const Username = styled.div`
  text-align: center;
  margin-bottom: 14px;
  color: rgba(225, 229, 234, 0.96);
  font-size: 14px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputRow = styled.label`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 6px;
`;

const InputLabel = styled.span`
  font-size: 11px;
  color: rgba(188, 197, 208, 0.92);
  text-align: left;
`;

const baseControl = `
  width: 100%;
  height: 28px;
  background: #11161c;
  border: 1px solid #3a434d;
  color: #d6dce2;
  font-size: 11px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  padding: 0 8px;
  outline: none;
  border-radius: 0;
`;

const PasswordInput = styled.input`
  ${baseControl}

  &::placeholder {
    color: rgba(150, 160, 170, 0.62);
  }

  &:focus {
    border-color: #6a9ade;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
`;

const ErrorText = styled.div`
  margin-left: 0;
  margin-top: 2px;
  font-size: 10px;
  color: #ff8f8f;
`;

const LoginButton = styled.button`
  height: 28px;
  min-width: 86px;
  padding: 0 14px;
  background: linear-gradient(180deg, #3b4652 0%, #2f3943 100%);
  border: 1px solid #505b67;
  color: rgba(224, 229, 236, 0.95);
  font-size: 11px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
  cursor: pointer;

  &:hover {
    background: linear-gradient(180deg, #465362 0%, #35414b 100%);
  }
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 88px;
`;

const StatusText = styled.div`
  font-size: 11px;
  color: rgba(188, 197, 208, 0.86);
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 12px;
  right: 12px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  color: rgba(200, 208, 216, 0.58);
  font-size: 10px;
  font-family: 'Noto Sans', 'Cantarell', sans-serif;
`;
