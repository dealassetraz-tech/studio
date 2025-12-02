// src/firebase/client-provider.tsx
'use client';

import { FirebaseProvider } from './provider';

// This provider is a client component that wraps the main FirebaseProvider.
// It ensures that Firebase is initialized only once on the client-side.
export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FirebaseProvider>{children}</FirebaseProvider>;
}
