import Image from "next/image";
import { useState } from "react";

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

    const Line = ({ line }: { line: string[] }) => {
        return (
            <div className={`line ${isVertical ? "verticalline" : ""}`}>
                {line.map((char, i) => (
                    <Char key={i} char={char} />
                ))}
            </div>
        );
    };

    const Char = ({ char }: { char: string }) => {
        if (charSet.has(char)) {
            return (
                <div className={"char " + (isDarkBg ? "darkbgchar" : "")}>
                    <Image src={`/c/${char}.png`} alt={char} fill />
                </div>
            );
        }
        return <div className="char">?</div>;
    };

    return (
        <>
            <div id="controls">
                <span>horizontal + left-to-right</span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isVertical}
                        onChange={(e) => setIsVertical(e.target.checked)}
                    />
                    <span className="slider round"></span>
                </label>
                <span>vertical + right-to-left</span>

                <br />
                <br />

                <span>light background + dark text</span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={isDarkBg}
                        onChange={(e) => setIsDarkBg(e.target.checked)}
                    />
                    <span className="slider round"></span>
                </label>
                <span>dark background + light text</span>
            </div>
            <div
                id="display"
                className={
                    (isVertical ? "verticaldisplay " : "") +
                    (isDarkBg ? "darkbgdisplay " : "")
                }
            >
                {tokens.map((line, i) => (
                    <Line key={i} line={line} />
                ))}
            </div>
        </>
    );
};

export default Display;
