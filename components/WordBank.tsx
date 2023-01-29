import Fuse from "fuse.js";
import { useState } from "react";

const WordBank = ({ characters }: { characters: any[] }) => {
    const fuse = new Fuse(characters, {});
    const [query, setQuery] = useState("");
    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <p>{JSON.stringify(fuse.search(query))}</p>
        </div>
    );
};

export default WordBank;
