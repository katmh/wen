import Image from "next/image";
import { useState } from "react";

import Control from "./Control";

const Display = ({ text, charSet }: { text: string; charSet: Set<string> }) => {
    const tokens = [];
    for (const line of text.split("\n")) {
        if (line === "") {
            // Preserve empty lines
            tokens.push([]);
            continue;
        }
        tokens.push(line.split(""));
    }

    const [isVertical, setIsVertical] = useState(false);
    const [isDarkBg, setIsDarkBg] = useState(false);
    const [charScale, setCharScale] = useState(30);
    const [linePad, setLinePad] = useState(3);
    const [charPad, setCharPad] = useState(3);

    return (
        <section>
            <h2>display</h2>
            <div id="controls">
                <Control
                    leftLabel="horizontal, left-to-right"
                    rightLabel="vertical, right-to-left"
                    inputType="checkbox"
                    state={isVertical}
                    onChange={setIsVertical}
                />
                <Control
                    leftLabel="light background"
                    rightLabel="dark background"
                    inputType="checkbox"
                    state={isDarkBg}
                    onChange={setIsDarkBg}
                />
                <Control
                    leftLabel="text size"
                    inputType="range"
                    min={20}
                    max={100}
                    state={charScale}
                    onChange={setCharScale}
                />
                <Control
                    leftLabel="space between characters"
                    inputType="range"
                    min={0}
                    max={40}
                    state={charPad}
                    onChange={setCharPad}
                />
                <Control
                    leftLabel="space between lines"
                    inputType="range"
                    min={0}
                    max={40}
                    state={linePad}
                    onChange={setLinePad}
                />
            </div>
            <div
                id="display"
                className={
                    (isVertical ? "displayvertical " : "displayhorizontal ") +
                    (isDarkBg ? "displaydarkbg " : "displaylightbg ")
                }
                style={{
                    gap: `${linePad}px`,
                }}
            >
                {tokens.map((line, i) => (
                    <div
                        key={i}
                        className={
                            "line " +
                            (isVertical ? "linevertical " : "linehorizontal ")
                        }
                        style={{
                            [isVertical ? "width" : "height"]: `${charScale}px`,
                            gap: `${charPad}px`,
                        }}
                    >
                        {line.map((char, i) => (
                            <div
                                key={i}
                                className={
                                    "char " +
                                    (isDarkBg ? "chardarkbg" : "charlightbg")
                                }
                                style={{
                                    width: `${charScale}px`,
                                }}
                            >
                                <Image src={`/c/${char}.png`} alt={char} fill />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Display;
