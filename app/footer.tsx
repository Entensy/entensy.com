'use client';
import Logo from './navbar/logo';
import Socials from './navbar/socials';
import { Button } from '@/components/ui/button';
import { MobileIcon } from '@radix-ui/react-icons';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-center justify-evenly gap-8 bg-entensy-secondery-dark py-12 lg:flex-row lg:gap-0">
        <div className="flex flex-col">
          <Logo />
          <span className="hidden pt-12 lg:flex">© 2024 Entensy</span>
        </div>
        <div className="flex flex-col gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col items-center gap-0 space-x-0 lg:items-start">
              <Button variant="link" className="text-center">
                Services
              </Button>
              <Button variant="link" className="text-center">
                Portfolio
              </Button>
              <Button variant="link" className="text-center">
                Contact Us
              </Button>
              <Button variant="link" className="text-center">
                About Us
              </Button>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-col gap-4">
          <span>
            <MobileIcon className="inline-block" />
            +964 770 864 5008
          </span>
          <span>info@entensy.com</span>
        </div>
        <div>
          <Socials />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
