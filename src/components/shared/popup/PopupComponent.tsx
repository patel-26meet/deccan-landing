import { PopupDataConstant } from "@/constants/shared/popup";
import { TPopupContent } from "@/interfaces/components/popup.type";
import CustomButton from "@/components/shared/Button";
import DOMPurify from 'dompurify'; 

interface IPopupComponentProps {
  popupType: string;
  onRemove: (popupType: string) => void;
}

const PopupComponent: React.FC<IPopupComponentProps> = ({ popupType, onRemove }) => {
  const data: TPopupContent = PopupDataConstant[popupType];
  if (!data) {
    return null;
  }

  return (
    <div className="popup-component">
      <div className="popup-title">
        <div className="popup-title__heading">
          {data.title}
        </div>
        <button 
          className="popup-title__close"
          onClick={() => {
            onRemove(popupType)
            data.onClose()
          }}
          aria-label="Close popup"
        >
          <img src="/assets/popup-close.svg" alt="Close" />
        </button>
      </div>
      <div className="popup-content">
            <div className="popup-content__text" 
            dangerouslySetInnerHTML={{
						__html: DOMPurify.sanitize(data?.content ?? "", {
							ADD_ATTR: ["target"],
							FORBID_ATTR: ['target="_blank"'],
						}),
					}} />
      </div>
      <div className="popup-action">
        {data.actions.map((action, index) => (
          <CustomButton
            className="popup-action__button"
            key={index}
            onClick={() => {
              action.onClick();
              onRemove(popupType);
            }}
            text={action.label}
          />
        ))}
      </div>
    </div>
  );
};

export default PopupComponent;