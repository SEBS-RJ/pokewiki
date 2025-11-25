import { useState } from "react";

export function useMultiStepForm(totalSteps) {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
  };

  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;
  const progress = Math.round((currentStep / totalSteps) * 100);

  return {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    isFirstStep,
    isLastStep,
    progress,
  };
}
