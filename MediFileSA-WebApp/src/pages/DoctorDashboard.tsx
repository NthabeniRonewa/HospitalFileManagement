import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Calendar, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DoctorDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">Doctor Dashboard</h1>
            <p className="text-gray-500 mb-6">Welcome back, Dr. {user?.fullName}!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Total Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-medical-primary mr-3" />
                            <div>
                                <div className="text-2xl font-bold">150</div>
                                <p className="text-xs text-gray-500">Total patients</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Patient Files Updated</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-medical-secondary mr-3" />
                            <div>
                                <div className="text-2xl font-bold">42</div>
                                <p className="text-xs text-gray-500">Files updated today</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center">
                            <Calendar className="h-8 w-8 text-medical-secondary mr-3" />
                            <div>
                                <div className="text-2xl font-bold">12</div>
                                <p className="text-xs text-gray-500">Activities logged today</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Patient Files</CardTitle>
                        <CardDescription>Latest patient updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex items-start">
                                    <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3 shrink-0">
                                        <FileText size={16} className="text-medical-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Patient file updated</p>
                                        <p className="text-xs text-gray-500">Dr. Sarah Johnson updated Patient #{1002 + i} records</p>
                                        <p className="text-xs text-gray-400">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Patient List</CardTitle>
                        <CardDescription>Quick access to patient files</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between py-2 border-b">
                                    <div className="flex items-center">
                                        <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3">
                                            <FileText size={16} className="text-medical-primary" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Patient #{1002 + i}</p>
                                            <p className="text-xs text-gray-500">Updated 2 hours ago</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DoctorDashboard;
