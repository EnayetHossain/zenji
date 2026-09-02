import type { Products } from "@/types/product";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type ProductCardProps = {
  variant: "portrait" | "square" | "landscape";
};

function ProductCard({ variant }: ProductCardProps) {
  return (
    <Link to="/" className="card-anim block min-w-0 w-full">
      <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
        <CardContent
          className={cn(
            "px-0 pb-0 mb-0 overflow-hidden relative",

            // md → lg: same image height
            "md:aspect-square",

            // lg+: asymmetric layout
            {
              "lg:aspect-3/4": variant === "portrait",
              "lg:aspect-square": variant === "square",
              "lg:aspect-4/3": variant === "landscape",
            }
          )}
        >
          <img
            src="/images/third-img.jpg"
            alt="new image"
            className="w-full h-full object-cover"
          />

          <img
            src="/images/fourth-img.jpg"
            alt="new image"
            className="absolute inset-0 w-full h-full object-cover clip-img"
            style={{
              clipPath: "inset(0 100% 0 0)",
            }}
          />
        </CardContent>

        <CardFooter className="bg-bg text-text flex justify-between items-start pt-6 rounded-none">
          <div>
            <div className="text-3xl">Zenji Layer 5</div>

            <div className="text-sm mt-2 flex items-center gap-1 uppercase">
              <span className="inline-block w-2 h-2 rounded-full bg-current mr-2" />
              Footwear
            </div>
          </div>

          <div className="text-3xl">$159.00</div>
        </CardFooter>
      </Card>
    </Link>
  );
}

function Products() {
  const containerRef = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const images = gsap.utils.toArray<HTMLImageElement>(".card-anim img:not(.clip-img)");

    gsap.set(images, { clipPath: "inset(0 100% 0 0)" })
    gsap.to(images, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        once: true
      }
    })
  }, { scope: containerRef })

  return (
    <section className="w-full mt-60">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 items-start" ref={containerRef}>
        <div className="md:col-span-1 lg:col-span-2">
          <ProductCard variant="portrait" />
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          <ProductCard variant="square" />
        </div>

        <div className="md:col-span-1 lg:col-span-6 lg:col-start-7">
          <ProductCard variant="landscape" />
        </div>
      </div>
    </section>
  );
}


export default Products;
