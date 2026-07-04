type IconProps = {
  className?: string;
};

export function DestinationsIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function PlatformIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="3" y="11" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13" y="11" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function PaymentIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M2 10h20" stroke="currentColor" strokeWidth="1.75" />
      <path d="M6 15h4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function ServiceIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l2.09 4.24 4.68.68-3.39 3.3.8 4.66L12 14.27l-4.18 2.2.8-4.66-3.39-3.3 4.68-.68L12 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const WHY_CHOOSE_US_ICONS = {
  management: DestinationsIcon,
  "b2b-platform": PlatformIcon,
  "online-payment": PaymentIcon,
  "world-class-service": ServiceIcon,
} as const;
