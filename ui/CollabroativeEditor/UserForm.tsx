'use client';
import { Input } from '@/components/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/Form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

type FormValues = z.infer<typeof formSchema>;
interface UserFormProps {
  setIsUserLoggedIn: (value: boolean) => void;
}
export const UserForm = ({ setIsUserLoggedIn }: UserFormProps) => {
  const form = useForm<Readonly<FormValues>>({ resolver: zodResolver(formSchema) });
  function onSubmit(values: z.infer<typeof formSchema>) {
    localStorage.setItem('user', JSON.stringify(values));
    setIsUserLoggedIn(true);
  }
  return (
    <div className="mt-40 md:mt-0 bg-white border-stone-200 px-6 flex flex-col text-center py-8 rounded-xl gap-6 shadow-xl border min-w-[max(20rem,50dvw)] min-h-[max(20rem,50dvh)] items-center">
      <h2 className="font-bold text-3xl">Shodo AI</h2>
      <h4 className="text-stone-500 text-xl font-semibold">Enter your details to get started</h4>
      <Form {...form}>
        <form className="max-w-sm w-full flex gap-4 flex-col text-left" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>This is your public display name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button
            className="bg-slate-800 no-underline group relative shadow-2xl shadow-zinc-900 rounded-full p-px text-base font-semibold leading-6 inline-block w-fit self-center"
            type="submit"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10 ">
              <span>Continue</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                ></path>
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </form>
      </Form>
    </div>
  );
};
