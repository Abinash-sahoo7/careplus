import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { getAppointment } from '@/lib/actions/appointment.action';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

//  http://localhost:3000/patients/66ae47ed002339440079/new-appointment/success?appointmentId=66bcea1c00019319c0c3

// here the 66ae47ed002339440079 -> searchparams and appointmentId=66bcea1c00019319c0c3 is called queryparams

const Success = async ({ params: { userId }, searchParams }: SearchParamProps) => {

    const appointmentId = (searchParams?.appointmentId) as string || '';
    const appointment = await getAppointment(appointmentId);

    const doctor = Doctors.find(
        (doctor) => doctor.name === appointment.primaryPhysician
    );

    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className='success-img'>
                <Link href='/'>
                    <Image
                        width={1000}
                        height={1000}
                        src='/logo/Logo.svg'
                        alt='logo'
                        className='h-10 w-fit'
                    />
                </Link>

                <section className='flex flex-col items-center'>
                    <Image
                        src='/gifs/success.gif'
                        height={300}
                        width={280}
                        alt='success'
                    />

                    <h2 className='header mb-6 max-w-[600px] text-center'>
                        Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
                    </h2>
                    <p className='text-xl'>We'll be in touch shortly to confirm.</p>

                </section>

                <section className='request-details'>
                    <p className=''>Requested appointment details:</p>
                    <div className='flex items-center gap-3'>
                        <Image
                            src={doctor?.image!}
                            width={100}
                            height={100}
                            className='size-6'
                            alt='doctor'
                        />
                        <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                    </div>
                    <div className='flex items-center gap-3'>
                        <Image
                            //C:\Users\sahoo\OneDrive\Documents\MERN\careplus\public\logo\calender_logo.svg
                            src='/logo/calender_logo.svg'
                            height={40}
                            width={40}
                            alt='calender'
                            className='ml-2 size-7'
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant={'outline'} className='shad-primary-btn' asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className='copyright'>@2024 carepulse copyright</p>
            </div>
        </div>
    )
}

export default Success