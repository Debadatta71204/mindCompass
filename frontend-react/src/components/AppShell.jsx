import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import PageTransition from './PageTransition';

export default function AppShell() {
  return (
    <div className="pt-[calc(2.5rem+3.5rem)]">
      <AppHeader />
      <div className="flex min-h-[calc(100vh-2.5rem-3.5rem)]">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
