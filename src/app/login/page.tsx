'use client';

import dynamic from 'next/dynamic';
import LoginHandler from '@/components/auth/LoginHandler';
import CookiesWrapper from '@/components/auth/CookiesWrapper';

// Dynamically import the Descope component with ssr: false
const DescopeAuth = dynamic(
  () => import('@descope/nextjs-sdk').then((mod) => mod.Descope),
  { ssr: false }
);

export default function Login() {
  return (
    <CookiesWrapper>
      <LoginHandler>
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
                        onSuccess={() => {
                            console.log("Success! Processing authentication...");
                            // LoginHandler will pick up the success event
                        }}
                        onError={() => {
                            console.error("Authentication error occurred");
                        }}
                    />
                </div>
            </div>
            <div className="login-page__footer"></div>
        </div>
      </LoginHandler>
    </CookiesWrapper>
  );
}