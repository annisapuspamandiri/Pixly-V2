
import { AppTheme } from './types';

export const THEME_CONFIGS = {
  [AppTheme.PinkSoft]: {
    bg: 'bg-[#FDF2F8]',
    card: 'bg-white',
    text: 'text-pink-900',
    primary: 'bg-pink-500 hover:bg-pink-600',
    accent: 'text-pink-500',
    border: 'border-pink-200',
    input: 'focus:ring-pink-400 focus:border-pink-400',
    buttonText: 'text-white'
  },
  [AppTheme.BlueSky]: {
    bg: 'bg-[#F0F9FF]',
    card: 'bg-white',
    text: 'text-sky-900',
    primary: 'bg-sky-500 hover:bg-sky-600',
    accent: 'text-sky-500',
    border: 'border-sky-200',
    input: 'focus:ring-sky-400 focus:border-sky-400',
    buttonText: 'text-white'
  },
  [AppTheme.MidnightBlue]: {
    bg: 'bg-[#0F172A]',
    card: 'bg-[#1E293B]',
    text: 'text-slate-100',
    primary: 'bg-blue-600 hover:bg-blue-700',
    accent: 'text-blue-400',
    border: 'border-slate-700',
    input: 'focus:ring-blue-500 focus:border-blue-500 bg-slate-800 text-white border-slate-600',
    buttonText: 'text-white'
  },
  [AppTheme.MaroonMahony]: {
    bg: 'bg-[#450A0A]',
    card: 'bg-[#7F1D1D]',
    text: 'text-red-50',
    primary: 'bg-red-900 hover:bg-black',
    accent: 'text-red-300',
    border: 'border-red-800',
    input: 'focus:ring-red-400 focus:border-red-400 bg-red-950 text-white border-red-900',
    buttonText: 'text-white'
  },
  [AppTheme.ChocolateCaramel]: {
    bg: 'bg-[#451A03]',
    card: 'bg-[#78350F]',
    text: 'text-amber-50',
    primary: 'bg-amber-900 hover:bg-black',
    accent: 'text-amber-300',
    border: 'border-amber-800',
    input: 'focus:ring-amber-400 focus:border-amber-400 bg-amber-950 text-white border-amber-900',
    buttonText: 'text-white'
  }
};
