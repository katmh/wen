import Fuse from "fuse.js";
import Image from "next/image";
import { useState } from "react";

import Character from "@/data/characters";

const CharacterCard = ({
    char,
    addChar,
}: {
    char: Character;
    addChar: (char: string) => void;
}) => {
    return (
        <div className="charactercard" onClick={() => addChar(char.glyph)}>
            <Image src={`/c/${char.glyph}.png`} fill alt={char.glyph} />
        </div>
    );
};

const WordBank = ({
    characters,
    addChar,
}: {
    characters: any[];
    addChar: (char: string) => void;
}) => {
    const fuse = new Fuse(characters, {
        keys: ["glyph", "simplified", "traditional", "pinyin"],
    });
    const [query, setQuery] = useState("");

    return (
        <aside id="wordbank">
            <h2>word bank</h2>
            <p>
                not sure what to write? browse and search supported characters
            </p>
            <input
                id="search"
                type="text"
                placeholder="character or pinyin (ex: yong2)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query ? (
                <div id="searchresults">
                    {fuse.search(query).map((result) => (
                        <CharacterCard
                            addChar={addChar}
                            key={result.refIndex}
                            char={result.item}
                        />
                    ))}
                </div>
            ) : (
                <>
                    <p>showing all characters</p>
                    <div id="searchresults">
                        {characters.map((char, i) => (
                            <CharacterCard
                                key={i}
                                char={char}
                                addChar={addChar}
                            />
                        ))}
                    </div>
                </>
            )}
        </aside>
    );
};

export default WordBank;
