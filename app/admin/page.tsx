import StatCard from '@/components/StatCard'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/DataTable'
import { getRecentAppointmentList } from '@/lib/actions/appointment.action'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Admin = async () => {

    const appointments = await getRecentAppointmentList();
    console.log({ recentAppointments: appointments });

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link href='/' className='cursor-pointer'>
                    <Image
                        src='/logo/Logo.svg'
                        width={32}
                        height={162}
                        alt='logo'
                        className='h-8 w-fit'
                    />
                </Link>
                <p className='text-16-semibold'>Admin dashboard</p>
            </header>

            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>Welcome 👋</h1>
                    <p className='text-dark-700'>Start day with managing new appointments</p>
                </section>

                <section className='admin-stat'>
                    <StatCard
                        type='appointments'
                        count={appointments.scheduledCount}
                        label='Scheduled appointments'
                        icons='/logo/calender_logo.svg'
                    />
                    <StatCard
                        type='pending'
                        count={appointments.pendingCount}
                        label='Pending appointments'
                        icons='/logo/pending-icon.png'
                    />
                    <StatCard
                        type='cancelled'
                        count={appointments.cancelledCount}
                        label='Cancelled appointments'
                        icons='/logo/cancelled-icon.png'
                    />
                </section>

                <DataTable columns={columns} data={appointments.documents} />
                {/* <DataTable columns={columns} data={data} /> */}

            </main>

        </div>
    )
}

export default Admin