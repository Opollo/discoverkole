
import React from 'react';

interface ExampleCardProps {
    title: string;
    text: string;
    onClick: () => void;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ title, text, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{text}</p>
    </div>
);

interface WelcomeScreenProps {
    onSendMessage: (message: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSendMessage }) => {
    const examples = [
        { title: "Business Permit", text: "How do I apply for a trading license?" },
        { title: "Local Taxes", text: "What is the deadline for property tax payments?" },
        { title: "Community Services", text: "Where can I report a broken street light?" },
        { title: "Public Health", text: "What are the operating hours for the main health center?" },
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Hello! How can I assist you today?</h2>
                <p className="text-gray-600 max-w-2xl mb-8">
                    I am the AI assistant for Kole District Local Government. Ask me about local services, permits, taxes, and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    {examples.map((ex) => (
                        <ExampleCard key={ex.title} title={ex.title} text={ex.text} onClick={() => onSendMessage(ex.text)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WelcomeScreen;
