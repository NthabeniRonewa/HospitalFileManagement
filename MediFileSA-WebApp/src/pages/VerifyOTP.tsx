
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  otp: z.string().min(6, { message: 'OTP must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const VerifyOTP = () => {
  const { verifyOtp, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  
  // Get email from location state
  const email = location.state?.email || '';

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      await verifyOtp(email, data.otp);
      navigate('/dashboard');
    } catch (err) {
      setError('An error occurred during verification. Please try again.');
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Verify Your Account</h1>
        <p className="text-gray-500">
          We have sent a verification code to your email address.
          <br />
          Please enter the code below to verify your account.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
            {error}
          </div>
        )}

        

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter the 6-digit code" 
                      {...field} 
                      disabled={isLoading}
                      className="medifile-input text-center text-lg tracking-widest" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full medifile-btn-primary" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Account'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Didn't receive a code?{' '}
            <button className="text-medical-primary font-medium hover:underline">
              Resend code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
