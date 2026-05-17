import { InputField } from './InputField';
import { SelectField } from './SelectField';
import { TextareaField } from './TextareaField';
import { ReadonlyField } from './ReadOnlyField';

export const fieldRegistry: Record<string, any> = {
	input: InputField,
	select: SelectField,
	textarea: TextareaField,
	readonly: ReadonlyField,
};
