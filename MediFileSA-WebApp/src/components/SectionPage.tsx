import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const SectionPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { data, title } = state || {};

  return (
    <div className="py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">{title || 'Section Data'}</h1>
      <p className="text-gray-500 mb-6">Details for the selected section</p>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-medium flex items-center">
            <FileText className="h-5 w-5 text-medical-primary mr-2" />
            {title || 'Section Data'}
          </CardTitle>
          <CardDescription>View the records below</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {data && data.length === 0 ? (
            <p className="text-gray-500 italic text-sm text-center">No records found</p>
          ) : (
            <div className="space-y-4">
              {data && data.map((item, index) => (
                <div key={index} className="border-b border-gray-200 py-2">
                  {Object.entries(item).map(([key, value]) =>
                    key !== 'imageData' ? (
                      <div key={key} className="flex justify-between py-1">
                        <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                        <p className="text-sm font-medium text-gray-800">{String(value)}</p>
                      </div>
                    ) : null
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <Button
              onClick={() => navigate(-1)}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SectionPage;