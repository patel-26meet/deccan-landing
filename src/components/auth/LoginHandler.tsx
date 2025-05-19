import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

interface ILoginHandlerProps {
  children: React.ReactNode;
}

interface AuthEventDetail {
  refreshJwt: string;
  sessionJwt: string;
  [key: string]: string | number | boolean | object | null;
}

const LoginHandler: React.FC<ILoginHandlerProps> = ({ children }) => {
  const router = useRouter();
  const [, setCookie] = useCookies(['token', 'refreshToken']);
  const isHandlerAttached = useRef(false);

  useEffect(() => {
    if (isHandlerAttached.current) return;

    const handleLoginSuccess = (event: Event) => {
      const customEvent = event as CustomEvent<AuthEventDetail>;
      const { refreshJwt, sessionJwt } = customEvent.detail;

      const cookieOptions = {
        path: "/",
        domain: process.env.NEXT_PUBLIC_DOMAIN,
        secure: true,
      };
      console.log(
        "sessionJwt",
        sessionJwt,
        "refreshJwt",
        refreshJwt,
        "cookieOptions",
        cookieOptions
      );
      
      setCookie("token", sessionJwt, cookieOptions);
      setCookie("refreshToken", refreshJwt, cookieOptions);
      
      // Redirect to platform.delta.soulhq.ai
      window.location.href = 'https://platform.delta.soulhq.ai';
    };

    const handleLoginFailure = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.error('Login failed:', customEvent.detail);
    };

    // Add event listeners to the document
    document.addEventListener('success', handleLoginSuccess as EventListener);
    document.addEventListener('failure', handleLoginFailure as EventListener);
    
    isHandlerAttached.current = true;

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('success', handleLoginSuccess as EventListener);
      document.removeEventListener('failure', handleLoginFailure as EventListener);
    };
  }, [router, setCookie]);

  return <>{children}</>;
};

export default LoginHandler; 