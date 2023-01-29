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
        threshold: 0.0, // Exact match only
    });
    const [query, setQuery] = useState("");
    const searchResults = fuse.search(query);

    return (
        <aside id="wordbank">
            <h2>word bank</h2>
            <p>
                not sure what to write? browse and search supported characters.
                click a character to add it to your text
            </p>
            <input
                id="search"
                type="text"
                placeholder="character or pinyin (ex: xi1)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query ? (
                searchResults.length ? (
                    <>
                        <p className="label">
                            found {searchResults.length} result
                            {searchResults.length > 1 ? "s" : ""}
                        </p>
                        <div id="searchresults">
                            {searchResults.map((result) => (
                                <CharacterCard
                                    addChar={addChar}
                                    key={result.refIndex}
                                    char={result.item}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <p className="label">no results found :\</p>
                )
            ) : (
                <>
                    <p className="label">
                        showing all {characters.length} characters
                    </p>
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
            <hr />
        </aside>
    );
};

export default WordBank;
