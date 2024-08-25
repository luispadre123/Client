import React from "react";
import { ApolloProvider } from "@apollo/client";
import AuthContextProvider, { useAuth } from "./Auth.Context";
import createApolloClient from "../api/apolloClient";
import AppRouter from "../router"; // Asegúrate de que el path es correcto

interface ApolloWrapperProps {
  children: React.ReactNode;
}

const ApolloWrapper = ({ children }: ApolloWrapperProps) => {
  const { data } = useAuth();
  const client = createApolloClient(data.token);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default function App() {
  return (
      <AuthContextProvider>
        <ApolloWrapper>
          <AppRouter />
        </ApolloWrapper>
      </AuthContextProvider>
  );
}
