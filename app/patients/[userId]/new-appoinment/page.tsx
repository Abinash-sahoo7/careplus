

import AppoinmentForm from '@/components/forms/AppoinmentForm';
import { getPaitent } from '@/lib/actions/patient.actions';
import Image from 'next/image'

const Appointment = async ({ params: { PaitentId } }: SearchParamProps) => {

    console.log('userId : ', PaitentId)
    const paitent = await getPaitent(PaitentId);

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

                    {/* <RegisterForm user={user} /> */}
                    {/* <AppoinmentForm Paitent={paitent} /> */}

                    <p className="coyright py-12">
                        @2024 carepulse copyright
                    </p>
                </div>
            </section>

            <Image
                // C:\Users\sahoo\OneDrive\Documents\MERN\careplus\public\images\appoinment-page.png
                src="/images/appoinment-page.png"
                height={1000}
                width={1000}
                alt="paitent"
                className="side-img max-w-[390px]"
            />
        </div>
    )
}

export default Appointment