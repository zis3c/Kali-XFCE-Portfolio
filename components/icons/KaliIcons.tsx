import React from 'react';

/**
 * Kali Linux / Xfce style SVG icons
 * Simple, flat, line-based icons matching the Xfce/Kali aesthetic
 */

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const defaultColor = 'currentColor';

/* ===== Terminal Icon ===== */
export const TerminalIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="3" width="20" height="18" rx="2" />
    <polyline points="6 9 10 12 6 15" />
    <line x1="12" y1="15" x2="18" y2="15" />
  </svg>
);

/* ===== File Manager / Thunar Icon ===== */
export const FileManagerIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6z" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

/* ===== Settings / Gear Icon ===== */
export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
  </svg>
);

/* ===== User / About Me Icon ===== */
export const UserIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

/* ===== Folder Icon ===== */
export const FolderIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
  </svg>
);

/* ===== Code / Skills Icon ===== */
export const CodeIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

/* ===== Mail / Contact Icon ===== */
export const MailIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="22 4 12 13 2 4" />
  </svg>
);

/* ===== Network Icon ===== */
export const NetworkIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12.55a11 11 0 0114.08 0" />
    <path d="M1.42 9a16 16 0 0121.16 0" />
    <path d="M8.53 16.11a6 6 0 016.95 0" />
    <circle cx="12" cy="20" r="1" fill={color} />
  </svg>
);

/* ===== Volume Icon ===== */
export const VolumeIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 010 7.07" />
    <path d="M19.07 4.93a10 10 0 010 14.14" />
  </svg>
);

/* ===== Battery Icon ===== */
export const BatteryIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
    <line x1="23" y1="10" x2="23" y2="14" />
    <rect x="3" y="8" width="12" height="8" rx="1" fill={color} opacity="0.3" />
  </svg>
);

/* ===== Applications / Grid Menu Icon ===== */
export const ApplicationsIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

/* ===== Text File Icon ===== */
export const TextFileIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="14" y2="17" />
  </svg>
);

/* ===== PDF File Icon ===== */
export const PdfFileIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <text x="7" y="18" fontSize="7" fill={color} stroke="none" fontFamily="Inter, sans-serif" fontWeight="600">
      PDF
    </text>
  </svg>
);

/* ===== Kali Dragon Silhouette (for wallpaper/branding) ===== */
export const KaliDragonIcon: React.FC<IconProps> = ({
  size = 48,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    stroke={color}
    strokeWidth="1"
    className={className}
    opacity="0.15"
  >
    <path
      d="M24 4C14 4 8 12 8 20c0 6 3 10 6 13l2 3c1 2 3 4 8 4s7-2 8-4l2-3c3-3 6-7 6-13 0-8-6-16-16-16z"
      fill={color}
      stroke="none"
    />
    <path d="M18 18c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z" fill="#0d0d17" stroke="none" />
    <path d="M26 18c0-1 1-2 2-2s2 1 2 2-1 2-2 2-2-1-2-2z" fill="#0d0d17" stroke="none" />
  </svg>
);

/* ===== Workspace / Virtual Desktop Icon ===== */
export const WorkspaceIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="9" height="9" rx="1" />
    <rect x="13" y="2" width="9" height="9" rx="1" opacity="0.3" />
    <rect x="2" y="13" width="9" height="9" rx="1" opacity="0.3" />
    <rect x="13" y="13" width="9" height="9" rx="1" opacity="0.3" />
  </svg>
);

/* ===== Power / Shutdown Icon ===== */
export const PowerIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18.36 6.64a9 9 0 11-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

/* ===== Search Icon ===== */
export const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

/* ===== Minimize Icon ===== */
export const MinimizeIcon: React.FC<IconProps> = ({
  size = 14,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    className={className}
  >
    <line x1="3" y1="11" x2="11" y2="11" />
  </svg>
);

/* ===== Maximize Icon ===== */
export const MaximizeIcon: React.FC<IconProps> = ({
  size = 14,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    className={className}
  >
    <rect x="2" y="2" width="10" height="10" rx="1" />
  </svg>
);

/* ===== Close Icon ===== */
export const CloseIcon: React.FC<IconProps> = ({
  size = 14,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    className={className}
  >
    <line x1="3" y1="3" x2="11" y2="11" />
    <line x1="11" y1="3" x2="3" y2="11" />
  </svg>
);

/* ===== Home Icon ===== */
export const HomeIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

/* ===== Download Icon ===== */
export const DownloadIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

/* ===== Desktop Icon ===== */
export const DesktopIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

/* ===== Document Icon ===== */
export const DocumentIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

/* ===== Arrow Nav Icons ===== */
export const ArrowLeftIcon: React.FC<IconProps> = ({
  size = 18,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({
  size = 18,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({
  size = 18,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

/* ===== Star / Favorites Icon ===== */
export const StarIcon: React.FC<IconProps> = ({
  size = 24,
  color = defaultColor,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
