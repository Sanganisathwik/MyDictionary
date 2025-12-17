"use client";

import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/lib/store";
import { apolloClient } from "@/lib/apollo";
import { theme } from "@/lib/theme";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}