'use client';
import Image from 'next/image';
import { FormFieldType } from '~/components/forms/FormTypes';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@kit/ui/form';
import { Input } from '@kit/ui/input';
import { Control, ControllerRenderProps, FieldValues, Path } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@kit/ui/select';
import { Textarea } from '@kit/ui/textarea';
import { Checkbox } from '@kit/ui/checkbox';
import { E164Number } from 'libphonenumber-js/core';
import EnhancedDatePicker from '~/components/forms/EnhancedDatePicker';

interface CustomProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    fieldType: FormFieldType;
    name: Path<TFieldValues>;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>) => React.ReactNode;
}

interface RenderFieldProps<TFieldValues extends FieldValues> {
    field: ControllerRenderProps<TFieldValues, Path<TFieldValues>>;
    props: CustomProps<TFieldValues>;
}

const RenderField = <TFieldValues extends FieldValues>({
                                                           field,
                                                           props
                                                       }: RenderFieldProps<TFieldValues>) => {
    const {
        fieldType,
        iconSrc,
        iconAlt,
        placeholder,
        control,
        name,
        disabled,
        renderSkeleton,
    } = props;

    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border bg-white">
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            height={24}
                            width={24}
                            alt={iconAlt ?? 'icon'}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            {...field}
                            placeholder={placeholder}
                            className="shad-input border-0"
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry="US"
                        {...field}
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                    />
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <FormField
                    control={control}
                    name={name}
                    render={({ field: dateField }) => (
                        <FormItem className="w-full">
                            <FormControl>
                                <EnhancedDatePicker
                                    value={dateField.value}
                                    onChange={dateField.onChange}
                                    disabled={disabled}
                                    placeholder={placeholder}
                                    className="w-full "
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            );

        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null;

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value as string}
                    >
                        <FormControl>
                            <SelectTrigger className="shad-select-trigger bg-white">
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className="shad-textArea bg-white"
                        disabled={disabled}
                    />
                </FormControl>
            );

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center bg-white gap-2">
                        <Checkbox
                            id={name}
                            checked={field.value as boolean}
                            onCheckedChange={field.onChange}
                            className="text-dark-700"
                        />
                        <label htmlFor={name} className="cursor-pointer">
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );

        default:
            return null;
    }
};

const CustomFormField = <TFieldValues extends FieldValues>(
    props: CustomProps<TFieldValues>
) => {
    const { control, fieldType, name, label } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;