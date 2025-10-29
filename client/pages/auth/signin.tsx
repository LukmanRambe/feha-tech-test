import { useContext, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { AiFillLock, AiFillUnlock, AiOutlineWarning } from 'react-icons/ai';

import Loading from '@/components/artifacts/Loading';
import Toast from '@/components/artifacts/Toast';
import AuthProvider, { LayoutContext } from '@/context/LayoutContext';
import type { NextPageWithLayout } from '@/ts/types/NextPageWithLayout';
import type { LoginFormValues } from '@/ts/types/schema/AuthSchema';
import { loginSchema } from '@/utils/schema/authSchema';

const Login: NextPageWithLayout = () => {
  const { login, isLoading, errorMessage, setLoginFormValues, toast } =
    useContext(LayoutContext);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const handleLogin = () => {
    login();
  };

  useEffect(() => {
    setLoginFormValues({
      username: watch('username'),
      password: watch('password'),
    });
  }, [watch('username'), watch('password')]);

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>

      {toast.isShown && <Toast type={toast.type} message={toast.message} />}

      <section className="px-4 w-full flex justify-center items-center min-h-screen">
        <article className="flex flex-col max-w-sm w-full">
          <h1 className="text-center text-3xl font-bold mb-6 text-blue-600">
            Sign In
          </h1>

          <form onSubmit={handleSubmit(handleLogin)}>
            <article className="flex flex-col space-y-1 mb-6">
              <label
                htmlFor="username"
                className="tracking-wide font-medium text-blue-900"
              >
                Username
              </label>

              <input
                {...register('username')}
                id="username"
                type="text"
                name="username"
                placeholder="Username"
                className="py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600"
                onChange={(event) =>
                  setValue('username', event.target.value.toLowerCase())
                }
              />

              {errors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </article>

            <article
              className={`flex flex-col space-y-1 ${
                errorMessage ? 'mb-7' : 'mb-16'
              }`}
            >
              <label
                htmlFor="password"
                className="tracking-wide font-medium text-blue-900"
              >
                Password
              </label>

              <input
                {...register('password')}
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="off"
                className="py-2 px-3 rounded-md focus:outline-none text-black border border-gray-400 active:border-blue-600 focus:border-blue-600"
              />

              {errors.password && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </article>

            <article className="flex flex-col">
              {errorMessage && (
                <article className="flex items-center justify-center py-2 text-sm text-red-800 transition bg-red-100 rounded-md capitalize">
                  <span>
                    <AiOutlineWarning className="w-5 h-5 mr-2 text-red-500" />
                  </span>
                  <p className="font-semibold">{errorMessage}</p>
                </article>
              )}

              <button
                type="submit"
                disabled={watch('username') === '' || watch('password') === ''}
                className="relative bg-blue-600 p-3 w-full rounded-md focus:outline-none hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed mt-3 font-semibold text-white tracking-wide"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {watch('username') === '' || watch('password') === '' ? (
                    <AiFillLock className="w-5 h-5" />
                  ) : (
                    <AiFillUnlock className="w-5 h-5" />
                  )}
                </span>
                {isLoading ? (
                  <span className="flex w-full justify-center text-white">
                    <Loading size={6} isButton />
                  </span>
                ) : (
                  'Login'
                )}
              </button>

              <span className="text-end mt-1 text-sm text-black">
                Don&apos;t have an account?
                <Link
                  href="/auth/sign-up"
                  className="text-blue-400 hover:text-blue-500 active:text-blue-600"
                >
                  {' '}
                  Sign Up
                </Link>
              </span>
            </article>
          </form>
        </article>
      </section>
    </>
  );
};

Login.getLayout = (page) => <AuthProvider>{page}</AuthProvider>;

export default Login;
