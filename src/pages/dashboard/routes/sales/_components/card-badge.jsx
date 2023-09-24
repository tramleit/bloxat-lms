const CardBadge = ({ label, color }) => {
  return (
    <p
      className={`text-sm mt-2 ${color} w-fit px-1.5 py-0.5 rounded-md text-black `}
    >
      {label}
    </p>
  );
};

export default CardBadge;
