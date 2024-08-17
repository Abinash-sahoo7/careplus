

import AppoinmentForm from '@/components/forms/AppoinmentForm';
import { getPaitent } from '@/lib/actions/patient.actions';
import Image from 'next/image'

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {

    console.log('userId : ', userId)
    const patient = await getPaitent(userId);
    console.log('patient : ', patient);
    console.log('patientId : ', patient?.$id);

    return (
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container my-auto">
                <div className="sub-container max-w-[860px] flex-1 justify-between">
                    <Image
                        src="/logo/Logo.svg"
                        height={1000}
                        width={1000}
                        alt="patient"
                        className="mb-12 h-10 w-fit"
                    />

                    <AppoinmentForm
                        type="create"
                        userId={userId}
                        patientId={patient?.$id}
                    />

                    <p className="copyright mt-10 py-12">
                        @2024 carepulse copyright
                    </p>
                </div>
            </section>

            <Image
                // C:\Users\sahoo\OneDrive\Documents\MERN\careplus\public\images\appoinment-page.png
                src="/images/appoinment-page.png"
                height={1000}
                width={1000}
                alt="Appoinment"
                className="side-img max-w-[390px] bg-bottom"
            />
        </div>
    )
}

export default NewAppointment