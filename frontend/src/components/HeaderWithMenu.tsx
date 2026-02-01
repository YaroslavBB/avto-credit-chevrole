"use client";

import { useState } from "react";
import type { Car, HeaderSettings } from "@/lib/api";
import { getStrapiMediaUrl } from "@/lib/api";
import HeaderBar from "@/components/HeaderBar";
import SideCarMenu from "@/components/SideCarMenu";

type HeaderWithMenuProps = {
  header: HeaderSettings | null;
  cars: Car[];
};

export default function HeaderWithMenu({ header, cars }: HeaderWithMenuProps) {
  const [open, setOpen] = useState(false);
  const docUrl = header?.docFile?.url ? getStrapiMediaUrl(header.docFile.url) : null;

  return (
    <>
      <HeaderBar data={header} onMenuClick={() => setOpen(true)} />
      <SideCarMenu
        cars={cars}
        open={open}
        onClose={() => setOpen(false)}
        docTitle={header?.docTitle ?? null}
        docUrl={docUrl}
      />
    </>
  );
}
