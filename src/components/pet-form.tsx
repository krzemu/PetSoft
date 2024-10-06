import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { usePetContext } from "@/lib/hooks";
import PetFormButton from "./pet-form-button";

type PetInput = {
  label: string;
  id: string;
  type?: "input" | "textarea";
  required?: boolean;
  defaultValue?: string | number;
};
type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission?: () => void;
};
export default function PetForm({ actionType, onFormSubmission }: PetFormProps) {
  const { selectedPet, handleAddPet, handleEditPet } = usePetContext();

  return (
    <form
      action={async (formData) => {
        const petData = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl:
            (formData.get("imageUrl") as string) ||
            "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };

        onFormSubmission?.();
        if (actionType === "add") {
          await handleAddPet(petData);
        } else if (actionType === "edit") {
          await handleEditPet(selectedPet!.id, petData);
        }
      }}
      className="flex flex-col items-end space-y-3">
      <PetInput
        label="Name"
        id="name"
        required
        defaultValue={actionType === "edit" ? selectedPet?.name : ""}
      />
      <PetInput
        label="Owner Name"
        id="ownerName"
        required
        defaultValue={actionType === "edit" ? selectedPet?.ownerName : ""}
      />
      <PetInput
        label="Image Url"
        id="imageUrl"
        defaultValue={actionType === "edit" ? selectedPet?.imageUrl : ""}
      />
      <PetInput
        label="Age"
        id="age"
        required
        defaultValue={actionType === "edit" ? selectedPet?.age : ""}
      />
      <PetInput
        label="Notes"
        id="notes"
        type="textarea"
        required
        defaultValue={actionType === "edit" ? selectedPet?.notes : ""}
      />
      <PetFormButton actionType={actionType} />
    </form>
  );
}

function PetInput({ label, id, type = "input", required = false, defaultValue }: PetInput) {
  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={id}>{label}</Label>
      {type === "input" ? (
        <Input type="text" id={id} name={id} required={required} defaultValue={defaultValue} />
      ) : (
        <Textarea id={id} name={id} rows={3} required={required} defaultValue={defaultValue} />
      )}
    </div>
  );
}
