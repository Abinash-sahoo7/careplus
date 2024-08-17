import { Button } from "@/components/ui/button";
import Image from "next/image";
import Paitentform from "@/components/forms/Paitentform";
import Link from "next/link";
import PasskeyModel from "@/components/PasskeyModel";



export default function Home({ searchParams }: SearchParamProps) {

  const isAdmin = searchParams.admin === 'true'

  return (
    <div className="flex h-screen max-h-screen">

      {/* { TO Do OTP verification  } */}
      {isAdmin && <PasskeyModel />}

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

          <div className="flex justify-between text-14-regular mt-8">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @2024 carepulse copyright
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
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
