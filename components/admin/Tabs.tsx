interface Props {
  active: "leads" | "subscribers";
  onChange: (tab: "leads" | "subscribers") => void;
}

export default function Tabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-6 border-b pb-3">
      <button
        className={`${
          active === "leads" ? "text-blue-600 font-semibold border-b-2" : ""
        }`}
        onClick={() => onChange("leads")}
      >
        Leads
      </button>

      <button
        className={`${
          active === "subscribers"
            ? "text-blue-600 font-semibold border-b-2"
            : ""
        }`}
        onClick={() => onChange("subscribers")}
      >
        Subscribers
      </button>
    </div>
  );
}
