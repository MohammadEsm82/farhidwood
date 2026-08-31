export default function ServiceCard({ Icon, title }) {
  return (
    <div
      className="
      group
      relative
      overflow-hidden
      rounded-3xl
      border
      border-primary/20
      bg-[#111111]
      p-10
      transition-all
      duration-500
      hover:-translate-y-2
      hover:border-primary
      hover:shadow-[0_20px_60px_rgba(200,169,106,.18)]
      "
    >

      <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/10 to-transparent" />

      <div className="relative flex flex-col items-center">

        <Icon
          size={55}
          className="mb-8 text-primary transition duration-500 group-hover:scale-110"
        />

        <h3 className="font-primary text-xl font-bold text-white">

          {title}

        </h3>

      </div>

    </div>
  );
}