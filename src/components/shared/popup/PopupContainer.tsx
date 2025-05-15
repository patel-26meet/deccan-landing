import { useState, useEffect } from "react";
import PopupComponent from "./PopupComponent";
import { checkCookieConsent } from "@/constants/shared/popup";


const PopupContainer: React.FC = () => {
  const [activePopups, setActivePopups] = useState<string[]>([]);

  useEffect(() => {
    // Check cookie consent and show cookie popup if not accepted
    if (!checkCookieConsent() && !activePopups.includes("cookie")) {
      setActivePopups((prev) => [...prev, "cookie"]);
    }
  }, []);

  const removePopup = (popupType: string) => {
    setActivePopups((prev) => prev.filter((type) => type !== popupType));
  };

  return (
    <div className="popup-container">
      {activePopups.map((popupType) => (
        <PopupComponent
          key={popupType}
          popupType={popupType}
          onRemove={removePopup}
        />
      ))}
    </div>
  );
};
export default PopupContainer;
