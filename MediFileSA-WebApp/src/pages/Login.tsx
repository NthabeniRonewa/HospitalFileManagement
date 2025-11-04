import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login, isLoading, user } = useAuth(); // Add user here to check the role
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      await login(data.email, data.password);

      // Redirect based on the user role after successful login
      if (user) {
        if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (user.role === 'doctor') {
          navigate('/doctor-dashboard');
        } else {
          navigate('/dashboard'); // For other roles, navigate to a generic dashboard
        }
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
      <div>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Sign in to Medifile</h1>
          <p className="text-gray-500">Enter your credentials to access your account</p>
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
                  name="email"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                              placeholder="Enter your email"
                              {...field}
                              disabled={isLoading}
                              className="medifile-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                              type="password"
                              placeholder="Enter your password"
                              {...field}
                              disabled={isLoading}
                              className="medifile-input"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-medical-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                  type="submit"
                  className="w-full medifile-btn-primary"
                  disabled={isLoading}
              >
                {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                ) : (
                    'Sign in'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-medical-primary font-medium hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            For demo purposes, use: admin@example.com / password
          </p>
        </div>
      </div>
  );
};

export default Login;
