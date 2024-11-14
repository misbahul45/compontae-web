'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const FormHelp = () => {
    const form = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                
                {/* Row 1: Username and Email */}
                <div className="flex gap-4 w-full">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your username" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                
                {/* Message Textarea */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem className="w-full">
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <Textarea rows={12} placeholder="Write your message here" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                
                <Button type="submit" className="mt-4 btn btn-primary w-full">Submit</Button>
            </form>
        </Form>
    );
}

export default FormHelp;
