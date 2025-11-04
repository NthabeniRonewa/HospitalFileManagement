import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import doctorImage from '@/components/ui/doctor.jpg';
import xrayImage from '@/components/ui/xray1.jpg';

const DoctorPatientInteraction = () => {
  const [patientID, setPatientID] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [editSection, setEditSection] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const mockDatabase = [
    {
      patientID: '001',
      info: { fullName: 'John Mokoena', gender: 'Male', idNo: '9501011234083' },
      medicalHistory: [
        {
          conditionName: 'Asthma',
          description: 'Chronic breathing issue',
          dateDiagnosed: '2020-03-14',
          dateTreated: '2020-04-01',
          nextFollowUp: '2025-06-01'
        }
      ],
      medicalConditions: [
        {
          conditionName: 'Flu',
          severity: 'Mild',
          treatmentPlan: 'Rest and fluids',
          fileName: 'April_Checkup.pdf'
        }
      ],
      surgicalHistory: [
        {
          procedureName: 'Appendectomy',
          surgeonName: 'Dr. Mabaso',
          datePerformed: '2019-12-10',
          outcome: 'Successful'
        }
      ],
      xrayPictures: [
        {
          imageData: xrayImage,
          description: 'Skull X-ray'
        }
      ],
      medications: [
        {
          name: 'Paracetamol',
          dosage: '500mg',
          frequency: 'Twice daily'
        }
      ]
    }
  ];

  const handleSearch = () => {
    const trimmedID = patientID.trim();
    const result = mockDatabase.find((p) => p.patientID === trimmedID);
    if (result) {
      setPatientData(result);
      setError('');
    } else {
      setPatientData(null);
      setError('No patient found with that ID');
    }
  };

  const handleEdit = (section) => {
    setEditSection(section);
    setShowForm(true);
    setIsEditing(true);
    setPreviewImage(null);

    if (section === 'info') setFormData({ ...patientData.info });
    else if (section === 'medical') setFormData({ ...patientData.medicalHistory[0] });
    else if (section === 'condition') setFormData({ ...patientData.medicalConditions[0] });
    else if (section === 'surgical') setFormData({ ...patientData.surgicalHistory[0] });
    else if (section === 'xray') {
      setFormData({ ...patientData.xrayPictures[0] });
      if (patientData.xrayPictures[0]?.imageData) {
        setPreviewImage(patientData.xrayPictures[0].imageData);
      }
    }
    else if (section === 'medication') setFormData({ ...patientData.medications[0] });
  };

  const handleAdd = (section) => {
    setEditSection(section);
    setShowForm(true);
    setIsEditing(false);
    setPreviewImage(null);

    const emptyForms = {
      info: { fullName: '', gender: '', idNo: '' },
      medical: { conditionName: '', description: '', dateDiagnosed: '', dateTreated: '', nextFollowUp: '' },
      condition: { conditionName: '', severity: '', treatmentPlan: '', fileName: '' },
      surgical: { procedureName: '', surgeonName: '', datePerformed: '', outcome: '' },
      xray: { imageData: '', description: '' },
      medication: { name: '', dosage: '', frequency: '' }
    };

    setFormData(emptyForms[section] || {});
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, imageData: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleAddOrUpdate = () => {
    if (!patientData) return;
    const updatedPatient = { ...patientData };

    if (isEditing) {
      if (editSection === 'info') updatedPatient.info = formData;
      else if (editSection === 'medical') updatedPatient.medicalHistory[0] = formData;
      else if (editSection === 'condition') updatedPatient.medicalConditions[0] = formData;
      else if (editSection === 'surgical') updatedPatient.surgicalHistory[0] = formData;
      else if (editSection === 'xray') updatedPatient.xrayPictures[0] = formData;
      else if (editSection === 'medication') updatedPatient.medications[0] = formData;
    } else {
      if (editSection === 'medical') updatedPatient.medicalHistory.push(formData);
      else if (editSection === 'condition') updatedPatient.medicalConditions.push(formData);
      else if (editSection === 'surgical') updatedPatient.surgicalHistory.push(formData);
      else if (editSection === 'xray') updatedPatient.xrayPictures.push(formData);
      else if (editSection === 'medication') updatedPatient.medications.push(formData);
    }

    setPatientData(updatedPatient);
    setShowForm(false);
    setIsEditing(false);
    setFormData({});
    setEditSection(null);
    setPreviewImage(null);
  };

  const renderForm = () => {
    const sectionTitles = {
      info: 'Patient Information',
      medical: 'Medical History',
      condition: 'Medical Condition',
      surgical: 'Surgical History',
      xray: 'X-ray Image',
      medication: 'Medication'
    };

    return (
        <div className="mt-6 p-4 border border-blue-300 rounded-lg bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">
            {isEditing ? 'Edit' : 'Add New'} {sectionTitles[editSection]}
          </h3>

          <div className="space-y-4">
            {editSection === 'xray' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">X-ray Image</label>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                  />
                  <Button onClick={triggerFileInput} variant="outline" className="w-full mb-2">
                    Choose Image
                  </Button>
                  {previewImage && (
                      <img
                          src={previewImage}
                          alt="Preview"
                          className="max-w-full h-auto max-h-60 rounded border border-gray-300"
                      />
                  )}
                </div>
            )}

            {Object.keys(formData).map((key) =>
                key !== 'imageData' ? (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </label>
                      <Input
                          name={key}
                          value={formData[key] || ''}
                          onChange={handleInputChange}
                          placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
                      />
                    </div>
                ) : null
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={() => { setShowForm(false); setPreviewImage(null); }} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleAddOrUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </div>
        </div>
    );
  };

  const renderSection = (title, sectionKey, items, editable = true) => (
      <div className="flex justify-center">
        <div className="bg-white border border-blue-300 p-5 rounded-md shadow-sm w-full max-w-3xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-blue-600">{title}</h2>
            <div className="flex gap-2">
              {editable && items.length > 0 && sectionKey !== 'medical' && sectionKey !== 'surgical' && (
                  <Button
                      onClick={() => handleEdit(sectionKey)}
                      size="sm"
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                  >
                    Edit
                  </Button>
              )}
              <Button
                  onClick={() => handleAdd(sectionKey)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Add
              </Button>
            </div>
          </div>

          {items.length === 0 ? (
              <p className="text-gray-500 italic">No records found</p>
          ) : (
              <>
                {sectionKey === 'xray' && (
                    <div className="mb-4">
                      <Button
                          onClick={() => navigate('/xray-images', { state: { xrayPictures: items } })}
                          className="bg-indigo-600 text-white hover:bg-indigo-700"
                      >
                        View Diagnostic Images
                      </Button>
                    </div>
                )}
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(items[0]).map((key) =>
                        key !== 'imageData' ? (
                            <th key={key} className="border border-gray-300 px-4 py-2 text-left text-gray-700">
                              {key.replace(/([A-Z])/g, ' $1')}
                            </th>
                        ) : null
                    )}
                  </tr>
                  </thead>
                  <tbody>
                  {items.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {Object.entries(item).map(([key, value]) =>
                            key !== 'imageData' ? (
                                <td key={key} className="border border-gray-300 px-4 py-2 text-gray-600">
                                  {String(value)}
                                </td>
                            ) : null
                        )}
                      </tr>
                  ))}
                  </tbody>
                </table>
              </>
          )}
        </div>
      </div>
  );

  return (
      <div className="min-h-screen bg-cover bg-center py-10 px-4" style={{ backgroundImage: `url(${doctorImage})`, opacity: 0.95 }}>
        <Card className="max-w-4xl mx-auto shadow-lg border border-blue-300 bg-white bg-opacity-90">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-blue-600">Patient Medical File Viewer</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 overflow-y-auto max-h-[80vh]">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Input
                  placeholder="Enter Patient ID"
                  value={patientID}
                  onChange={(e) => setPatientID(e.target.value)}
                  className="w-full sm:w-2/3"
              />
              <Button
                  onClick={handleSearch}
                  className="w-full sm:w-auto bg-black text-white hover:bg-gray-800"
              >
                Search
              </Button>
            </div>

            {error && <p className="text-red-600 font-semibold text-center">{error}</p>}

            {patientData && (
                <div className="space-y-6 mt-6">
                  {renderSection('🧍 Patient Information', 'info', [patientData.info], false)}
                  {renderSection('📋 Medical History', 'medical', patientData.medicalHistory)}
                  {renderSection('💊 Medical Conditions', 'condition', patientData.medicalConditions)}
                  {renderSection('🏥 Surgical History', 'surgical', patientData.surgicalHistory)}
                  {renderSection('🩻 Diagnostic Images', 'xray', patientData.xrayPictures)}
                  {renderSection('💉 Medication Given', 'medication', patientData.medications)}

                  {showForm && renderForm()}
                </div>
            )}
          </CardContent>
        </Card>
      </div>
  );
};

export default DoctorPatientInteraction;
