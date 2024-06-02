import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '@/providers/AppProviders';
import { FC, ReactNode } from 'react';


interface AppLayoutProps {
	children: ReactNode | ReactNode[];
}

export const metadata: Metadata = {
  title: {
    default: 'Property Pulse',
    template: '%s - Property Pulse',
  },
  description: 'Property Pulse',
  keywords: [],
  authors: [
    {
      name: 'Christine Kinya',
    },
  ],
  creator: 'Christine Kinya',
  icons: {
    icon: './favicon.ico',
  },
};

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body>
				<AppProviders>{children}</AppProviders>
			</body>
		</html>
	);
};

export default AppLayout;
