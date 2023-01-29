interface Props {
    leftLabel?: string;
    rightLabel?: string;
    inputType: "checkbox" | "range";
    min?: number;
    max?: number;
    state: any; // TODO
    onChange: any;
}

const Control = ({
    leftLabel,
    rightLabel,
    inputType,
    min,
    max,
    state,
    onChange,
}: Props) => {
    return (
        <div className="control">
            {leftLabel && <span className="label">{leftLabel}</span>}
            {inputType === "checkbox" ? (
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={state}
                        onChange={(e) => onChange(e.target.checked)}
                    />
                    <span className="slider round"></span>
                </label>
            ) : (
                <input
                    type="range"
                    step="0.1"
                    min={min}
                    max={max}
                    value={state}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
            {rightLabel && <span className="label">{rightLabel}</span>}
        </div>
    );
};

export default Control;
