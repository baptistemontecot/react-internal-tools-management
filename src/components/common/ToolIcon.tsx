import { useState } from 'react';
import { Box } from 'lucide-react';

interface ToolIconProps {
  iconUrl: string;
  name?: string;
  alt: string;
  className?: string;
}

export default function ToolIcon({ iconUrl, name, alt, className }: ToolIconProps) {
  const [error, setError] = useState(false);

  if (error || !iconUrl) {
    return (
      <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-400">
        <Box className={className} aria-label={`Fallback icon for ${alt}`} />
        <span>{name}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3 text-gray-800 dark:text-gray-400">
      <img src={iconUrl} alt={alt} className={className} onError={() => setError(true)} loading="lazy" />
      <span>{name}</span>
    </div>
  );
}
