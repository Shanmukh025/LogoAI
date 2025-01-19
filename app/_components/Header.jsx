import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Header() {
  return (
    <div className="px-10 lg:px-32 xl:px-48 p-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        {" "}
        <Image src={"/logo.svg"} alt="logo" width={30} height={80} />
        <h2 className="font-extrabold text-lg">LogoCake</h2>
      </div>
      <Button>Get Started</Button>
    </div>
  );
}

export default Header;
