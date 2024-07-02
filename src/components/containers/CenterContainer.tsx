import React from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
}

const CenterContainer: React.FC<Props> = ({ children, className }) => {
    return (
        <div className={`flex flex-col items-center justify-center min-h-dvh w-full ${className && className}`}>
            {children}
        </div>
    );
}
 
export default CenterContainer;