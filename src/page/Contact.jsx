import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

export default function Contact() {
  return (
    <main className="overflow-hidden bg-secondary">
      <section className="relative overflow-hidden py-32 md:py-40">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[180px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <span className="text-sm uppercase tracking-[6px] text-primary">
            CONTACT
          </span>

          <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight text-white md:text-7xl">
            با ما در ارتباط باشید
          </h1>

          <p className="mt-8 max-w-2xl leading-9 text-white/60">
            برای مشاوره، استعلام قیمت یا شروع همکاری، کافی است
            فرم زیر را تکمیل کنید.
          </p>
        </div>
      </section>

      <section className="pb-32">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
