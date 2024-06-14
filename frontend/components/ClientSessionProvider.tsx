// components/ClientSessionProvider.tsx
"use client";

import store from "@/lib/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

export default function ClientSessionProvider({
  session,
  children,
}: {
  session: any;
  children: any;
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>
    </SessionProvider>
  );
}
