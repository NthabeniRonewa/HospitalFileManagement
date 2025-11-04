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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'; // ✅ Fixed import
import { Loader2 } from 'lucide-react';

// Validation schema
const formSchema = z
    .object({
        fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
        email: z.string().email({ message: 'Please enter a valid email address' }),
        role: z.enum(['admin', 'doctor'], { message: 'Please select a role' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type FormValues = z.infer<typeof formSchema>;

const Register = () => {
    const { register: authRegister, isLoading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: '',
            email: '',
            role: 'admin',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: FormValues) => {
        setError(null);
        try {
            await authRegister(data.fullName, data.email, data.password, data.role);
            navigate('/verify-otp', { state: { email: data.email } });
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div>
            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Create Account</h1>
                <p className="text-gray-500">Set up your account</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md mb-6 text-sm">
                        {error}
                    </div>
                )}

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your full name"
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
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="medifile-input">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="doctor">Doctor</SelectItem>
                                        </SelectContent>
                                    </Select>
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
                                            placeholder="Create a password"
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
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Confirm your password"
                                            {...field}
                                            disabled={isLoading}
                                            className="medifile-input"
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
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </Button>
                    </form>
                </Form>

                <div className="mt-6 text-center text-sm">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-medical-primary font-medium hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
