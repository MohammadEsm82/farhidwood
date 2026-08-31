
import { Link } from "react-router-dom";
import ServicesHero from "../components/services/ServicesHero";
import ServicesGrid from "../components/services/ServicesGrid";
import ServiceProcess from "../components/services/ServiceProcess";
import ProjectsPreview from "../components/services/ProjectsPreview";

export default function Services() {
  return (
    <main className="overflow-hidden bg-secondary">
      <ServicesHero />

      <section id="services" className="scroll-mt-24 py-32">
        <ServicesGrid />
      </section>

      <section className="py-32">
        <ServiceProcess />
      </section>

      <section className="py-32">
        <ProjectsPreview />
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <span className="text-sm uppercase tracking-[6px] text-primary">
            START YOUR PROJECT
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-white md:text-6xl">
            آماده شروع پروژه
            <br />
            <span className="text-primary">خود هستید؟</span>
          </h2>

          <p className="mx-auto mt-8 max-w-2xl leading-8 text-white/60">
            برای مشاوره، بررسی پروژه و دریافت برآورد اولیه با ما در ارتباط
            باشید.
          </p>

          <Link
            to="/contact"
            className="
              mt-10
              inline-flex
              rounded-full
              bg-primary
              px-9
              py-4
              font-bold
              text-secondary
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_15px_40px_rgba(201,168,106,0.25)]
            "
          >
            درخواست مشاوره
          </Link>
        </div>
      </section>
    </main>
  );
}

