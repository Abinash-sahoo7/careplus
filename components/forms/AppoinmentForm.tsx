"use client"

import { z } from "zod";
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/Validation";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./Paitentform";

const AppoinmentForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
        setIsLoading(true);
        try {
            console.log('inside try');
            const userData = { name, email, phone };
            const newUser = await createUser(userData)
            if (newUser) {
                console.log('inside if block');
                router.push(`/patients/${newUser.$id}/register`)
            }
            console.log('end try');
        } catch (error) {
            console.log("Error occure in On-bording form : ", error)
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <h1 className="header">Hi there 👋</h1>
                <p className="text-dark-700">Request a new appointment in 10 seconds</p>

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.INPUT}
                    name="name"
                    label="Full Name"
                    placeholder="Lundy Marty"
                    iconSrc="/logo/usernamelogo.svg"
                    iconalt="user"
                    description=""
                />

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.INPUT}
                    name="email"
                    label="Email"
                    placeholder="LundyMarty@demowork.com"
                    iconSrc="/logo/messagelogo.svg"
                    iconalt="email"
                    description=""
                />

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.PHONE_INPUT}
                    name="phone"
                    label="Phone number"
                    placeholder="(08) 4949-5154"
                />

                <SubmitButton isLoading={isLoading} >Submit And Continue</SubmitButton>
            </form>
        </Form>
    )
}

export default AppoinmentForm