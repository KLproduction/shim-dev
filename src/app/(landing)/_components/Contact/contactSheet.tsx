"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useContactFormStore } from "@/hook/store";
import { useMediaQuery } from "react-responsive";

const ContactHeader = () => (
  <>
    <p className="text-muted-foreground text-xs font-semibold tracking-[0.2em] uppercase">
      Contact
    </p>
    <div className="space-y-2">
      <SheetTitle className="text-2xl font-semibold">
        Start a project
      </SheetTitle>
      <SheetDescription className="text-sm">
        Share a few details and we will reply within 48 hours.
      </SheetDescription>
    </div>
  </>
);

const ContactForm = () => (
  <form className="space-y-4">
    <div className="grid gap-4">
      <div className="space-y-2">
        <label htmlFor="contact-name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Your name"
          autoComplete="name"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-company" className="text-sm font-medium">
          Company
        </label>
        <Input
          id="contact-company"
          name="company"
          placeholder="Company name (optional)"
          autoComplete="organization"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-sm font-medium">
          Project notes
        </label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Tell us what you want to build"
          rows={4}
          required
        />
      </div>
    </div>
    <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
      <Button type="submit" className="w-full sm:w-auto">
        Send request
      </Button>
      <p className="text-muted-foreground text-sm">
        Typical response time: 48 hours.
      </p>
    </div>
  </form>
);

const ContactSheet = () => {
  const isMobile = useMediaQuery({ maxWidth: 639 });
  const { isContactFormOpen, setContactFormOpen } = useContactFormStore();

  return (
    <div className="flex items-center gap-3">
      {isMobile ? (
        <Drawer
          direction="bottom"
          open={isContactFormOpen}
          onOpenChange={setContactFormOpen}
        >
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              Contact us
            </Button>
          </DrawerTrigger>
          <DrawerContent className="max-h-[85vh] gap-6 overflow-y-auto pb-6">
            <DrawerHeader className="space-y-4">
              <DrawerTitle className="text-2xl font-semibold">
                Start a project
              </DrawerTitle>
              <DrawerDescription className="text-sm">
                Share a few details and we will reply within 48 hours.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4 pb-10">
              <ContactForm />
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isContactFormOpen} onOpenChange={setContactFormOpen}>
          <SheetTrigger asChild>
            <Button variant="outline">Contact us</Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-xl gap-6">
            <SheetHeader className="space-y-4">
              <ContactHeader />
            </SheetHeader>
            <div className="px-4 pb-6">
              <ContactForm />
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default ContactSheet;
