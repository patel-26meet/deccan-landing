'use client';

import { Descope } from "@descope/nextjs-sdk";
import LoginHandler from '@/components/auth/LoginHandler';
import CookiesWrapper from '@/components/auth/CookiesWrapper';

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
                    <Descope
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