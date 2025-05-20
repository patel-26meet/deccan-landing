'use client';

import dynamic from 'next/dynamic';
import LoginHandler, { useLoginHandler, AuthEventDetail } from '@/components/auth/LoginHandler';
import CookiesWrapper from '@/components/auth/CookiesWrapper';

// Define types for Descope response
interface DescopeSuccessResponse {
  detail: AuthEventDetail;
  // Additional potential fields that might be present
  [key: string]: AuthEventDetail | string | number | boolean | object | null;
}

interface DescopeErrorResponse {
  error: string;
  message?: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

// Dynamically import the Descope component with ssr: false
const DescopeAuth = dynamic(
  () => import('@descope/nextjs-sdk').then((mod) => mod.Descope),
  { ssr: false }
);

export default function Login() {
  return (
    <CookiesWrapper>
      <LoginHandler>
        <LoginContent />
      </LoginHandler>
    </CookiesWrapper>
  );
}

// Separate the login content to ensure hooks are called within CookiesProvider
function LoginContent() {
  // Use our direct login handler hook - now inside CookiesProvider context
  const handleLoginSuccess = useLoginHandler();
  
  return (
    <div className="login-page">
        <div className="login-page__header">
            <img src="/assets/logos/deccan-logo-black.svg" alt="Deccan logo" className="login-page__logo" />
        </div>

        <div className="login-page__content">
            <div className="login-page__content-header-container">
                <div className="login-page__content-header">
                    Welcome to Soul AI
                </div>

                <div className="login-page__content-subheader">
                    Please Continue with Google to apply for the jobs in your field of interest.
                </div>
            </div>
            <div className="login-page__content-button">
                <DescopeAuth
                    flowId="soul-sign-up-in-v2"
                    theme="light"
                    onSuccess={(response: DescopeSuccessResponse) => {
                        console.log("Success! Processing authentication...", response);
                        // Directly call our login handler with the auth details
                        if (response && response.detail && response.detail.sessionJwt && response.detail.refreshJwt) {
                            handleLoginSuccess(response.detail);
                        } else {
                            console.error("Missing required auth tokens in success callback");
                        }
                    }}
                    onError={(error: DescopeErrorResponse) => {
                        console.error("Authentication error occurred", error);
                    }}
                />
            </div>
        </div>
        <div className="login-page__footer"></div>
    </div>
  );
}