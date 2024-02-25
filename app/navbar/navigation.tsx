'use client';

import SwitchLanguage from './switch-language';
import Socials from './socials';
import Logo from './logo';
import { Button } from '@/components/ui/button';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [scroll, setScroll] = useState<string>('');

  useEffect(() => {
    document.addEventListener('scroll', () => {
      setScroll(window.scrollY > 50 ? 'shadow-lg' : '');
    });
  });

  return (
    <nav
      className={cn(
        'shadow-gold-100 sticky top-0 z-50 flex w-full items-center justify-between bg-entensy-background px-10 py-2 shadow-sm transition-all duration-150 ease-linear',
        scroll
      )}
    >
      <Logo />
      <NavigationMenu>
        <NavigationMenuList className="hidden lg:block">
          <Button variant="link" className="text-center font-en font-medium">
            Services
          </Button>
          <Button variant="link" className="text-center font-en font-medium">
            Portfolio
          </Button>
          <Button variant="link" className="text-center font-en font-medium">
            Contact Us
          </Button>
          <Button variant="link" className="text-center font-en font-medium">
            About Us
          </Button>
          <Button variant="link" className="text-center font-en font-medium">
            FAQ
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="hidden lg:block">
        <SwitchLanguage />
      </div>
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <HamburgerMenuIcon
            className="active:text-entensy-active hover:text-entensy-hover focus:text-entensy-focus hover:text-entensy-primary"
            height={32}
            width={32}
          />
        </SheetTrigger>
        <SheetContent className="flex items-center justify-center gap-7">
          <SheetHeader>
            <SheetTitle className="absolute left-0 top-0">
              <div className="pl-7 pt-2">
                <Logo />
              </div>
            </SheetTitle>
            <SheetDescription className="flex flex-col gap-28">
              <NavigationMenu className="w-full max-w-full pt-40">
                <NavigationMenuList className="flex-col items-center justify-center gap-8 space-x-0">
                  <Button
                    variant="link"
                    className="text-center font-en font-medium  "
                  >
                    Services
                  </Button>
                  <Button
                    variant="link"
                    className="text-center font-en font-medium "
                  >
                    Portfolio
                  </Button>
                  <Button
                    variant="link"
                    className="text-center font-en font-medium "
                  >
                    Contact Us
                  </Button>
                  <Button
                    variant="link"
                    className="text-center font-en font-medium "
                  >
                    About Us
                  </Button>
                  <Button
                    variant="link"
                    className="text-center font-en font-medium "
                  >
                    FAQ
                  </Button>
                </NavigationMenuList>
              </NavigationMenu>
              <SwitchLanguage />
              <Socials />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navigation;
