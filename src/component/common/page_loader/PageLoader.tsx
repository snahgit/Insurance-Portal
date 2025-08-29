import React from 'react';
import { Loader, useMantineColorScheme } from '@mantine/core';
import './PageLoader.scss';

export type LoaderType =
  | 'spinner'
  | 'dots'
  | 'bars'
  | 'oval'
  | 'skeleton'
  | 'pulse'
  | 'bounce'
  | 'wave'
  | 'custom';

interface PageLoaderProps {
  type?: LoaderType;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  type = 'spinner',
  size = 'md',
  color = '#228be6',
  text = 'Loading...',
  fullScreen = false,
  className = ''
}) => {
  const { colorScheme } = useMantineColorScheme();

  // Dynamic color based on theme
  const getThemeColor = () => {
    if (color !== '#228be6') return color; // Use custom color if provided
    return colorScheme === 'dark' ? '#74c0fc' : '#228be6'; // Light blue for dark mode, default blue for light mode
  };

  const renderLoader = () => {
    const themeColor = getThemeColor();
    
    switch (type) {
      case 'spinner':
        return <Loader type="dots" size={size} color={themeColor} />;

      case 'dots':
        return (
          <div className="dots-loader">
            <div className="dot" style={{ backgroundColor: themeColor }}></div>
            <div className="dot" style={{ backgroundColor: themeColor }}></div>
            <div className="dot" style={{ backgroundColor: themeColor }}></div>
          </div>
        );

      case 'bars':
        return (
          <div className="bars-loader">
            <div className="bar" style={{ backgroundColor: themeColor }}></div>
            <div className="bar" style={{ backgroundColor: themeColor }}></div>
            <div className="bar" style={{ backgroundColor: themeColor }}></div>
            <div className="bar" style={{ backgroundColor: themeColor }}></div>
          </div>
        );

      case 'oval':
        return (
          <div className="oval-loader" style={{ borderTopColor: themeColor }}>
          </div>
        );

      case 'skeleton':
        return (
          <div className="skeleton-loader">
            <div className="skeleton-line skeleton-line-1"></div>
            <div className="skeleton-line skeleton-line-2"></div>
            <div className="skeleton-line skeleton-line-3"></div>
          </div>
        );

      case 'pulse':
        return (
          <div className="pulse-loader" style={{ backgroundColor: themeColor }}>
          </div>
        );

      case 'bounce':
        return (
          <div className="bounce-loader">
            <div className="bounce-ball" style={{ backgroundColor: themeColor }}></div>
            <div className="bounce-ball" style={{ backgroundColor: themeColor }}></div>
            <div className="bounce-ball" style={{ backgroundColor: themeColor }}></div>
          </div>
        );

      case 'wave':
        return (
          <div className="wave-loader">
            <div className="wave-bar" style={{ backgroundColor: themeColor }}></div>
            <div className="wave-bar" style={{ backgroundColor: themeColor }}></div>
            <div className="wave-bar" style={{ backgroundColor: themeColor }}></div>
            <div className="wave-bar" style={{ backgroundColor: themeColor }}></div>
            <div className="wave-bar" style={{ backgroundColor: themeColor }}></div>
          </div>
        );

      case 'custom':
        return (
          <div className="custom-loader">
            <div className="custom-spinner" style={{ borderColor: `${themeColor}20`, borderTopColor: themeColor }}>
              <div className="custom-inner" style={{ borderColor: `${themeColor}40`, borderRightColor: themeColor }}></div>
            </div>
          </div>
        );

      default:
        return <Loader type="dots" size={size} color={themeColor} />;
    }
  };

  const containerClass = `
    page-loader-container 
    ${fullScreen ? 'full-screen' : ''} 
    ${colorScheme === 'dark' ? 'dark-theme' : 'light-theme'}
    ${className}
  `.trim();

  return (
    <div className={containerClass}>
      <div className="loader-content">
        {renderLoader()}
        {text && <p className="loader-text">{text}</p>}
      </div>
    </div>
  );
};

export default PageLoader;
