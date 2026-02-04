export function Input({
    label,
    value,
    onChange,
    min,
    max,
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
}) {
    return (
        <div>
            <label className="text-sm font-medium text-slate-700">
                {label}
            </label>
            <input
                type="number"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
                className="w-full mt-1 border rounded-lg px-3 py-2"
            />
        </div>
    );
}

export function Result({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex justify-between items-center">
            <span className="text-slate-700">{label}</span>
            <span className="font-bold text-lg">
                {value}
            </span>
        </div>
    );
}