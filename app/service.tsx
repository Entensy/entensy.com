import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
const Service = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="flex w-full flex-col items-center justify-center gap-12 py-4 lg:pb-10">
          <h1 className="text-lg font-bold capitalize ">service</h1>
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10">
          <Card className="bg-entensy-background flex w-full flex-col items-center justify-center rounded-3xl pt-4 shadow-lg lg:w-1/4">
            <CardContent>
              <Image
                className="py-4"
                src="/images/1.svg"
                height={80}
                width={80}
                alt="image"
              />
            </CardContent>
            <CardFooter>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                impedit debitis esse?
              </p>
            </CardFooter>
          </Card>
          <Card className="bg-entensy-background flex w-full flex-col items-center justify-center rounded-3xl pt-4 shadow-lg lg:w-1/4">
            <CardContent>
              <Image
                className="py-4"
                src="/images/1.svg"
                height={80}
                width={80}
                alt="image"
              />
            </CardContent>
            <CardFooter>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                impedit debitis esse?
              </p>
            </CardFooter>
          </Card>
          <Card className="bg-entensy-background flex w-full flex-col items-center justify-center rounded-3xl pt-4 shadow-lg lg:w-1/4">
            <CardContent>
              <Image
                className="py-4"
                src="/images/1.svg"
                height={80}
                width={80}
                alt="image"
              />
            </CardContent>
            <CardFooter>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                impedit debitis esse?
              </p>
            </CardFooter>
          </Card>
          <Card className="bg-entensy-background flex w-full flex-col items-center justify-center rounded-3xl pt-4 shadow-lg lg:w-1/4">
            <CardContent>
              <Image
                className="py-4"
                src="/images/1.svg"
                height={80}
                width={80}
                alt="image"
              />
            </CardContent>
            <CardFooter>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque
                impedit debitis esse?
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Service;
