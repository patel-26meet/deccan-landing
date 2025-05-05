"use client"

import { useState } from "react";
import FaqCard from "../home/Faqs/FaqCard";

interface IFaqData {
    question: string;
    answer: string;
}

interface IFaqSectionProps {
    header: string;
    data: IFaqData[];
}

const FaqSection = ({
    header,
    data
}: IFaqSectionProps) => {
    const [openFaqs, setOpenFaqs] = useState<number[]>([]);

    const toggleFaq = (index: number) => {
        setOpenFaqs(prev => 
            prev.includes(index) 
                ? prev.filter(item => item !== index) 
                : [...prev, index]
        );
    };

    return (
        <div className="faq-section">
            <div className="faq-section__header">
                {header}
            </div>
            <div className="faq-section__data">
                <div className='faqs-cards-container'>
                    {data.map((faq, index) => (
                        <FaqCard 
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFaqs.includes(index)}
                            index={index}
                            toggleFaq={toggleFaq}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FaqSection;