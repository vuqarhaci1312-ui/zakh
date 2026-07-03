import { SERVICE_ICON_PATHS } from "./our-services-data";

export default function ServiceIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" className="service-icon" aria-hidden="true">
      <path d={SERVICE_ICON_PATHS[0]} fill="currentColor" />
      <path d={SERVICE_ICON_PATHS[1]} fill="currentColor" />
    </svg>
  );
}
