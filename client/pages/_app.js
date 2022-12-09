import { Navbar } from "../components";
import "../styles/globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GoogleOAuthProvider clientId="569482349109-pahdrh7ei5pqrqp3p12trnl7i6n73qvr.apps.googleusercontent.com">
        <Navbar />
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </>
  );
}

export default MyApp;
