'use client';
import { LoaderIcon, UserIcon, X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import ShowUser from './ShowUser';
import FormUser from './FormUser';
import { USER } from '@/schema/user-types';
import { deletUser, getUser } from '@/actions/user-action';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';

interface Props {
  email: string;
}

const User = ({ email }: Props) => {
  const [edit, setEdit] = React.useState(false);
  const [user, setUser] = React.useState<USER | null>(null);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchUser = async () => {
      const userLogin = await getUser(email);
      setUser(userLogin as USER);
    };
    fetchUser();
  }, [email,edit]);

  const handleDeleteUser = async () => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    
    setLoading(true);
    try {
      await deletUser(email);
      toast.success('Success delete user');
      signOut();
    } catch (e) {
      toast.error('Failed to delete user '+e);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={`${
          !user?.image
            ? 'bg-slate-100 p-2 rounded-full hover:bg-slate-200 transition-all duration-100'
            : ''
        }`}
        aria-label="Open user profile"
      >
        {user?.image ? (
          <Image
            src={user.image}
            alt={`${user.username}'s profile picture`}
            width={40}
            height={40}
            className="rounded-full size-9"
          />
        ) : (
          <UserIcon className="size-6" />
        )}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex gap-2 items-center justify-between font-semibold">
            <div className="flex gap-2 items-center">
              <div className="px-4 py-1.5 font-bold bg-gradient-to-tl from-cyan-400 to-green-500 text-white rounded-lg shadow-lg shadow-black/20">
                Compotae
              </div>
              <div>Account</div>
            </div>
            <AlertDialogCancel 
              onClick={() => setEdit(false)} 
              className="w-fit p-2.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-100 shadow-lg shadow-black/20"
            >
              <X className="size-6" aria-label="Close" />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Manage your account settings and preferences
          </AlertDialogDescription>
          <div className="text-sm text-muted-foreground transition-all duration-100">
            {user ? (
              edit ? (
                <FormUser
                  setEdit={setEdit}
                  username={user.username}
                  email={email}
                  image={user.image}
                />
              ) : (
                <ShowUser
                  image={user.image}
                  username={user.username}
                  email={email}
                />
              )
            ) : (
              <LoaderIcon className="size-16 animate-spin" />
            )}
          </div>
        </AlertDialogHeader>

        {!edit && (
          <AlertDialogFooter className="flex md:flex-row flex-col gap-2">
            <Button
              onClick={handleDeleteUser}
              className="bg-red-500 hover:bg-red-600 text-white transition-all duration-100"
              aria-label="Delete account"
            >
              {loading?
                <LoaderIcon className="size-6 animate-spin" />
                :
                'Delete account'
              }
            </Button>
            <Button onClick={() => setEdit(true)} aria-label="Edit account">
              Edit
            </Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default User;
