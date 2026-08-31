const process = [
  {
    number: "01",
    title: "مشاوره",
    desc: "نیازها، بودجه و فضای پروژه بررسی می‌شود.",
  },

  {
    number: "02",
    title: "طراحی",
    desc: "طراحی سه‌بعدی و انتخاب متریال انجام می‌شود.",
  },

  {
    number: "03",
    title:"تولید و رنگ",
    desc: "برش، CNC  حرفه‌ای ،اتاق رنگ.",
  },

  {
    number: "04",
    title: "نصب",
    desc: "اجرای دقیق توسط تیم متخصص در محل پروژه.",
  },

  {
    number: "05",
    title: "تحویل",
    desc: "کنترل کیفیت نهایی و تحویل پروژه.",
  },
];

export default function ProcessTimeline() {
  return (
    <section className="relative overflow-hidden bg-secondary py-32">

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10 lg:block hidden"></div>

      <div className="mx-auto max-w-6xl px-6">

        <div className="text-center">

          <span className="tracking-[5px] uppercase text-primary">
            OUR PROCESS
          </span>

          <h2 className="mt-5 text-5xl font-black text-white">
            مراحل اجرای پروژه
          </h2>

        </div>

        <div className="mt-24 space-y-20">

          {process.map((item, index) => (

            <div
              key={item.number}
              className={`grid items-center gap-12 lg:grid-cols-2 ${
                index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >

              <div>


                <h3 className="mt-3 text-3xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-6 leading-9 text-white/60">
                  {item.desc}
                </p>

              </div>

              <div className="relative flex justify-center">

                <div
                  className="
                  flex
                  h-36
                  w-36
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-primary
                  bg-black/20
                  backdrop-blur-xl
                  "
                >

                  <span className="text-4xl font-black text-primary">
                    {item.number}
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}