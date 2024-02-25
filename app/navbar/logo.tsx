import Image from 'next/image';

const Logo = () => {
  return (
    <a href="#" className="flex items-center justify-center gap-2">
      <Image src="/images/logo.png" alt="logo" width={96} height={96} />
      <span className="word text-entensy-logo-light dark:text-entensy-logo-dark hidden text-3xl font-extrabold uppercase tracking-widest lg:block">
        Entensy
      </span>
    </a>
  );
};

export default Logo;
