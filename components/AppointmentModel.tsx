

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import AppoinmentForm from './forms/AppoinmentForm';
import { Appointment } from '@/types/appwrite.types';


const AppointmentModel = ({
    type,
    patientId,
    userId,
    appointment,

}: {
    type: 'schedule' | 'cancle',
    patientId: string,
    userId: string,
    appointment: Appointment,
}) => {

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button variant='ghost' className={`capitalize ${type === 'schedule' && 'text-green-500'}`}>
                    {type}
                </Button>
            </DialogTrigger>
            <DialogContent className='shad-diaglog sm:max-w-md'>
                <DialogHeader className='mb-4 space-y-3'>
                    <DialogTitle className='capitalize'>{type} Appointment</DialogTitle>
                    <DialogDescription>
                        Please fill in the following details to {type} an appointment
                    </DialogDescription>
                </DialogHeader>

                <AppoinmentForm
                    userId={userId}
                    patientId={patientId}
                    type={type}
                    appointment={appointment}
                    setOpen={setOpen}
                />
            </DialogContent>
        </Dialog>

    )
}

export default AppointmentModel