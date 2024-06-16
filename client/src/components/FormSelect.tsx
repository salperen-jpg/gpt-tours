import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

type FormSelectType = {
  name: string;
  labelTitle?: string;
  options: string[];
  defaultValue?: string;
};

const FormSelect = ({
  name,
  labelTitle,
  options,
  defaultValue,
}: FormSelectType) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name} className="capitalize text-sm tracking-wide">
        {labelTitle || name}
      </Label>
      <Select name={name} defaultValue={defaultValue ?? options[0]}>
        <SelectTrigger id={name}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((o) => {
              return (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FormSelect;
