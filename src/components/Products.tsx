import type { Products } from "@/types/product";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Products() {
  const containerRef = useRef<HTMLDivElement>(null)
  const containerRef2 = useRef<HTMLDivElement>(null)
  const containerRef3 = useRef<HTMLDivElement>(null)

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(() => {
    const animateContainer = (ref: React.RefObject<HTMLDivElement | null>) => {
      if (!ref.current) return;
      const container = ref.current;
      const images = gsap.utils.toArray<HTMLImageElement>(container.querySelectorAll(".card-anim img:not(.clip-img)"));
      gsap.set(images, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(images, {
        clipPath: "inset(0 0% 0 0)",
        duration: 1.4,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: container,
          start: "top 40%",
          once: true,
        },
      });
    };
    animateContainer(containerRef);
    animateContainer(containerRef2);
    animateContainer(containerRef3);
  });

  return (
    <section className="w-full mt-60">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 items-start" ref={containerRef}>
        <div className="md:col-span-1 lg:col-span-2">
          <Link to="/" className="card-anim block min-w-0 w-full">
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  "px-0 pb-0 mb-0 overflow-hidden relative",
                  "md:aspect-square",
                  "lg:aspect-3/4"
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
        </div>

        <div className="md:col-span-1 lg:col-span-2">
          <Link to="/" className="card-anim block min-w-0 w-full">
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  "px-0 pb-0 mb-0 overflow-hidden relative",
                  "md:aspect-square",
                  "lg:aspect-square"
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
        </div>

        <div className="md:col-span-1 lg:col-span-6 lg:col-start-7">
          <Link to="/" className="card-anim block min-w-0 w-full">
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  "px-0 pb-0 mb-0 overflow-hidden relative",
                  "md:aspect-square",
                  "lg:aspect-4/3"
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
        </div>
      </div>

      <div className="mt-60 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 items-start" ref={containerRef2}>
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-1">
          <Link to="/" className="card-anim block min-w-0 w-full" >
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  // Base / mobile
                  "aspect-square",
                  "md:aspect-square",
                  "lg:aspect-square",

                  "px-0 pb-0 mb-0 overflow-hidden relative"
                )}
              >
                <img
                  src="/images/third-img.jpg"
                  alt={"Zenji Layer 6"}
                  className="w-full h-full object-cover"
                />

                <img
                  src="/images/fourth-img.jpg"
                  alt={"Zenji Layer 6"}
                  className="absolute inset-0 w-full h-full object-cover clip-img"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                  }}
                />
              </CardContent>

              <CardFooter className="bg-bg text-text flex justify-between items-start pt-3 rounded-none">
                <div>
                  <div className="text-xl leading-tight">
                    {"Zenji Layer 6"}
                  </div>

                  <div className="text-xs mt-2 flex items-center gap-1 uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-current" />
                    Headwear
                  </div>
                </div>

                <div className="text-xl leading-none">
                  $55.00
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-5">
          <Link to="/" className="card-anim block min-w-0 w-full" >
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  // Base / mobile
                  "aspect-square",
                  "md:aspect-square",
                  "lg:aspect-2/3",

                  "px-0 pb-0 mb-0 overflow-hidden relative"
                )}
              >
                <img
                  src="/images/third-img.jpg"
                  alt={"Zenji Layer 7"}
                  className="w-full h-full object-cover"
                />

                <img
                  src="/images/fourth-img.jpg"
                  alt={"Zenji Layer 7"}
                  className="absolute inset-0 w-full h-full object-cover clip-img"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                  }}
                />
              </CardContent>

              <CardFooter className="bg-bg text-text flex justify-between items-start pt-3 rounded-none">
                <div>
                  <div className="text-xl leading-tight">
                    {"Zenji Layer 7"}
                  </div>

                  <div className="text-xs mt-2 flex items-center gap-1 uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-current" />
                    Bags
                  </div>
                </div>

                <div className="text-xl leading-none">
                  $120.00
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-7">
          <Link to="/" className="card-anim block min-w-0 w-full" >
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  // Base / mobile
                  "aspect-square",
                  "md:aspect-square",
                  "lg:aspect-square",

                  "px-0 pb-0 mb-0 overflow-hidden relative"
                )}
              >
                <img
                  src="/images/third-img.jpg"
                  alt={"Zenji Layer 8"}
                  className="w-full h-full object-cover"
                />

                <img
                  src="/images/fourth-img.jpg"
                  alt={"Zenji Layer 8"}
                  className="absolute inset-0 w-full h-full object-cover clip-img"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                  }}
                />
              </CardContent>

              <CardFooter className="bg-bg text-text flex justify-between items-start pt-3 rounded-none">
                <div>
                  <div className="text-xl leading-tight">
                    {"Zenji Layer 8"}
                  </div>

                  <div className="text-xs mt-2 flex items-center gap-1 uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-current" />
                    Scarves
                  </div>
                </div>

                <div className="text-xl leading-none">
                  $75.00
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>

      <div className="mt-60 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 items-start" ref={containerRef3}>
        <div className="md:col-span-1 lg:col-span-4 lg:col-start-1">
          <Link to="/" className="card-anim block min-w-0 w-full" >
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  // Base / mobile
                  "aspect-square",
                  "md:aspect-square",
                  "lg:aspect-3.5/4",

                  "px-0 pb-0 mb-0 overflow-hidden relative"
                )}
              >
                <img
                  src="/images/third-img.jpg"
                  alt={"Zenji Layer 6"}
                  className="w-full h-full object-cover"
                />

                <img
                  src="/images/fourth-img.jpg"
                  alt={"Zenji Layer 6"}
                  className="absolute inset-0 w-full h-full object-cover clip-img"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                  }}
                />
              </CardContent>

              <CardFooter className="bg-bg text-text flex justify-between items-start pt-3 rounded-none">
                <div>
                  <div className="text-xl leading-tight">
                    {"Zenji Layer 6"}
                  </div>

                  <div className="text-xs mt-2 flex items-center gap-1 uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-current" />
                    Headwear
                  </div>
                </div>

                <div className="text-xl leading-none">
                  $55.00
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Card 2 */}
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-9">
          <Link to="/" className="card-anim block min-w-0 w-full" >
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  // Base / mobile
                  "aspect-square",
                  "md:aspect-square",
                  "lg:aspect-square",

                  "px-0 pb-0 mb-0 overflow-hidden relative"
                )}
              >
                <img
                  src="/images/third-img.jpg"
                  alt={"Zenji Layer 7"}
                  className="w-full h-full object-cover"
                />

                <img
                  src="/images/fourth-img.jpg"
                  alt={"Zenji Layer 7"}
                  className="absolute inset-0 w-full h-full object-cover clip-img"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                  }}
                />
              </CardContent>

              <CardFooter className="bg-bg text-text flex justify-between items-start pt-3 rounded-none">
                <div>
                  <div className="text-xl leading-tight">
                    {"Zenji Layer 7"}
                  </div>

                  <div className="text-xs mt-2 flex items-center gap-1 uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-current" />
                    Bags
                  </div>
                </div>

                <div className="text-xl leading-none">
                  $120.00
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>

        {/* Card 3 */}
        <div className="md:col-span-1 lg:col-span-2 lg:col-start-11">
          <Link to="/" className="card-anim block min-w-0 w-full" >
            <Card className="bg-accent-gray/70 rounded-none py-0 [--card-spacing:0px] w-full">
              <CardContent
                className={cn(
                  // Base / mobile
                  "aspect-square",
                  "md:aspect-square",
                  "lg:aspect-2/3",

                  "px-0 pb-0 mb-0 overflow-hidden relative"
                )}
              >
                <img
                  src="/images/third-img.jpg"
                  alt={"Zenji Layer 8"}
                  className="w-full h-full object-cover"
                />

                <img
                  src="/images/fourth-img.jpg"
                  alt={"Zenji Layer 8"}
                  className="absolute inset-0 w-full h-full object-cover clip-img"
                  style={{
                    clipPath: "inset(0 100% 0 0)",
                  }}
                />
              </CardContent>

              <CardFooter className="bg-bg text-text flex justify-between items-start pt-3 rounded-none">
                <div>
                  <div className="text-xl leading-tight">
                    {"Zenji Layer 8"}
                  </div>

                  <div className="text-xs mt-2 flex items-center gap-1 uppercase">
                    <span className="inline-block w-2 h-2 rounded-full bg-current" />
                    Scarves
                  </div>
                </div>

                <div className="text-xl leading-none">
                  $75.00
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Products;
