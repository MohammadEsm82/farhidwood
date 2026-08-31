
import categories from "../../constants/categories";

export default function PortfolioFilter({
  selected,
  setSelected,
}) {
  return (

    <div id="portfolio" className="mx-auto flex max-w-7xl flex-wrap gap-4 px-6">

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => setSelected(category)}
          className={`
            rounded-full
            border
            px-7
            py-3
            duration-300
            ${
              selected === category
                ? "border-primary bg-primary text-black"
                : "border-white/10 text-white hover:border-primary hover:text-primary"
            }
          `}
        >
          {category}
        </button>
      ))}

    </div>
  );
}
