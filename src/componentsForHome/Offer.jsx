const Offers = ({ offers }) => {
  if (!offers || offers.length === 0) {
    return (
      <button
        onClick={() => console.log("Create first offer")}
        className="text-blue-600 hover:underline"
      >
        0
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      {offers.map((offer, index) => (
        <button
          key={offer.id}
          onClick={() => console.log("Open offer", offer.id)}
          className="text-blue-600 hover:underline"
        >
          {(index + 1).toString().padStart(2, "0")}
        </button>
      ))}
    </div>
  );
};
export default Offers;