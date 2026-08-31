import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Statistics() {

  const stats = [
    

    {
      number:1000,
      suffix:"+",
      title:"پروژه اجرا شده",
    },

    {
      number:20,
      suffix:"+",
      title:"سال تجربه",
    },

    {
      number:70,
      suffix:"+",
      title:"نیروی متخصص",
    },

    {
      number:98,
      suffix:"%",
      title:"رضایت مشتری",
    },
    

  ];
  const container = useRef(null);
  useGSAP(() => {

  const numbers = gsap.utils.toArray(".counter");

  numbers.forEach((number) => {

    const target = Number(number.dataset.value);

    gsap.fromTo(
      number,

      {
        innerText: 0,
      },

      {
        innerText: target,

        duration: 2,

        ease: "power3.out",

        snap: {
          innerText: 1,
        },

        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
          once: true,
        },

        onUpdate() {
          number.innerText = Math.floor(number.innerText);
        },

      }

    );

  });

}, []);
  

  return (

<section ref={container} className="relative overflow-hidden bg-secondary py-36">

<div className="mx-auto max-w-7xl px-6">

<div className="text-center">

<span className="tracking-[5px] text-primary uppercase">

OUR NUMBERS

</span>

<h2 className="mt-6 text-5xl font-black text-white">

اعتماد، نتیجه کیفیت است

</h2>

<p className="mx-auto mt-8 max-w-2xl leading-9 text-white/60">

آنچه امروز به دست آورده‌ایم حاصل سال‌ها تجربه،
کیفیت اجرا و رضایت مشتریان است.

</p>

</div>

<div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

{

stats.map((item,index)=>(

<div

key={index}

className="group rounded-[34px] relative overflow-hidden border border-white/10 bg-white/[0.02] p-12 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-primary"

>
  <div
  className="
  absolute
  inset-0
  opacity-0
  duration-700
  group-hover:opacity-100
  bg-gradient-to-br
  from-primary/10
  via-transparent
  to-primary/5
  "
/>

<h3
  className="text-6xl font-black text-primary"
>

  <span
    className="counter"
    data-value={item.number}
  >
    0
  </span>

  {item.suffix}

</h3>

<p className="mt-6 text-lg text-white">

{item.title}

</p>

</div>

))

}

</div>

</div>

</section>

  );

}