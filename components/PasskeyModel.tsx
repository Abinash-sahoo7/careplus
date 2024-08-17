'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


import React, { useEffect, useState } from "react"


const PasskeyModel = () => {

    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const path = usePathname();
    console.log("Current url path name : ", path);

    const encryptedKey = typeof window !== 'undefined' ? localStorage.getItem("accessKey") : null;

    useEffect(() => {
        const passKey = encryptedKey && decryptKey(encryptedKey);

        if (path) {
            if (passKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
                setOpen(false);
                router.push('/admin');
            }
            else {
                setOpen(true);
            }
        }

    }, [encryptedKey])


    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
            const encryptedKey = encryptKey(passkey);

            localStorage.setItem("accessKey", encryptedKey);
            console.log("PassKey validate successfully : ", passkey);
            setOpen(false);
        }
        else {
            setError('Invalid PassKey! Please try Again.');
        }
    }

    const setModel = () => {
        setOpen(false);
        router.push('/');
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="shad-alert-dialog">
                <AlertDialogHeader >
                    <AlertDialogTitle className="flex items-start justify-between">
                        Admin access verification
                        <Image
                            src='/logo/cancle.svg'
                            width={20}
                            height={20}
                            alt="cancle"
                            className="cursor-pointer"
                            onClick={() => setModel()}
                        />
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        To access the admin page, please enter the passkey.....
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div>
                    <InputOTP maxLength={6} className="" value={passkey} onChange={(Value) => setPasskey(Value)}>
                        <InputOTPGroup className="shad-otp">
                            <InputOTPSlot className="shad-otp-slot" index={0} />
                            <InputOTPSlot className="shad-otp-slot" index={1} />
                            <InputOTPSlot className="shad-otp-slot" index={2} />
                            <InputOTPSlot className="shad-otp-slot" index={3} />
                            <InputOTPSlot className="shad-otp-slot" index={4} />
                            <InputOTPSlot className="shad-otp-slot" index={5} />
                        </InputOTPGroup>
                    </InputOTP>

                    {
                        error &&
                        <p className="shad-error text-14-regular mt-4 flex justify-center">{error}</p>
                    }
                </div>

                <AlertDialogFooter>
                    <AlertDialogAction className="shad-primary-btn w-full" onClick={(e) => validatePasskey(e)}>
                        Enter Admin passkey
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default PasskeyModel