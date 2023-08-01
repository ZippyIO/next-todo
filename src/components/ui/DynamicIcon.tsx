'use client';

import {
  type CSSProperties,
  lazy,
  type LazyExoticComponent,
  Suspense,
  type SVGAttributes,
} from 'react';
import { IconContext, type IconType } from 'react-icons';

interface Props {
  library: string;
  icon: string;
  color?: string;
  size?: string;
  className?: string;
  style?: CSSProperties;
  attr?: SVGAttributes<SVGElement>;
  fallback: JSX.Element | null;
}

const DynamicIcon = ({ library, icon, color, size, className, style, attr, fallback }: Props) => {
  const Icon = () => {
    let SwitchIcon: LazyExoticComponent<IconType> | null = null;

    switch (library) {
      case 'di':
        SwitchIcon = lazy<IconType>(async () => {
          const mod = await import('react-icons/di');
          return { default: mod[icon as keyof IconType] ?? <div className="bg-blue-500" /> };
        });
        break;
      default:
        SwitchIcon = null;
        break;
    }

    if (!SwitchIcon) {
      return <div>Could Not Find Icon</div>;
    }

    return (
      <Suspense fallback={fallback}>
        <SwitchIcon />
      </Suspense>
    );
  };

  const value: IconContext = {
    color: color,
    size: size,
    className: className,
    style: style,
    attr: attr,
  };

  return (
    <Suspense fallback={fallback}>
      <IconContext.Provider value={value}>
        <Icon />
      </IconContext.Provider>
    </Suspense>
  );
};

export default DynamicIcon;
