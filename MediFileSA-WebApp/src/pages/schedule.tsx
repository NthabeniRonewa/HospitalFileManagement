import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardList, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for appointments
const mockAppointments = [
    {
        id: '1',
        patientName: 'John Doe',
        date: '2025-05-15',
        time: '10:00 AM',
        condition: 'Diabetes',
        status: 'Scheduled',
    },
    {
        id: '2',
        patientName: 'Jane Smith',
        date: '2025-05-16',
        time: '2:00 PM',
        condition: 'Hypertension',
        status: 'Completed',
    },
    {
        id: '3',
        patientName: 'Mark Johnson',
        date: '2025-05-17',
        time: '9:30 AM',
        condition: 'Asthma',
        status: 'Scheduled',
    },
];

const Schedule = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Filter appointments based on search term
    const filteredAppointments = searchTerm
        ? mockAppointments.filter((appointment) =>
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : mockAppointments;


    const viewAppointmentDetails = (appointmentId: string) => {
        navigate(`/schedule/${appointmentId}`);
    };


    const handleAddAppointment = () => {
        navigate('/schedule/add');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Schedule</h1>


            <div className="mb-6 flex items-center gap-2">
                <Input
                    type="text"
                    placeholder="Search by patient name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-96"
                />
                <Button variant="outline" className="flex gap-2 items-center">
                    <Search size={16} />
                    Search
                </Button>
            </div>
            <Button
                onClick={handleAddAppointment}
                className="mb-6 flex items-center gap-2 bg-blue-600 text-white"
            >
                Add New Appointment
            </Button>


            {filteredAppointments.length === 0 ? (
                <p className="text-gray-500">No appointments found</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredAppointments.map((appointment) => (
                        <Card
                            key={appointment.id}
                            className="border border-gray-200 shadow-sm"
                            onClick={() => viewAppointmentDetails(appointment.id)}
                        >
                            <CardContent className="p-4 space-y-2 cursor-pointer">
                                <div className="flex items-center gap-2 text-medical-primary font-semibold">
                                    <ClipboardList size={16} />
                                    <span>{appointment.patientName}</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Date:</strong> {appointment.date}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Time:</strong> {appointment.time}
                                </div>
                                <div className="text-sm text-gray-600">
                                    <strong>Condition:</strong> {appointment.condition}
                                </div>
                                <div className="text-sm text-gray-500">
                                    <strong>Status:</strong> {appointment.status}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Schedule;
