import { clsx, type ClassValue as _ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export type ClassValue = _ClassValue

export const cn = (...inputs: _ClassValue[]) => {
	return twMerge(clsx(inputs))
}
