import { Button } from "./ui/button";

type PetButton = {
  children: React.ReactNode;
  actionType: "edit" | "chechout" | "add";
};

export function PetButton({ children, actionType }: PetButton) {
  return (
    <Button variant="alt" className="" size="icon">
      {children}
    </Button>
  );
}
