import React from 'react';
import { Form, FormControl, FormField, FormItem } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentSchema } from '@/schema/comment-schema';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { LoaderIcon, SendHorizontal } from 'lucide-react';
import { sleep } from '@/lib/utils';
import { createComment } from '@/actions/comment-action';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Props {
  postId: string;
  userId: string;
  replayId: string;
  setReplayId: React.Dispatch<React.SetStateAction<string>>;
  setSendMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormComment = ({ postId, userId, replayId, setReplayId, setSendMessage }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const form = useForm({
    resolver: zodResolver(CommentSchema.createCommentSchema),
    mode: 'onChange',
    defaultValues: {
      body: '',
    },
  });

  React.useEffect(() => {
    if (replayId && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [replayId]);

  const onSubmit = async (data: z.infer<typeof CommentSchema.createCommentSchema>) => {
    if (!userId) {
      toast.error('Please login first');
      router.push('/login');
      return;
    }
    try {
      setSendMessage(false);
      setLoading(true);
      await sleep();
      await createComment({ body: data.body, postId, userId, parentId: replayId });
      toast.success('Comment submitted successfully');
      setReplayId('');
      setSendMessage(true);
      form.reset();
    } catch (error) {
      toast.error(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full shadow-md shadow-slate-500/20 p-3 rounded-xl border-2 border-gray-300"
      >
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Create a comment"
                  className="resize-none"
                  {...field}
                  ref={textareaRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          className="flex justify-center items-center gap-2 ml-auto"
        >
          {loading ? (
            <LoaderIcon className="size-6 animate-spin" />
          ) : (
            <>
              <p>Kirim</p>
              <SendHorizontal className="size-6" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default FormComment;
