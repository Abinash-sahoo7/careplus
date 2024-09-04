"use client"

import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { CreateAppointmentSchema, getAppointmentSchema, UserFormValidation } from "@/lib/Validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./Paitentform";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { CreateAppointment, updateAppointment } from "@/lib/actions/appointment.action";
import { Appointment } from "@/types/appwrite.types";

const AppoinmentForm = ({
    userId, patientId, type, appointment, setOpen
}: {
    userId: string,
    patientId: string,
    type: "create" | "cancle" | "schedule";
    appointment: Appointment,
    setOpen: (open: boolean) => void;
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const AppoinmentFormValidation = getAppointmentSchema(type);

    console.log({ appointment });
    // 1. Define your form.
    const form = useForm<z.infer<typeof AppoinmentFormValidation>>({
        resolver: zodResolver(AppoinmentFormValidation),
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician : '',
            schedule: appointment ? new Date(appointment?.schedule) : new Date(Date.now()),
            reason: appointment ? appointment.reason : '',
            note: appointment?.note || '',
            cancellationReason: appointment?.cancellationReason! || ''
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof AppoinmentFormValidation>) {
        setIsLoading(true);
        console.log("Inside the onsubmit function of appointmentForm .");

        let status;
        switch (type) {
            case "schedule":
                status = 'scheduled'
                break;
            case "cancle":
                status = 'cancelled'
                break;
            default:
                status = 'pending'
                break;
        }
        try {
            console.log("Inside the onsubmit function of appointmentForm before type.", type);
            if (type === 'create' && patientId) {
                const appointmentData = {
                    userId,
                    patient: patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason!,
                    note: values.note,
                    status: status as Status
                }
                console.log('AppointmentData : ', appointmentData);

                const appoinment = await CreateAppointment(appointmentData);
                console.log('Appointment : ', appoinment);

                if (appoinment) {
                    form.reset();
                    router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appoinment.$id}`);
                }
            }
            else {
                const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment?.$id,
                    appointment: {
                        primaryPhysician: values.primaryPhysician,
                        schedule: new Date(values.schedule),
                        status: status as Status,
                        cancellationReason: values.cancellationReason
                    },
                    type
                }

                const updatedAppointment = await updateAppointment(appointmentToUpdate)

                if (updatedAppointment) {
                    setOpen && setOpen(false);
                    form.reset();
                }
            }

        } catch (error) {
            console.log("Error occure in Appoinment form : ", error)
        }
        setIsLoading(false);
    }

    let buttonLable;

    switch (type) {
        case 'cancle':
            buttonLable = "Cancle Appointment";
            break;
        case 'schedule':
            buttonLable = "Schedule Appointment";
            break;
        default:
            buttonLable = "Submit Appointment";
            break;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {type === 'create' &&
                    <section className="mb-12 space-y-4">
                        <h1 className="header">Hi there 👋</h1>
                        <p className="text-dark-700">Request a new appointment in 10 seconds</p>
                    </section>}

                {type !== "cancle" && (
                    <>
                        <CustomFormField
                            control={form.control}
                            fieldtype={FormFieldType.SELECT}
                            name="primaryPhysician"
                            label="Doctor"
                            placeholder="Select a Doctor"
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className="flex cursor-pointer items-center gap-2">
                                        <Image
                                            src={doctor.image}
                                            width={32}
                                            height={32}
                                            alt={doctor.name}
                                            className="rounded-full border border-dark-500"
                                        />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            control={form.control}
                            fieldtype={FormFieldType.DATE_PICKER}
                            name="schedule"
                            label="Expected appoinment date"
                            showTimeSelect
                            dateFormat="MM/dd/yyyy - h:mm aa"
                        />

                        <div className="flex flex-col gap-6 xl:flex-row">
                            <CustomFormField
                                control={form.control}
                                fieldtype={FormFieldType.TEXTAREA}
                                name="reason"
                                label="Reason for appoinment"
                                placeholder="Enter reason for appoinment"
                            />

                            <CustomFormField
                                control={form.control}
                                fieldtype={FormFieldType.TEXTAREA}
                                name="note"
                                label="Note"
                                placeholder="Enter notes"
                            />
                        </div>
                    </>
                )}

                {type === "cancle" && (
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.TEXTAREA}
                        name="cancellationReason"
                        label="Reason for cancellation"
                        placeholder="Enter reason for cancellation"
                    />
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancle' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`} >{buttonLable}</SubmitButton>
            </form>
        </Form>
    )
}

export default AppoinmentForm