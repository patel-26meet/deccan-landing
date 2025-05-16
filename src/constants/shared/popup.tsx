import { TPopupContent, EnumCookieAcceptance } from "@/interfaces/components/popup.type";
import Cookies from 'js-cookie';

const cookieOptions = {
  path: "/",
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  secure: true,
  expires: 365
};

const handleCookieConsent = (isAccepted: boolean) => {
  const consentValue = isAccepted ? EnumCookieAcceptance.ACCEPT : EnumCookieAcceptance.REJECT;
  Cookies.set('cookie_consent', consentValue, cookieOptions);
  console.log(`Cookie ${consentValue}`);
};

// Helper function to check cookie consent
export const checkCookieConsent = () => {
  const cookieValue = Cookies.get('cookie_consent');
  return cookieValue === EnumCookieAcceptance.ACCEPT;
};

export const PopupDataConstant: Record<string, TPopupContent> = {
  cookie: {
    title: "Cookie Settings ",
    content: "We use cookies to enhance your experience, analyze site traffic and deliver personalized content. Read our <a class='popup-content__text-link' href='https://soulhq.ai/cookie-policy' target='_blank'>Cookie Policy</a>.",
    actions: [
      { label: "Accept All", onClick: () => handleCookieConsent(true) },
    ],
    onClose: () => handleCookieConsent(true),
  },
};