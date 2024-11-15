'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import 'react-phone-number-input/style.css';

import { Form } from '@kit/ui/form';
import { SelectItem } from '@kit/ui/select';
import { Stepper } from '@kit/ui/stepper';
import { cn } from '@kit/ui/utils'

import {
  type PatientRegistrationForm,
  Sex,
  patientFormSchema,
} from '~/lib/validations/patientRegisteration';

import CustomFormField from './CustomFormField';
import { FormFieldType } from './FormTypes';
import { treatments } from './testData';

const FORM_STEPS = [
  'Contact Info',
  'Personal & Travel',
  'Treatments',
  'Consultation',
];

const IndividualRegistrationForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const onSubmit = async (data: PatientRegistrationForm) => {
    try {
      setIsLoading(true);
      // TODO: Implement your submission logic here
      console.log(data);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep = async (stepIndex: number) => {
    let isValid = true;

    switch (stepIndex) {
      case 0: // Contact Info
        isValid = await form.trigger([
          'firstName',
          'lastName',
          'email',
          'phone',
        ]);
        break;
      case 1: // Personal & Travel
        isValid = await form.trigger([
          'sex',
          'dob',
          'travelDetails.destination',
          'travelDetails.departureDate',
          'travelDetails.arrivalDate',
        ]);
        break;
      case 2: // Treatments
        isValid = await form.trigger(['selectedTreatments']);
        break;
      case 3: // Consultation
        if (form.getValues('consultationDetails.isRequested')) {
          isValid = await form.trigger([
            'consultationDetails.preferredTime',
            'consultationDetails.specialRequirements',
          ]);
        }
        break;
    }
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid) {
      setCurrentStep((prev) => Math.min(FORM_STEPS.length - 1, prev + 1));
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4 bg-white rounded-xl pt-6 pb-4 px-4">
            <div className="flex w-full items-center justify-center gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                iconSrc="/images/icons/user.svg"
                iconAlt="user"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                iconSrc="/images/icons/user.svg"
                iconAlt="user"
              />
            </div>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              label="Email Address"
              placeholder="johndoe@email.com"
              iconSrc="/images/icons/email.svg"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone"
              iconSrc="/images/icons/phone.svg"
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4 bg-white rounded-xl pt-6 pb-4 px-4">
            <div className="flex w-full items-center justify-center gap-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="sex"
                label="Sex"
              >
                {Object.values(Sex).map((sex) => (
                  <SelectItem key={sex} value={sex}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <p>{sex}</p>
                    </div>
                  </SelectItem>
                ))}
              </CustomFormField>
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="dob"
                label="Date of Birth"
                iconSrc="/images/icons/calendar.svg"
                iconAlt="calendar"
              />
            </div>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="travelDetails.destination"
              label="Destination"
              placeholder="Guadalajara, Mexico"
            />
            <div className="flex w-full items-center justify-center gap-4">
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="travelDetails.departureDate"
                label="Departure Date"
              />
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="travelDetails.arrivalDate"
                label="Arrival Date"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 bg-white rounded-xl pt-6 pb-4 px-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Recommended Treatments</h3>
              <p className="text-sm text-gray-500">
                Based on your destination, these medications would help.
              </p>
              <p className="text-sm text-gray-500">
                Select the treatments you'd like to include in your plan.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {treatments.map((treatment) => (
                <div
                  key={treatment.id}
                  onClick={() => {
                    const currentTreatments =
                      form.getValues('selectedTreatments');
                    const isSelected = currentTreatments.some(
                      (t) => t.id === treatment.id,
                    );

                    if (isSelected) {
                      form.setValue(
                        'selectedTreatments',
                        currentTreatments.filter((t) => t.id !== treatment.id),
                      );
                    } else {
                      form.setValue('selectedTreatments', [
                        ...currentTreatments,
                        treatment,
                      ]);
                    }
                  }}
                  className="relative flex cursor-pointer items-start space-x-3 rounded-lg border p-4 hover:bg-gray-50"
                >
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      checked={form
                        .watch('selectedTreatments')
                        .some((t) => t.id === treatment.id)}
                      onChange={() => {}} // Using div onClick instead
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {treatment.name}
                    </div>
                    <p className="text-sm text-gray-500">
                      {treatment.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        ${treatment.price}
                      </span>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {treatment.duration}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 bg-white rounded-xl pt-6 pb-4 px-4">
            <div className="space-y-4 bg-white rounded-lg">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Virtual Consultation</h3>
                <p className="text-sm text-gray-500">
                  Would you like to add a virtual consultation with one of our
                  healthcare providers?
                </p>
              </div>

              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="consultationDetails.isRequested"
                label="Yes, I would like to schedule a virtual consultation"
              />

              {form.watch('consultationDetails.isRequested') && (
                <div className="space-y-4 pl-6">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="consultationDetails.preferredTime"
                    label="Preferred Time"
                    placeholder="e.g., Morning, Afternoon, Evening"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="consultationDetails.specialRequirements"
                    label="Special Requirements"
                    placeholder="Any specific requirements or questions for your consultation"
                  />
                </div>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const form = useForm<PatientRegistrationForm>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dob: new Date(),
      sex: Sex.Male,
      travelDetails: {
        destination: '',
        departureDate: new Date(),
        arrivalDate: new Date(),
        accommodation: '',
      },
      selectedTreatments: [],
      treatmentSelections: treatments.reduce(
        (acc, treatment) => {
          acc[treatment.id] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
      consultationDetails: {
        isRequested: false,
        preferredTime: '',
        specialRequirements: '',
      },
    },
  });

  return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-lg border bg-secondary p-8 shadow-lg">
          <div className="space-y-8">
            <div className="rounded-lg bg-gray-50 p-4">
              <Stepper
                  steps={FORM_STEPS}
                  currentStep={currentStep}
                  variant="numbers"
              />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderFormStep()}

                <div className="mt-6 flex justify-between">
                  <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                      disabled={currentStep === 0 || isLoading}
                      className="rounded-md border border-gray-300 bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {currentStep < FORM_STEPS.length - 1 ? (
                      <button
                          type="button"
                          onClick={handleNext}
                          disabled={isLoading}
                          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-secondary hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                      <span className="animate-spin">⌛</span> Processing...
                    </span>
                        ) : (
                            'Next'
                        )}
                      </button>
                  ) : (
                      <button
                          type="submit"
                          disabled={isLoading}
                          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                      <span className="animate-spin">⌛</span> Submitting...
                    </span>
                        ) : (
                            'Submit'
                        )}
                      </button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
  );
};

export default IndividualRegistrationForm;
