import React from "react";

type Props = {
	date: Date;
};

export const DateTime: React.FC<Props> = ({ date }) => {
	return (
        <section className="flex gap-x-2">
            <h2>{date.toLocaleDateString()}</h2>
            <p>{date.toLocaleTimeString()}</p>
        </section>
    )
};
