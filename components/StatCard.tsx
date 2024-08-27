import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface StatcardProps {
    type: 'appointments' | 'pending' | 'cancelled',
    count: number,
    label: string,
    icons: string
}

const StatCard = ({ type, count = 0, label, icons }: StatcardProps) => {
    return (
        <div className={clsx("stat-card", {
            "bg-appointments": type === "appointments",
            "bg-pending": type === "pending",
            "bg-cancelled": type === "cancelled",
        })}>
            <div className='flex items-center gap-4'>
                <Image
                    src={icons}
                    width={32}
                    height={32}
                    alt='appointment'
                    className='size-8 w-fit'
                />
                <h2 className='text-32-bold text-white'>{count}</h2>
            </div>
            <p className='text-14-regular'>{label}</p>
        </div>

    )
}

export default StatCard