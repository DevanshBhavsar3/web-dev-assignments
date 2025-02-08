interface ButtonProps {
  label: string;
  type?: "submit" | "button";
  onClick: any;
}

export default function Button({ label, type, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={(e) => onClick(e)}
      className="bg-white text-black w-full"
    >
      {label}
    </button>
  );
}
