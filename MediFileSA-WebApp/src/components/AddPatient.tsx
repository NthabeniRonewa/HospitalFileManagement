import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  surname: z.string().min(1, 'Surname is required'),
  idNo: z.string().min(1, 'ID number is required'),
  gender: z.enum(['Male', 'Female'], {
    required_error: 'Gender is required',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddPatient = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      surname: '',
      idNo: '',
      gender: undefined,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Patient added successfully',
      description: `${data.firstName} ${data.surname} has been registered.`,
    });

    setIsSubmitting(false);
    navigate('/patients');
  };

  return (
      <div className="max-w-2xl mx-auto mt-10">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-medical-accent flex items-center justify-center">
              <Plus size={20} className="text-medical-primary" />
            </div>
            <div>
              <CardTitle>Add New Patient</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter first name" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="middleName"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter middle name" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="surname"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>Surname</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter surname" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="idNo"
                      render={({ field }) => (
                          <FormItem>
                            <FormLabel>ID Number</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter ID number" {...field} disabled={isSubmitting} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                      )}
                  />
                </div>

                <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-3">
                  <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/patients')}
                      disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="medifile-btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                    ) : (
                        'Add Patient'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
  );
};

export default AddPatient;
