import Image from "next/image";
import { Suspense } from "react";
import ContactFormDesign from "../Compoent/Campionform";

export default function campaioninfo() {
  return (
    <>
       <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
<ContactFormDesign />
</Suspense>
    
    </>
   
  );
}
