import React from 'react';

interface IconProps {
  className?: string;
}

export const GhidraIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Stylized NSA Ghidra dragon head emblem */}
    <path d="M19.8 3.2c-1.7.3-3.2 1.1-4.3 2.4-.6-.9-1.6-1.7-2.8-2.1l1.2-1.8-2.8 1.2C9.5 2.4 7.7 2.8 6.3 3.9L4.4 2.5l.6 2.5C3.4 6.5 2.5 8.5 2.5 10.7c0 1.4.4 2.7 1.1 3.8l-1.5 1.9 2.9-.2c1 1 2.4 1.6 3.9 1.8l-.9 2.7 2.8-1.9c.7.1 1.4.2 2.1.2 4.7 0 8.5-3.6 8.5-8.1 0-1.6-.5-3.1-1.3-4.3l1.7-3.4-2 .4zM9.2 10.8a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6zm6.1 2.9c-1.4 1.2-3.4 1.7-5.5 1.3l-.5-1.4c1.9.3 3.6-.1 4.7-1.1l1.3 1.2zm.7-2.9a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z" />
  </svg>
);

export const IdaProIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Hex-Rays IDA Pro hexagon with Ada Lovelace silhouette */}
    <path d="M12 1.25 2.6 6.68v10.64L12 22.75l9.4-5.43V6.68L12 1.25zm0 2.18 7.5 4.33v8.48L12 20.57l-7.5-4.33V7.76L12 3.43zm.15 2.42c-1.88 0-3.28 1.3-3.28 3.22 0 1.04.32 1.92.84 2.52-.22.45-.58.92-.92 1.28-.66.7-.98 1.47-.98 2.57v1.18h8.54v-1.18c0-1.1-.34-1.87-1-2.57-.34-.36-.69-.83-.91-1.28.52-.6.84-1.48.84-2.52 0-1.92-1.21-3.22-3.13-3.22z" />
  </svg>
);

export const BinaryNinjaIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Vector 35 Binary Ninja four-blade shuriken */}
    <path d="M12 1.5c1.5 3.3 2.4 5.7 2.2 8.2 2.5-.2 4.9.7 8.3 2.3-3.3 1.5-5.7 2.4-8.2 2.2.2 2.5-.7 4.9-2.3 8.3-1.5-3.3-2.4-5.7-2.2-8.2-2.5.2-4.9-.7-8.3-2.3 3.3-1.5 5.7-2.4 8.2-2.2-.2-2.5.7-4.9 2.3-8.3zm0 8.3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4z" />
  </svg>
);

export const X64dbgIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* x64dbg debugging beetle/bug emblem */}
    <path d="M15.4 5.2 17 3.1l-1.4-1.1-1.7 2.2a5.2 5.2 0 0 0-3.8 0L8.4 2 7 3.1l1.6 2.1A4.4 4.4 0 0 0 7.1 8H4v1.8h2.6c-.1.5-.1 1-.1 1.5v.9H3.2V14h3.4c.1.8.3 1.6.6 2.3L4.5 18.4l1.1 1.4 2.6-2a5.5 5.5 0 0 0 7.6 0l2.6 2 1.1-1.4-2.7-2.1c.3-.7.5-1.5.6-2.3h3.4v-1.8h-3.3v-.9c0-.5 0-1-.1-1.5H20V8h-3.1a4.4 4.4 0 0 0-1.5-2.8zm-4.3 5.1h1.8v7.4h-1.8v-7.4z" />
  </svg>
);

export const FridaIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Frida geometric F mark */}
    <path d="M5 3.5h14.5l-2.3 4.2H9.6v2.7h6.9l-2.1 4H9.6v6.1H5V3.5z" />
  </svg>
);

export const GoogleFormsIcon = ({ className }: IconProps): JSX.Element => (
  <svg
    className={className}
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Google Forms document emblem */}
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zm-.5 6V3.5L18.5 8H14zM8.5 11.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0 3.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm2.5-6.7h5.5v1.4H11v-1.4zm0 3.5h5.5v1.4H11v-1.4zm0 3.5h5.5v1.4H11v-1.4z" />
  </svg>
);
