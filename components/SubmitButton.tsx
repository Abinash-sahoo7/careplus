import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

export interface ButtonProps {
    isLoading: boolean,
    className?: string,
    children?: React.ReactNode,
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
    return (
        <Button
            type='submit'
            disabled={isLoading}
            className={className ?? 'shad-primary-btn w-full'}
        >
            {isLoading ? (
                <div className='flex items-center gap-4'>
                    <Image
                        src="/logo/loader-circle.svg"
                        height={24}
                        width={24}
                        alt='loader'
                        className='animate-spin'
                    />Loading...
                </div>
            ) : children}
        </Button>
    )
}

export default SubmitButton