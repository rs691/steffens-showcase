import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('container mx-auto px-4 py-8 sm:py-12 md:py-16', className)}>
      {children}
    </div>
  );
}
