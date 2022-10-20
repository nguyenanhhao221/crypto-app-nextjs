import React from 'react';
import HTMLReactParser from 'html-react-parser';
type Props = {
    description: string;
    name: string;
};
export const CryptoDetailDescription = ({ description, name }: Props) => {
    return (
        <div className="prose prose-slate prose-h3:text-lg prose-h3:text-blue-500 prose-p:text-sm md:prose-h3:text-xl md:prose-p:text-base">
            <h2 className="text-blue-500">{`What is ${name} ?`}</h2>
            {HTMLReactParser(description)}
        </div>
    );
};
