import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import siteConfig from "../../config/siteConfig";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        اطلاعات تماس
      </h2>

      <p className="mt-5 max-w-lg leading-8 text-white/50">
        برای مشاوره، استعلام قیمت و بررسی پروژه می‌توانید از طریق
        راه‌های ارتباطی زیر با ما در تماس باشید.
      </p>

      <div className="mt-12 space-y-5">
        
        <ContactItem
          icon={<Phone size={22} />}
          title="شماره تماس"
          value={siteConfig.phone}
          href={`tel:${siteConfig.phone}`}
        />

        <ContactItem
          icon={<Mail size={22} />}
          title="ایمیل"
          value={siteConfig.email}
          href={`mailto:${siteConfig.email}`}
        />

        <ContactItem
          icon={<MapPin size={22} />}
          title="آدرس"
          value={siteConfig.address}
          href="https://neshan.org/maps/places/rbZ9_3Ox9VoC"
          target="_blank"
        />

        <ContactItem
          icon={<Clock size={22} />}
          title="ساعات کاری"
          value={siteConfig.workingHours}
        />
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  value,
  href,
  target,
}) {
  const content = (
    <>
      <div
        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-primary/10
          text-primary
          transition-all
          duration-500
          group-hover:bg-primary
          group-hover:text-black
        "
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-white">
          {title}
        </h3>

        <p className="mt-2 break-words text-sm leading-7 text-white/50">
          {value}
        </p>
      </div>

      {href && (
        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            text-white/40
            transition-all
            duration-500
            group-hover:rotate-45
            group-hover:border-primary
            group-hover:text-primary
          "
        >
          <ArrowUpRight size={18} />
        </div>
      )}
    </>
  );

  if (!href) {
    return (
      <div
        className="
          group
          flex
          items-center
          gap-5
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-5
        "
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      className="
        group
        flex
        items-center
        gap-5
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-5
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-primary/50
        hover:bg-white/[0.05]
      "
    >
      {content}
    </a>
  );
}

