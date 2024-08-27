"use client"

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl } from "@/components/ui/form"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { FormFieldType } from "./Paitentform";
import { registerPaitent } from '@/lib/actions/patient.actions'
import { PatientFormValidation } from "@/lib/Validation";


const RegisterForm = ({ user }: { user: User }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    // 1. Define your form.
    const form = useForm<z.infer<typeof PatientFormValidation>>({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: user.name,
            email: user.email,
            phone: user.phone
        },
    })

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
        setIsLoading(true);
        console.log("Inside the RegisterUser Submit button : ");

        let formData;

        console.log("onSubmit function identificationDocument : ", values.identificationDocument);

        if (values.identificationDocument && values.identificationDocument.length > 0) {
            const blobFile = new Blob([values.identificationDocument[0]], {
                type: values.identificationDocument[0].type
            })

            formData = new FormData();
            formData.append('blobFile', blobFile);
            formData.append('fileName', values.identificationDocument[0].name);
        }

        console.log("Inside the RegisterUser Submit The identificationDocument file : ", formData);
        console.log('user Id : ', user.$id);

        try {

            const paitentData = {
                ...values,
                userId: user.$id,
                birthDate: new Date(values.birthDate),
                identificationDocument: formData,
            }

            console.log("Inside try block of the RegisterUser Submit Event paitentData : ", paitentData);

            // @ts-ignore
            const paitent = await registerPaitent(paitentData);
            console.log("Inside try block of the RegisterUser Event paitent : ", paitent);

            if (paitent) {
                router.push(`/patients/${user.$id}/new-appointment`)
            }


        } catch (error) {
            console.log("Error occure in register form : ", error)
        }
        setIsLoading(false);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className="space-y-4">
                    <h1 className="header">Welcome 👋</h1>
                    <p className="text-dark-700">Let us know more about yourself.</p>
                </section>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Personal Information</h2>
                    </div>
                </section>

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

                <div className="flex flex-col gap-6 xl:flex-row">
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
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.DATE_PICKER}
                        name="birthDate"
                        label="Date of Birth"
                        placeholder="27-07-2024"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.SKELETON}
                        name="gender"
                        label="Gender"
                        renderSkeleton={(field) => (
                            <FormControl>
                                <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className="radio-group">
                                            <RadioGroupItem value={option} id={option} />
                                            <Label className="cursor-pointer" htmlFor={option}>
                                                {option}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.INPUT}
                        name="address"
                        label="Address"
                        placeholder="ex: 14 street, New York. NY - 501"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.INPUT}
                        name="occupation"
                        label="Occupation"
                        placeholder="Software Engineer"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.INPUT}
                        name="emergencyContactName"
                        label="Emergency contact name"
                        placeholder="Guardian's name"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.PHONE_INPUT}
                        name="emergencyContactNumber"
                        label="Emergency contact number"
                        placeholder="ex: +1(868) 5515"
                    // iconSrc="/logo/phone Icon.svg"
                    // iconalt="phone"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Medical Information</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.SELECT}
                    name="primaryPhysician"
                    label="Primary Phyiscian"
                    placeholder="Select a Phyiscian"
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

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.INPUT}
                        name="insuranceProvider"
                        label="Insurance Provider"
                        placeholder="ex: BlueCross"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.INPUT}
                        name="insurancePolicyNumber"
                        label="Insurance policy number"
                        placeholder="ex: ABC1234567"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.TEXTAREA}
                        name="allergies"
                        label="Allergies (if any)"
                        placeholder="ex: Peanuts, Penicillin, Pollen"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.TEXTAREA}
                        name="currentMedication"
                        label="Current medications"
                        placeholder="ex: Ibuprofen 200mg, Levothyroxine 50mcg"
                    />
                </div>

                <div className="flex flex-col gap-6 xl:flex-row">
                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.TEXTAREA}
                        name="familyMedicalHistory"
                        label="Family medical history (if relevant)"
                        placeholder="ex: Mother had breast cancer"
                    />

                    <CustomFormField
                        control={form.control}
                        fieldtype={FormFieldType.TEXTAREA}
                        name="pastMedicalHistory"
                        label="Past medical history"
                        placeholder="ex: Asthma diagnosis in childhood"
                    />
                </div>

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Identification and Verfication</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.SELECT}
                    name="identificationType"
                    label="Identification type"
                    placeholder="Select an Identification"
                >
                    {IdentificationTypes.map((identification) => (
                        <SelectItem key={identification} value={identification}>
                            <p>{identification}</p>
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.INPUT}
                    name="identificationNumber"
                    label="Identification Number"
                    placeholder="ex 1234567"
                />

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.SKELETON}
                    name="identificationDocument"
                    label="Scanned Copy of Identification Document"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <FileUploader files={field.value} onChange={field.onChange} />
                        </FormControl>
                    )}
                />

                <section className="space-y-6">
                    <div className="mb-9 space-y-1">
                        <h2 className="sub-header">Consent and Privacy</h2>
                    </div>
                </section>

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.CHEACKBOX}
                    name="treatmentConsent"
                    label="I consent to receive treatment for my health condition."
                />

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.CHEACKBOX}
                    name="disclosureConsent"
                    label="I consent to the use and disclosure of my health information for treatment purposes."
                />

                <CustomFormField
                    control={form.control}
                    fieldtype={FormFieldType.CHEACKBOX}
                    name="privacyConsent"
                    label="I acknowledge that I have reviewed and agree to the privacy policy"
                />

                {/* <Button type="submit">Submit</Button> */}
                <SubmitButton isLoading={isLoading}>Get Strated</SubmitButton>
            </form>
        </Form>
    )

}

export default RegisterForm
