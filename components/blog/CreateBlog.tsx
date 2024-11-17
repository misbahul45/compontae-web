'use client';

import React, { useState, useEffect } from 'react';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/languages/id.js';
import { UploadDropzone } from '@/lib/uploadthing';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/actions/post-action';
import Editor from '@/components/blog/Editor';
import { LoaderIcon, Plus } from 'lucide-react';
import { sleep } from '@/lib/utils';
import { Button } from '../ui/button';

const CreateBlog = () => {
  const { data } = useSession();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (data?.user?.role !== 'ADMIN') {
      router.push('/');
    }
  }, [data, router]);

  const uploadPost = async () => {
    setLoading(true);
    sleep();
    try {
        const cleanDescription = description.replace(/<p data-f-id="pbf"[^>]*>.*<\/p>/gi, "");
        const isSucces = await createPost({ title, image, description: cleanDescription });
        if (!isSucces) {
          toast.error('Failed to create post');
          return;
        }
        toast.success('Post created successfully!');
        setDescription('');
        setTitle('');
        setImage('');
    } catch (error) {
        toast.error('Failed to create post'+error);
    }finally{
        setLoading(false);
        router.refresh();
    }
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  return (
    <section className="pt-20 pb-28 w-full max-w-5xl mx-auto space-y-8 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-4">
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
                  className="w-full px-4 py-2 text-sm text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors"
                >
                  Remove Image
                </button>
              </div>
            ) : (
              <UploadDropzone
                className="w-full"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImage(res[0].url);
                  toast.success('Image uploaded successfully!');
                }}
                onUploadError={(error: Error) => {
                  toast.error(error.message);
                }}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <div className="bg-muted rounded-lg overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                {image ? (
                  <Image
                    src={image}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">No image uploaded</p>
                  </div>
                )}
              </AspectRatio>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />
      <h3 className="text-lg font-semibold mb-4">Post Title</h3>
      <div className="w-full px-2">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
      </div>

      <Separator className="my-8" />

      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Content Editor</h3>
        <Editor content={description} setContent={setDescription} />
        <Button
          disabled={loading}
          onClick={uploadPost}
          className="px-6 py-2 flex items-center bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {loading ? (
            <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Plus className="w-4 h-4 mr-2" />
          )}
          {loading ? 'Creating...' : 'Create Post'}
        </Button>
      </div>
    </section>
  );
};

export default CreateBlog;
