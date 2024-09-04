
import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions';
import Image from 'next/image'

import * as Sentry from "@sentry/nextjs";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  // let user = null;
  // try {
  //   user = await getUser(userId);
  // } catch (error) {
  //   console.log("Error while getting in Paitents : ", error);
  // }
  const user = await getUser(userId);

  // Add 'jane' to a set
  // used for tracking the number of users that viewed a page.
  Sentry.metrics.set("user_view_register", user.name);

  return (
    <div className="flex h-screen max-h-screen">

      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image
            src="/logo/Logo.svg"
            height={1000}
            width={1000}
            alt="paitent"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm user={user} />

          <p className="coyright py-12">
            @2024 carepulse copyright
          </p>
        </div>
      </section>

      <Image
        // C:\Users\sahoo\OneDrive\Documents\MERN\careplus\public\images\registartion_page.png
        src="/images/registartion_page.png"
        height={1000}
        width={1000}
        alt="paitent"
        className="side-img max-w-[390px]"
      />

    </div>
  )
}

export default Register