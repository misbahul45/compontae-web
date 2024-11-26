'use client';

import { RespondenSchema, respondenSchema } from '@/schema/responden-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from '../ui/select';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { createRespon } from '@/actions/respon-action';
import { sleep } from '@/lib/utils';

const renderStar = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
        <span key={index} className="text-yellow-400">
            ⭐
        </span>
    ));
};

const FormResponden = () => {
    const form = useForm({
        resolver: zodResolver(respondenSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            respon: '',
            rating: 0,
        },
    });

    const onSubmit = async(data:RespondenSchema) => {
        await sleep()
        const result=await createRespon(data);
        console.log(result)
        if(!result){
            toast.error('Error create respon');
            return;
        }
        form.reset()
        toast.success('Respon created successfully');
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full max-w-xl mx-auto p-4 rounded-lg border-2 border-gray-200 shadow-xl my-6"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input placeholder="Nama" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <Select
                                onValueChange={(value) => field.onChange(Number(value))}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Rating" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {Array.from({ length: 5 }, (_, index) => index + 1).map(
                                        (rating) => (
                                            <SelectItem
                                                key={rating}
                                                value={String(rating)} // Convert to string for compatibility
                                            >
                                                {renderStar(rating)}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Response Field */}
                <FormField
                    control={form.control}
                    name="respon"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Kritik & Saran</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="min-h-[150px] resize-none"
                                    placeholder="Berikan kritik atau saran pada produk kami"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {form.formState.isSubmitting ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
};

export default FormResponden;
