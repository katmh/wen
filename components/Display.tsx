import Image from "next/image";

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

    const Line = ({ line }: { line: string[] }) => {
        return (
            <div className="line">
                {line.map((char, i) => (
                    <Char key={i} char={char} />
                ))}
            </div>
        );
    };

    const Char = ({ char }: { char: string }) => {
        if (charSet.has(char)) {
            return (
                <div className="char">
                    <Image src={`/c/${char}.png`} alt={char} fill />
                </div>
            );
        }
        return <div className="char">?</div>;
    };

    return (
        <div id="display">
            {tokens.map((line, i) => (
                <Line key={i} line={line} />
            ))}
        </div>
    );
};

export default Display;
