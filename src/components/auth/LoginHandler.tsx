import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

interface ILoginHandlerProps {
  children: React.ReactNode;
}

export interface AuthEventDetail {
  refreshJwt: string;
  sessionJwt: string;
  [key: string]: string | number | boolean | object | null;
}

// Create a type for the login success handler
export type LoginSuccessHandler = (detail: AuthEventDetail) => void;

const LoginHandler: React.FC<ILoginHandlerProps> = ({ children }) => {
  const router = useRouter();
  const [, setCookie] = useCookies(['token', 'refreshToken']);
  const isHandlerAttached = useRef(false);

  // Export the handleLoginSuccess function to be called directly
  const handleLoginSuccess = (detail: AuthEventDetail) => {
    console.log("handleLoginSuccess called with:", detail);
    const { refreshJwt, sessionJwt } = detail;

    const cookieOptions = {
      path: "/",
      domain: ".soulhq.ai",
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

  // Still keep the event listener for backward compatibility
  useEffect(() => {
    if (isHandlerAttached.current) return;

    const handleLoginSuccessEvent = (event: Event) => {
      console.log("Event triggered login success", event);
      
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const customEvent = event as CustomEvent<any>;
        // Check for nested structure
        if (customEvent.detail && customEvent.detail.detail && 
            customEvent.detail.detail.sessionJwt && customEvent.detail.detail.refreshJwt) {
          // Access the nested detail structure
          handleLoginSuccess(customEvent.detail.detail);
        } 
        // Check for direct structure
        else if (customEvent.detail && customEvent.detail.sessionJwt && customEvent.detail.refreshJwt) {
          handleLoginSuccess(customEvent.detail);
        } 
        else {
          console.error('Login event missing required auth tokens', customEvent.detail);
        }
      } catch (error) {
        console.error('Error processing login event:', error);
      }
    };

    const handleLoginFailure = (event: Event) => {
      const customEvent = event as CustomEvent;
      console.error('Login failed:', customEvent.detail);
    };

    // Add event listeners to the document
    document.addEventListener('success', handleLoginSuccessEvent as EventListener);
    document.addEventListener('failure', handleLoginFailure as EventListener);
    
    isHandlerAttached.current = true;

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('success', handleLoginSuccessEvent as EventListener);
      document.removeEventListener('failure', handleLoginFailure as EventListener);
    };
  }, [router, setCookie]);

  // Simply return children as before - we'll export the function separately
  return <>{children}</>;
};

// Export the component as default and also export the handleLoginSuccess function
export default LoginHandler;

// Export a standalone utility function that uses the same cookie setting logic
export const useLoginHandler = (): LoginSuccessHandler => {
  const [, setCookie] = useCookies(['token', 'refreshToken']);
  
  return (detail: AuthEventDetail) => {
    console.log("Direct login handler called with:", detail);
    const { refreshJwt, sessionJwt } = detail;

    const cookieOptions = {
      path: "/",
      domain: ".soulhq.ai",
      secure: true,
    };
    
    setCookie("token", sessionJwt, cookieOptions);
    setCookie("refreshToken", refreshJwt, cookieOptions);

    console.log("Cookie set:", {
      token: sessionJwt,
      refreshToken: refreshJwt,
      cookieOptions
    });
    
    // Redirect to platform.delta.soulhq.ai
    window.location.href = 'https://platform.delta.soulhq.ai';
  };
}; 