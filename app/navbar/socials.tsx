import Image from 'next/image';

const Socials = () => {
  return (
    <div className="flex gap-12">
      <a>
        <Image
          className="hover:text-entensy-primary"
          src="/images/instagram.svg"
          width={20}
          height={20}
          alt="instagram"
        />
      </a>
      <a href="">
        <Image
          className="hover:text-entensy-primary"
          src="/images/facebook.svg"
          width={20}
          height={20}
          alt="facebook"
        />
      </a>
      <a href="">
        <Image
          className="hover:text-entensy-primary"
          src="/images/twitter.svg"
          width={20}
          height={20}
          alt="twitter"
        />
      </a>
      <a href="">
        <Image
          className="hover:text-entensy-primary"
          src="/images/linkedin.svg"
          width={20}
          height={20}
          alt="linkedin"
        />
      </a>
    </div>
  );
};

export default Socials;
