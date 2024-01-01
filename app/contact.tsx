import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const Contact = () => {
  return (
    <section>
      <div className="container mx-auto px-8 py-24 lg:px-60">
        <div className="flex w-full flex-col items-center justify-center gap-12 py-4 lg:pb-10">
          <h1 className="text-lg font-bold capitalize ">service</h1>
          <span>Lorem ipsum dolor sit amet.</span>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4">
            <Input />
            <Input />
          </div>
          <Input />
          <Textarea />
          <div className="self-center">
            <Button size="lg">Submit</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
