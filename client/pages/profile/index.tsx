import { useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Loading from '@/components/artifacts/Loading';
import Toast from '@/components/artifacts/Toast';
import Layout from '@/components/Layout';
import { LayoutContext } from '@/context/LayoutContext';
import { useMutate } from '@/hooks/useMutate';
import type { NextPageWithLayout } from '@/ts/types/NextPageWithLayout';
import type { UpdateUserFormValues } from '@/ts/types/schema/UserSchema';
import { updateUserSchema } from '@/utils/schema/userSchema';
import { UserContext } from '@/context/UserContext';

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { userData } = useContext(UserContext);
  const { toast, setToast } = useContext(LayoutContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateUserFormValues>({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      fullname: userData.fullname,
      oldPassword: '',
      newPassword: '',
    },
  });

  const updateUser = useMutate({
    url: `/user`,
    method: 'PATCH',
    mutationKey: 'updateUser',
    reqBody: {
      fullname: watch('fullname'),
      oldPassword: watch('oldPassword'),
      newPassword: watch('newPassword'),
    },
  });

  const handleUpdateUser = async () => {
    updateUser.mutate();
  };

  useEffect(() => {
    if (updateUser.status === 'success') {
      if (updateUser.data?.status === 200) {
        setToast({
          type: 'success',
          message: 'User Data Updated',
          isShown: true,
        });

        setTimeout(() => {
          setToast({
            type: '',
            message: updateUser.data?.data?.message,
            isShown: false,
          });

          router.reload();
        }, 2000);
      }
    } else if (updateUser.status === 'error') {
      setToast({
        type: 'error',
        message:
          (updateUser.error as AxiosError<{ message: string }>).response?.data
            ?.message ?? '',
        isShown: true,
      });

      setTimeout(() => {
        setToast({
          type: '',
          message: '',
          isShown: false,
        });
      }, 2000);
    }
  }, [updateUser.status]);

  useEffect(() => {
    if (userData) {
      setValue('fullname', userData.fullname);
    }
  }, [userData]);

  return (
    <>
      <Head>
        <title>Qubic | Profile - {userData.fullname}</title>
      </Head>

      {toast.isShown && <Toast type={toast.type} message={toast.message} />}

      <section className="w-full max-w-lg my-5">
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="email"
              className="tracking-wide font-medium text-blue-900"
            >
              Email
            </label>

            <div
              id="email"
              placeholder="Email"
              className="py-2 px-3 rounded-md text-gray-600 border border-gray-300 bg-gray-200"
            >
              {userData.email}
            </div>
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="name"
              className="tracking-wide font-medium text-blue-900"
            >
              Name
            </label>

            <input
              {...register('fullname')}
              id="fullname"
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.fullname && (
              <p className="mt-1 text-xs text-red-600">
                {errors.fullname.message}
              </p>
            )}
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="oldPassword"
              className="tracking-wide font-medium text-blue-900"
            >
              Old Password
            </label>

            <input
              {...register('oldPassword')}
              id="oldPassword"
              type="password"
              name="oldPassword"
              placeholder="Old Password"
              autoComplete="off"
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.oldPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.oldPassword.message}
              </p>
            )}
          </article>

          <article className="flex flex-col space-y-1 mb-6">
            <label
              htmlFor="newPassword"
              className="tracking-wide font-medium text-blue-900"
            >
              New Password
            </label>

            <input
              {...register('newPassword')}
              id="newPassword"
              type="password"
              name="newPassword"
              placeholder="New Password"
              autoComplete="off"
              className="w-full py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600 resize-none"
            />

            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-600">
                {errors.newPassword.message}
              </p>
            )}
          </article>

          <section className="flex justify-end">
            <button
              type="submit"
              disabled={
                !watch('fullname') ||
                !watch('oldPassword') ||
                !watch('newPassword')
              }
              className="bg-blue-600 p-2 w-40 rounded-md focus:outline-none hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed font-semibold text-white tracking-wide transition-all duration-75 ease-in-out"
            >
              {updateUser.isLoading ? (
                <span className="flex w-full justify-center text-white">
                  <Loading size={6} isButton />
                </span>
              ) : (
                'Update'
              )}
            </button>
          </section>
        </form>
      </section>
    </>
  );
};

Profile.getLayout = (page) => <Layout>{page}</Layout>;

export default Profile;
