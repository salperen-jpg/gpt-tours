import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  name: string;
  type: string;
  defaultValue?: string;
  labelTitle?: string;
  placeHolder?: string;
};

const FormInput = ({
  name,
  type,
  defaultValue,
  labelTitle,
}: FormInputProps) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className="capitalize text-sm tracking-wide">
        {name || labelTitle}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        required
      />
    </div>
  );
};
export default FormInput;
