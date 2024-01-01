import Image from 'next/image';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section>
      <div className="flex w-full flex-col gap-20 px-4 pb-20 lg:h-[85vh] lg:flex-row-reverse lg:gap-0 lg:px-48 lg:pb-0">
        <div className="w-full lg:w-1/2">
          <Image
            src="/images/hero.svg"
            className="h-full w-full"
            width={500}
            height={500}
            alt="hero"
          />
        </div>
        <div className="flex w-full items-center lg:w-1/2">
          <div className="flex w-full flex-col items-center justify-center gap-11 lg:w-3/5 lg:items-start">
            <h1 className="text-center text-3xl font-bold capitalize leading-normal tracking-[1.60px] lg:text-start lg:text-3xl">
              enhanced, extensive, efficiency
            </h1>
            <span className="text-base">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
              iste recusandae dicta?
            </span>
            <div className="flex gap-2">
              <Button size="lg" className=" rounded-3xl text-lg capitalize">
                Get Started
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className=" rounded-3xl text-lg capitalize"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
