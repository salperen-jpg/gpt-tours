import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
  name: string;
  type: string;
  defaultValue?: string;
  labelTitle?: string;
  placeHolder?: string;
  required?: boolean;
};

const FormInput = ({
  name,
  type,
  defaultValue,
  labelTitle,
  placeHolder,
  required,
}: FormInputProps) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className="capitalize text-sm tracking-wide">
        {labelTitle || name}
      </Label>
      <Input
        type={type}
        name={name}
        id={name}
        placeholder={placeHolder}
        defaultValue={defaultValue}
        required={required}
      />
    </div>
  );
};
export default FormInput;
