import { useState } from "react";
import { useMultiStepForm } from "../hooks/useMultiStepForm";
import FormProgress from "./FormProgress";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";

export default function FormMultiStep() {
  const { currentStep, totalSteps, nextStep, prevStep, resetForm, progress } =
    useMultiStepForm(3);

  const [formData, setFormData] = useState({
    nombreEntrenador: "",
    apodo: "",
    correo: "",
    regionFavorita: "",
    tipoFavorito: "",
    pokemonFavorito: "",
    objetivo: "",
  });

  const handleConfirm = () => {
    setFormData({
      nombreEntrenador: "",
      apodo: "",
      correo: "",
      regionFavorita: "",
      tipoFavorito: "",
      pokemonFavorito: "",
      objetivo: "",
    });
    resetForm();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormStep1
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <FormStep2
            formData={formData}
            setFormData={setFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <FormStep3
            formData={formData}
            onPrev={prevStep}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <FormProgress
        currentStep={currentStep}
        totalSteps={totalSteps}
        progress={progress}
      />
      {renderStep()}
    </div>
  );
}
