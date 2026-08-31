import ourstory from '../../assets/picture/ourstory.webp';

export default function AboutStory() {

  return (

    <section id='ourstory' className="bg-secondary py-32">

      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:grid-cols-2">

        <div>

          <span className="tracking-[5px] text-primary">

            OUR STORY

          </span>

          <h2 className="mt-5 text-5xl font-black text-white">

            داستان برند ما

          </h2>

          <p className="mt-10 leading-9 text-white/70">

            فعالیت مجموعه ما با هدف طراحی و اجرای پروژه‌های
            لوکس چوب، MDF، کابینت، کمد دیواری و دکوراسیون داخلی
            آغاز شد.

            تمرکز اصلی ما کیفیت ساخت، طراحی مدرن،
            اجرای دقیق CNC و استفاده از متریال درجه یک است.

          </p>

          <p className="mt-8 leading-9 text-white/70">

            امروز با اجرای صدها پروژه موفق،
            تلاش می‌کنیم در هر پروژه اثری خلق کنیم
            که سال‌ها ماندگار باشد.

          </p>

        </div>

        <div>

          <img

            src={ourstory}

            alt=""

            className="rounded-[40px]"

          />

        </div>

      </div>

    </section>

  );

}