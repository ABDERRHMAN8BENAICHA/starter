import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
import React from 'react'


export default function Home({ }) {
    return (

        <div>
            <DotPattern
                width={20}
                height={20}
                cx={1}
                cy={1}
                cr={1}
                className={cn(
                    "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
                )}
            />
        </div>
    )
}