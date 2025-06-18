'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export default function SocialLogin() {
  const router = useRouter();

  const handleSocialLogin = async (providerName) => {
    try {
      const response = await signIn(providerName, { redirect: false });
      console.log('social login response--->', response);

      if (response?.ok) {
        toast.success(`Logged in successfully with ${providerName}`);
        router.push('/');
      } else {
        toast.error(`Failed to login with ${providerName}`);
      }
    } catch (error) {
      console.log('social login error', error);
      toast.error('Something went wrong. Please try again!');
    }
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      {/* GitHub */}
      <button
        onClick={() => handleSocialLogin('github')}
        className="btn bg-black text-white border-black"
      >
        {/* GitHub SVG */}
        Login with GitHub
      </button>

      {/* Google */}
      <button
        onClick={() => handleSocialLogin('google')}
        className="btn bg-white text-black border-[#e5e5e5]"
      >
        {/* Google SVG */}
        Login with Google
      </button>
    </div>
  );
}
