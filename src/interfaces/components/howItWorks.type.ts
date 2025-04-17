export interface IHowItWorksType {
    header: string;
    subheader: string;
    index: number;
    isActive: boolean;
    onClick: (index: number) => void;
}