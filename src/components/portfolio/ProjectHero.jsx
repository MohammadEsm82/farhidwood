export default function ProjectHero({ project }) {
  return (
    <section className="relative h-[70vh] overflow-hidden">

      {/* تصویر */}

      <img
        src={project.hero}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/45" />

      {/* گرادیان طلایی */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-r
        from-black/70
        via-black/40
        to-transparent
        "
      />

      {/* دود طلایی */}

      <div
        className="
        absolute
        -left-40
        top-1/2
        h-[500px]
        w-[500px]
        -translate-y-1/2
        rounded-full
        bg-primary/10
        blur-[160px]
        "
      />

      {/* محتوا */}

      <div
        className="
        relative
        mx-auto
        flex
        h-full
        max-w-7xl
        flex-col
        justify-end
        px-6
        pb-20
        "
      >

        <span
          className="
          mb-4
          text-sm
          uppercase
          tracking-[5px]
          text-primary
          "
        >
          Luxury Interior
        </span>

        <h1
          className="
          font-primary
          text-5xl
          font-bold
          text-white
          md:text-7xl
          "
        >
          {project.title}
        </h1>

        <div
          className="
          mt-6
          flex
          flex-wrap
          gap-6
          text-white/80
          "
        >

          <span>{project.city}</span>

          <span>•</span>

          <span>{project.year}</span>

          <span>•</span>

          <span>{project.area}</span>

        </div>

      </div>

    </section>
  );
}