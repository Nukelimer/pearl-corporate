import { cn } from '@/lib/utils';
import React from 'react'

function StraightVerticalLine({className}:{className?:string}) {
  return <div className={cn("bg-accent h-13 mb-4 w-px mx-auto", className)}></div>;
}

export default StraightVerticalLine