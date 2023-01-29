import Fuse from "fuse.js";
import Image from "next/image";
import { useState } from "react";

import Character from "@/data/characters";

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

    const NullResults = () => (
        <>
            <p>Showing all characters</p>
            <div id="searchresults">
                {characters.map((char, i) => (
                    <CharacterCard key={i} char={char} />
                ))}
            </div>
        </>
    );

    const CharacterCard = ({ char }: { char: Character }) => {
        return (
            <div className="charactercard" onClick={() => addChar(char.glyph)}>
                <Image src={`/c/${char.glyph}.png`} fill alt={char.glyph} />
            </div>
        );
    };

    return (
        <aside id="wordbank">
            <h2>search characters</h2>
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
                            key={result.refIndex}
                            char={result.item}
                        />
                    ))}
                </div>
            ) : (
                <NullResults />
            )}
        </aside>
    );
};

export default WordBank;
