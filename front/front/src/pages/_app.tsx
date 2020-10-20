import { AuthProvider, ProtectRoute } from "../hooks/useAuth";
import GlobalStyle from "../styles/GlobalStyle";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />

      <AuthProvider>
        <ProtectRoute>
          <Component {...pageProps} />
        </ProtectRoute>
      </AuthProvider>
    </>
  );
}
