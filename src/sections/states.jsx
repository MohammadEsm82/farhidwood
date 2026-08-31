import Counter from "../components/Counter";

export default function Stats() {
  const stats = [
    {
      value: 20,
      suffix: "+",
      title: "سال تجربه",
    },
    {
      value: 1000,
      suffix: "+",
      title: "پروژه اجرا شده",
    },
    {
      value: 5000,
      suffix: "+",
      title: "متر مربع تولید",
    },
    {
      value: 98,
      suffix: "%",
      title: "رضایت مشتریان",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">

        <div
          className="
            grid
            grid-cols-2
            gap-12
            md:grid-cols-4
            md:gap-10
          "
        >

          {stats.map((item, index) => (
            <div
              key={index}
              className="
                flex
                flex-col
                items-center
                text-center
              "
            >

              <Counter
                value={item.value}
                suffix={item.suffix}
                className="
                  font-primary
                  font-extrabold
                  text-tprimary
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                "
              />

              <p
                className="
                  mt-4
                  text-sm
                  text-[#C8A96A]
                  sm:text-base
                  md:text-lg
                "
              >
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
