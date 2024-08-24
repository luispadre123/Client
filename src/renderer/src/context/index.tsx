import React, { ReactNode, useEffect } from "react";
import Auth from "../components/Auth";
import { ApolloProvider } from "@apollo/client";
import AuthContextProvider, { useAuth } from "./Auth.Context";
import createApolloClient from "../api/apolloClient";
import Home from "../views/Home";

interface ApolloWrapperProps {
  children: ReactNode;
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
        <Content />
      </ApolloWrapper>
    </AuthContextProvider>
  );
}

const Content: React.FC = () => {
  const { data } = useAuth();
  console.log(data, "data");

  useEffect(() => {
    if (window.api.resizeWindow) {
      if (data.token && data.token !== "undefined") {
        window.api.resizeWindow(1100, 700);
      } else {
        window.api.resizeWindow(400, 480); // Cambia el tamaño para no autenticados
      }
    }
  }, [data.token]);

  return <>{data.token && data.token !== "undefined" ? <Home /> : <Auth />}</>;
};
