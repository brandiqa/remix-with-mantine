import { RemixBrowser } from "@remix-run/react";
import { useState } from "react";
import { hydrate } from "react-dom";

import { getCache } from '@mantine/core';
import { CacheProvider } from '@emotion/react'
import { ClientStyleContext } from './context'

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({ children }: ClientCacheProviderProps) {
  const [cache, setCache] = useState(getCache({ key: 'css' }))
  function reset() { setCache(getCache({ key: 'css' })) }
  return (
    <ClientStyleContext.Provider value={{ reset }}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

hydrate(
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>,
  document
);

