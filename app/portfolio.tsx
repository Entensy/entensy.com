'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';

const Portfolio = () => {
  return (
    <section>
      <div className="container mx-auto px-4 py-32">
        <div className="flex w-full flex-col items-center justify-center gap-12 py-4 lg:pb-10">
          <h1 className="text-lg font-bold capitalize ">service</h1>
          <span>Lorem ipsum dolor sit amet.</span>
        </div>

        <Carousel className="mx-9">
          <CarouselContent>
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <div className=" flex flex-col items-center rounded-[2rem] border-[1px] border-entensy-secondery-dark shadow-sm">
                <Image
                  className="w-3/4 p-4"
                  src="/images/1.svg"
                  height={80}
                  width={80}
                  alt="image"
                />
                <div className="flex flex-col gap-4 px-8 py-12">
                  <h3 className=" text-center font-medium capitalize">
                    HR System Management
                  </h3>
                  <span className="capitalize text-entensy-accent-light">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Omnis earum deserunt aspernatur.
                  </span>
                  <Button variant="link" className="flex gap-4">
                    visit here
                    <ArrowTopRightIcon />
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious variant="secondary" />
          <CarouselNext variant="secondary" />
        </Carousel>
      </div>
    </section>
  );
};

export default Portfolio;
