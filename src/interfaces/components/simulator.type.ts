export interface ISimulatorProps {
  windowNames: string[];
  activeWindow?: string;
  simulatorTexts: Array<{
    header: string;
    description: string;
  }>;
}

export interface ISimulatorText {
  isOpen: boolean;
  activeHeader: string;
  onHeaderClick: (header: string) => void;
  resetAnimation?: number;
}

export interface ISimulatorTextItem {
  header: string;
  content: string;
}
