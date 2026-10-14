import type { FC, SVGProps } from "react";

export type IconName =
  | "arrow_forward"
  | "arrow_downward"
  | "arrow_upward"
  | "arrow_outward"
  | "mail"
  | "send"
  | "sync"
  | "shuffle"
  | "restart_alt"
  | "military_tech"
  | "award_star"
  | "menu"
  | "close";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
  label?: string;
}

export const Icon: FC<IconProps> = ({
  name,
  size = "1em",
  className = "",
  label,
  ...props
}) => {
  const commonProps = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    className: `inline-block shrink-0 align-middle ${className}`,
    "aria-hidden": label ? undefined : true,
    "aria-label": label,
    role: label ? "img" : undefined,
    ...props,
  };

  switch (name) {
    case "arrow_forward":
      return (
        <svg {...commonProps}>
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
        </svg>
      );

    case "arrow_downward":
      return (
        <svg {...commonProps}>
          <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8z" />
        </svg>
      );

    case "arrow_upward":
      return (
        <svg {...commonProps}>
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8z" />
        </svg>
      );

    case "arrow_outward":
      return (
        <svg {...commonProps}>
          <path d="M6 6v2h8.59L4 18.59 5.41 20 16 9.41V18h2V6z" />
        </svg>
      );

    case "mail":
      return (
        <svg {...commonProps}>
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );

    case "send":
      return (
        <svg {...commonProps}>
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      );

    case "sync":
      return (
        <svg {...commonProps}>
          <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
        </svg>
      );

    case "shuffle":
      return (
        <svg {...commonProps}>
          <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" />
        </svg>
      );

    case "restart_alt":
      return (
        <svg {...commonProps}>
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
        </svg>
      );

    case "military_tech":
      return (
        <svg {...commonProps}>
          <path d="M17 10.43V2H7v8.43l5 2.86 5-2.86zM9 4h6v5.29l-3 1.71-3-1.71V4zm4 9.87l4.44 2.54-1.15-5.01L12 13.87zm-2 0l-4.29-2.46-1.15 5.01L11 13.87zm1 1.63l-3.09 1.8.82-3.52-2.73-2.37 3.6-.31L12 7.77l1.4 3.33 3.6.31-2.73 2.37.82 3.52L12 15.5z" />
        </svg>
      );

    case "award_star":
      return (
        <svg {...commonProps}>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );

    case "menu":
      return (
        <svg {...commonProps}>
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg>
      );

    case "close":
      return (
        <svg {...commonProps}>
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      );

    default:
      return null;
  }
};

export default Icon;
