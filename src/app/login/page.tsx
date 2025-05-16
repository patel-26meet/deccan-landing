'use client';

export default function Login() {
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
                Descope login!
            </div>
        </div>

        <div className="login-page__footer"></div>
    </div>
);
}