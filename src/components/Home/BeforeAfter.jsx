import { useState } from "react";
import before from "../../assets/picture/before.webp";


export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <section className="bg-secondary py-32">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-16 text-center">

          <span className="tracking-[6px] uppercase text-primary">

            Before / After

          </span>

          <h2 className="mt-5 text-5xl font-bold text-white">

            تفاوت را احساس کنید

          </h2>

          <p className="mx-auto mt-6 max-w-2xl leading-8 text-white/60">

            نتیجه اجرای دقیق، کیفیت متریال و طراحی اصولی را با مقایسه
            قبل و بعد پروژه مشاهده کنید.

          </p>

        </div>

        <div className="relative mx-auto h-[650px] max-w-6xl overflow-hidden rounded-[36px]">

          {/* Before */}

          <img
            src={before}
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* After */}

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
            src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1800"
              
              className="h-full w-full object-cover"
            />
          </div>

          {/* Line */}

          <div
            className="absolute top-0 bottom-0 w-1 bg-primary"
            style={{ left: `${position}%` }}
          />

          {/* Handle */}

          <div
            className="absolute top-1/2 z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-primary bg-white shadow-2xl"
            style={{ left: `${position}%` }}
          />

          {/* Range */}

          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
          />

        </div>

      </div>

    </section>
  );
}