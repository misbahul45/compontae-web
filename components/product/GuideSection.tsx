import { komposGuide } from '@/constants';
import React from 'react';
import { AccordionItem,Accordion, AccordionTrigger, AccordionContent } from '../ui/accordion';

interface Props {
  ref: React.RefObject<HTMLDivElement> | null;
}

const GuideSection = ({ ref }: Props) => {
  return (
    <div ref={ref} className="w-full max-w-6xl mx-auto lg:pt-16 md:pt-12 pt-10 px-4">
      <h1 className='text-center text-green-700 lg:text-4xl md:text-2xl text-xl font-bold mb-6'>Paduan Pupuk Compotae</h1>
      <div className="bg-green-50 p-8 rounded-lg shadow-lg">
        <Accordion type="single" collapsible>
          {komposGuide.sections.map((section, idx) => (
            <AccordionItem key={idx} value={`section-${idx}`}>
              <AccordionTrigger className="flex justify-between items-center w-full text-lg font-semibold p-4 bg-white rounded-lg shadow-md mb-2 hover:bg-green-100 transition duration-200">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="p-4 my-2 bg-white border rounded-lg shadow-sm">
                {section.content.map((content, cIdx) => (
                  <div key={cIdx} className="text-gray-800 mb-4">
                    {content.type === "text" && <p>{content.description}</p>}
                    {content.type === "list" && content.items && (
                      <ul className="list-disc pl-6 space-y-2">
                        {content.items.map((item, iIdx) => (
                          <li key={iIdx}>
                            <strong>{item.title}</strong>: {item.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default GuideSection;
