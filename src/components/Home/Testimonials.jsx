import testimonials from "../../data/src/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-secondary py-32">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <span className="tracking-[5px] uppercase text-primary">

            Testimonials

          </span>

          <h2 className="mt-5 text-5xl font-bold text-white">

            مشتریان درباره ما چه می‌گویند؟

          </h2>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.03]
              p-10
              transition-all
              duration-500
              hover:border-primary
              "
            >

              <p className="leading-8 text-white/70">

                "{item.text}"

              </p>

              <h3 className="mt-8 text-xl font-bold text-white">

                {item.name}

              </h3>

              <span className="text-primary">

                {item.city}

              </span>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
