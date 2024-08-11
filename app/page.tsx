import { Button } from "@/components/ui/button";
import Image from "next/image";
import Paitentform from "@/components/forms/Paitentform";
import Link from "next/link";



export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">

      {/* { TO Do OTP verification  } */}

      <section className="container remove-scrollbar my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/logo/Logo.svg"
            height={1000}
            width={1000}
            alt="paitent"
            className="mb-12 h-10 w-fit"
          />

          <Paitentform />

          <div className="flex justify-between text-14-regular mt-4">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @2024 carepulse copyright
            </p>
          </div>
          <Link href="/?admin=true" className="text-green-500">
            Admin
          </Link>
        </div>
      </section>

      <Image
        src="/images/Homepageimg.png"
        height={1000}
        width={1000}
        alt="paitent"
        className="side-img max-w-[50%]"
      />

    </div>
  );
}
