import { useEffect } from "react";
import { Navbar } from "../components";
import "../styles/globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

function MyApp({ Component, pageProps }) {
  // uncomment the below line to make dark mode
  useEffect(() => {
    document.body.classList.add("bg-background"); 
    document.body.classList.add("dark");
  });

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
