'use client';

import { RespondenSchema, respondenSchema } from '@/schema/responden-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
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
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import { UploadDropzone } from '@/lib/uploadthing';
import { z } from 'zod';

const renderStar = (rating: number) => {
    return Array.from({ length: rating }, (_, index) => (
        <span key={index} className="text-yellow-400">
            ⭐
        </span>
    ));
};

const FormResponden = () => {
    const [image, setImage] = useState<string>('');

    const handleRemoveImage = () => {
        setImage('');
    };

    const form = useForm({
        resolver: zodResolver(respondenSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            respon: '',
            rating: 0,
        },
    });

    const onSubmit = async (data: z.infer<typeof respondenSchema>) => {
        if(!image){
            toast.error('Please upload an image first');
            return;
        }
        try {
            await sleep();
            const result = await createRespon({
                ...data,
                image,
            });

            if (!result) {
                throw new Error('Failed to create respon');
            }

            form.reset(); // Reset form after successful submission
            setImage(''); // Clear the uploaded image
            toast.success('Respon created successfully');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Error creating respon');
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full max-w-xl mx-auto p-4 rounded-lg border-2 border-gray-200 shadow-xl my-6"
            >
                <h3 className="text-lg font-semibold mb-4">Original Cover</h3>
                {image ? (
                    <div className="space-y-4">
                        <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                            <Image
                                src={image}
                                alt="Original cover"
                                fill
                                className="object-cover"
                            />
                        </AspectRatio>
                        <button
                            onClick={handleRemoveImage}
                            type="button"
                            className="w-full px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                        >
                            Remove Image
                        </button>
                    </div>
                ) : (
                    <UploadDropzone
                        className="w-full"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res:{url:string}[]) => {
                            setImage(res[0].url);
                            toast.success('Image uploaded successfully!');
                        }}
                        onUploadError={(error: Error) => {
                            toast.error(error.message);
                        }}
                    />
                )}

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
                                            <SelectItem key={rating} value={String(rating)}>
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
                    className={`px-4 py-2 rounded ${
                        form.formState.isSubmitting
                            ? 'bg-gray-400'
                            : 'bg-blue-500 hover:bg-blue-600'
                    } text-white`}
                >
                    {form.formState.isSubmitting ? 'Loading...' : 'Submit'}
                </Button>
            </form>
        </Form>
    );
};

export default FormResponden;
