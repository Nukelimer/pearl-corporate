import { cn } from '@/lib/utils';
import React from 'react'
type Props = {
  styles: string
}
function StraightHorizontalLine({styles}:Props) {
  return <div className={cn(styles)}></div>;
}

export default StraightHorizontalLine