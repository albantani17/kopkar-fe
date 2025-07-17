import { onErrorHander } from "@/lib/axios/responseHandler";
import "@/styles/globals.css";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Montserrat } from "next/font/google";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHander(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHander,
    },
  },
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={montserrat.className}>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider
            placement='top-right'
            toastProps={{ shouldShowTimeoutProgress: true, timeout: 2000 }}
          />
          <Component {...pageProps} />
        </HeroUIProvider>
      </QueryClientProvider>
    </main>
  );
}
