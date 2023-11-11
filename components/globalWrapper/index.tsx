import { ReactNode } from 'react';
import Footer from '../footer';

export function GlobalWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="h-screen flex flex-col">
            <div className="flex-1">
                {children}
            </div>
            <Footer />
        </div>
    )
}
