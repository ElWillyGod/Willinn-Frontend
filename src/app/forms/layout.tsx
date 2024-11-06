import type { Metadata } from 'next';
import Sidebar from '@/components/menu';

export const metadata: Metadata = {
    title: 'WillyEnWillinn',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen w-full">
            <div className="w-52 flex-shrink-0">
                <Sidebar/>
            </div>
            <div className="flex-1 bg-gray-100 p-10">{children}</div>
        </div>
    );
}