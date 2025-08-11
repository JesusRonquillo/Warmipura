import React, { useState } from 'react';
import { Card } from '../atoms/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TutorialItem {
  question: string;
  answer: string | string[];
}

interface TutorialSectionProps {
  title: string;
  icon: string;
  description: string;
  items: TutorialItem[];
  isExpanded?: boolean;
}

export const TutorialSection: React.FC<TutorialSectionProps> = ({
  title,
  icon,
  description,
  items,
  isExpanded: defaultExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const renderAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      return (
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {answer.map((item, index) => (
            <li key={index} className="text-base leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return <p className="text-base leading-relaxed text-gray-700">{answer}</p>;
  };

  return (
    <Card variant="outlined" className="overflow-hidden">
      <div 
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-3xl">{icon}</div>
            <div>
              <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <div className="text-primary">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="pt-6 space-y-6">
            {items.map((item, index) => (
              <div key={index} className="space-y-3">
                <h4 className="text-lg font-semibold text-primary">
                  {item.question}
                </h4>
                <div className="pl-4 border-l-4 border-accent/30">
                  {renderAnswer(item.answer)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}; 