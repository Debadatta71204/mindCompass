import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DisclaimerBanner from './components/DisclaimerBanner';
import LandingScreen from './components/LandingScreen';
import AppShell from './components/AppShell';
import HomeView from './components/HomeView';

const ScreeningView = lazy(() => import('./modules/screening/ScreeningView'));
const CompanionView = lazy(() => import('./modules/companion/CompanionView'));
const EducationView = lazy(() => import('./modules/education/EducationView'));
const SoundlullView = lazy(() => import('./modules/soundlull/SoundlullView'));

function LazyFallback() {
  return (
    <div className="flex items-center justify-center min-h-[400px] opacity-0 animate-fade-in"
      style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-2.5 h-2.5 rounded-full bg-emerald-mid animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <DisclaimerBanner />
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<HomeView />} />
          <Route
            path="screening"
            element={<Suspense fallback={<LazyFallback />}><ScreeningView /></Suspense>}
          />
          <Route
            path="companion"
            element={<Suspense fallback={<LazyFallback />}><CompanionView /></Suspense>}
          />
          <Route
            path="education"
            element={<Suspense fallback={<LazyFallback />}><EducationView /></Suspense>}
          />
          <Route
            path="soundlull"
            element={<Suspense fallback={<LazyFallback />}><SoundlullView /></Suspense>}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
