import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';

const About = () => {
  return (
    <section>
      <div className="container mx-auto px-8 py-32 lg:px-60">
        <h1 className="text-center text-lg font-bold capitalize">about</h1>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="container mx-auto flex flex-col items-center gap-4 py-4 lg:flex-row">
                <span className="text-entensy-accent-dark flex w-full items-center justify-center text-base capitalize lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, aperiam? Dolor, pariatur iste rem cum, ipsam odit
                  officiis necessitatibus itaque doloribus minus, officia
                  possimus excepturi!
                </span>
                <Image
                  className="w-3/4 lg:w-1/4"
                  src={'/images/1.svg'}
                  width={80}
                  height={80}
                  alt="image"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="container mx-auto flex flex-col items-center gap-4 py-4 lg:flex-row">
                <span className="text-entensy-accent-dark flex w-full items-center justify-center text-base capitalize lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, aperiam? Dolor, pariatur iste rem cum, ipsam odit
                  officiis necessitatibus itaque doloribus minus, officia
                  possimus excepturi!
                </span>
                <Image
                  className="w-3/4 lg:w-1/4"
                  src={'/images/1.svg'}
                  width={80}
                  height={80}
                  alt="image"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="container mx-auto flex flex-col items-center gap-4 py-4 lg:flex-row">
                <span className="text-entensy-accent-dark flex w-full items-center justify-center text-base capitalize lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, aperiam? Dolor, pariatur iste rem cum, ipsam odit
                  officiis necessitatibus itaque doloribus minus, officia
                  possimus excepturi!
                </span>
                <Image
                  className="w-3/4 lg:w-1/4"
                  src={'/images/1.svg'}
                  width={80}
                  height={80}
                  alt="image"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="container mx-auto flex flex-col items-center gap-4 py-4 lg:flex-row">
                <span className="text-entensy-accent-dark flex w-full items-center justify-center text-base capitalize lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, aperiam? Dolor, pariatur iste rem cum, ipsam odit
                  officiis necessitatibus itaque doloribus minus, officia
                  possimus excepturi!
                </span>
                <Image
                  className="w-3/4 lg:w-1/4"
                  src={'/images/1.svg'}
                  width={80}
                  height={80}
                  alt="image"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="container mx-auto flex flex-col items-center gap-4 py-4 lg:flex-row">
                <span className="text-entensy-accent-dark flex w-full items-center justify-center text-base capitalize lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, aperiam? Dolor, pariatur iste rem cum, ipsam odit
                  officiis necessitatibus itaque doloribus minus, officia
                  possimus excepturi!
                </span>
                <Image
                  className="w-3/4 lg:w-1/4"
                  src={'/images/1.svg'}
                  width={80}
                  height={80}
                  alt="image"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-bold">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="container mx-auto flex flex-col items-center gap-4 py-4 lg:flex-row">
                <span className="text-entensy-accent-dark flex w-full items-center justify-center text-base capitalize lg:w-2/3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Provident, aperiam? Dolor, pariatur iste rem cum, ipsam odit
                  officiis necessitatibus itaque doloribus minus, officia
                  possimus excepturi!
                </span>
                <Image
                  className="w-3/4 lg:w-1/4"
                  src={'/images/1.svg'}
                  width={80}
                  height={80}
                  alt="image"
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default About;
