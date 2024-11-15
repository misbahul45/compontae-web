'use client';
import React from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { LoaderIcon, SendHorizonal } from 'lucide-react';
import { Button } from '../ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { requestToAI } from '@/actions/ai-action';
import { useChatContext } from './ChatProvider';

const FormChatSchema = z.object({
  message: z.string().min(3),
});

const listQuestion=['Kegunaan Kompos bagi tumbuhan','Mengapa kompos Penting bagi ekosistem tanah','Menjaga kesehatan tanaman']

const FormChat = () => {
  const { addChat, loading, setLoading } = useChatContext();
  const form = useForm({
    resolver: zodResolver(FormChatSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormChatSchema>) => {
    setLoading(true);
    try {
      const res = await requestToAI(data.message);
      addChat(data.message, res as string);
      form.reset();
    } catch (error) {
      console.error("Error during chat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex flex-wrap'>
            {listQuestion.map((item, index) => (
                <button key={index} className="mr-2 mb-2 rounded bg-cyan-600 px-3 py-1 text-sm text-white hover:bg-cyan-500" onClick={() => form.setValue('message', item)}>{item}</button>
            ))}
        </div>
        <div className='flex items-center gap-2'>
            <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormControl>
                        <Input
                        placeholder="Message"
                        className="flex-1"
                        {...field}
                        disabled={loading}
                        />
                    </FormControl>
                    </FormItem>
                )}
            />
            <Button
                type="submit"
                disabled={form.formState.isSubmitting || form.getValues('message') === '' || loading}
                >
                {loading ? (
                    <LoaderIcon className="animate-spin size-6" />
                ) : (
                    <SendHorizonal className="size-7" />
                )}
            </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormChat;
