import React, { useState } from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormFieldType } from './forms/Paitentform'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export interface CustemProps {
    control: Control<any>,
    fieldtype: FormFieldType,
    name: string,
    label?: string,
    description?: string,
    placeholder?: string,
    iconSrc?: string,
    iconalt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any, props: CustemProps }) => {
    const [phoneValue, setPhoneValue] = useState()
    const { iconalt, iconSrc, fieldtype,
        placeholder, dateFormat, showTimeSelect, renderSkeleton } = props;

    switch (fieldtype) {
        case FormFieldType.INPUT:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconalt || 'icon'}
                            height={24}
                            width={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-input border-0' />
                    </FormControl>
                </div>
            )

        case FormFieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    defaultCountry='US'
                    placeholder={props.placeholder}
                    international
                    withCountryCallingCode
                    value={field.value as E164Number | undefined}
                    onChange={field.onChange}
                    className='input-phone'
                />
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image
                        // C:\Users\sahoo\OneDrive\Documents\MERN\careplus\public\logo\calender_logo.svg
                        src="/logo/calender_logo.svg"
                        height={24}
                        width={24}
                        alt="calender"
                        className='ml-2'
                    />
                    <FormControl>
                        <DatePicker selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? 'MM/dd/yyyy'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName='date-picker'
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={placeholder}>
                                </SelectValue>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea placeholder={placeholder}
                        {...field}
                        disabled={props.disabled}
                        className='shad-textArea' />
                </FormControl>
            )
        case FormFieldType.CHEACKBOX:
            return (
                <FormControl>
                    <div className='flex items-center gap-4'>
                        <Checkbox
                            id={props.name}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                        <Label htmlFor={props.name} className='checkbox-label'>
                            {props.label}
                        </Label>
                    </div>
                </FormControl>
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustemProps) => {
    const { control, fieldtype, name, label, placeholder, iconSrc, iconalt } = props;
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldtype !== FormFieldType.CHEACKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderField field={field} props={props} />

                    <FormMessage className='shad-error' />

                </FormItem>
            )}
        />
    )
}

export default CustomFormField