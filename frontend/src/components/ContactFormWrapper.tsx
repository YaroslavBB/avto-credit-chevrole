"use client";

import { useState } from "react";
import ContactForm from "./ContactForm";

type ContactFormWrapperProps = {
  triggerLabel: string;
};

export default function ContactFormWrapper({ triggerLabel }: ContactFormWrapperProps) {
  const [open, setOpen] = useState(false);
  const [preselectedCar, setPreselectedCar] = useState<string | undefined>();

  const openForm = (carTitle?: string) => {
    setPreselectedCar(carTitle);
    setOpen(true);
  };

  // Expose openForm for header button (no car preselected)
  const handleOpen = () => openForm();

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark text-sm font-medium"
      >
        {triggerLabel}
      </button>
      <ContactForm isOpen={open} onClose={() => setOpen(false)} preselectedCar={preselectedCar} />
    </>
  );
}
