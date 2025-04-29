import { IHeroIconsProps } from "@/interfaces/components/hero.type";

const HeroIcons = ({ 
    text 
}: IHeroIconsProps) => {
    return (
        <div className="hero-icons">
            <div className="hero-icons-text">{text}</div>
        </div>
    )
}

interface IIconData {
    text: string;
    position: {
        top?: string;
        bottom?: string;
        left?: string;
        right?: string;
    };
}

const HeroIconsLayout = () => {
    const icons: IIconData[] = [
        { text: "Literature", position: { top: "12%", left: "8%" } },
        { text: "Learning and Development", position: { top: "15%", left: "25%" } },
        { text: "Economics", position: { top: "15%", left: "45%" } },
        { text: "Frontend Development", position: { top: "15%", right: "12%" } },
        { text: "Law", position: { top: "25%", right: "25%" } },
        { text: "Product Development", position: { top: "30%", left: "55%" } },
        { text: "ML Ops", position: { top: "30%", right: "15%" } },
        { text: "Linguistics", position: { top: "40%", left: "12%" } },
        { text: "Data", position: { top: "45%", right: "20%" } },
        { text: "Engineering", position: { top: "30%", left: "32%" } },
        { text: "Engineering", position: { top: "55%", right: "22%" } },
        { text: "Medical Practices", position: { top: "65%", left: "15%" } },
        { text: "Food and Nutrition", position: { top: "75%", right: "20%" } },
        { text: "AI/ML", position: { top: "75%", right: "38%" } },
        { text: "Psychology", position: { top: "80%", left: "25%" } },
        { text: "Finance", position: { top: "85%", right: "28%" } },
        { text: "Humanities", position: { bottom: "10%", left: "15%" } },
        { text: "Supply Chain", position: { bottom: "9%", left: "35%" } },
        { text: "Backend Development", position: { bottom: "8%", right: "30%" } },
        { text: "UI/UX", position: { bottom: "8%", right: "12%" } },
        { text: "Market Research", position: { bottom: "28%", left: "45%" } }
    ];

    return (
        <div className="hero-icons-layout">            
            {icons.map((icon, index) => (
                <div 
                    key={index} 
                    className="hero-icon-container"
                    style={{
                        position: 'absolute',
                        ...icon.position
                    }}
                >
                    <HeroIcons text={icon.text} />
                </div>
            ))}
        </div>
    );
};

export default HeroIconsLayout;