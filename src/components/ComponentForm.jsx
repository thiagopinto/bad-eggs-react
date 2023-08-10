import {
  TextInput,
  PasswordInput,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  Checkbox,
  NumberInput,
} from "@carbon/react";

export default function ComponentForm({ field, handleChangeField }) {
  switch (field.type) {
    case "password":
      return (
        <PasswordInput
          id={`${field.name}-${field.id}`}
          name={field.name}
          type={field.type}
          labelText={field.labelText}
          helperText={field.helperText}
          invalidText={field.invalidText}
          invalid={field.invalid}
          value={field.value}
          onChange={handleChangeField}
          required={field.required}
        />
      );
    case "select":
      return (
        <Select
          id={`${field.name}-${field.id}`}
          name={field.name}
          type={field.type}
          labelText={field.labelText}
          helperText={field.helperText}
          invalidText={field.invalidText}
          invalid={field.invalid}
          value={field.value}
          onChange={handleChangeField}
          required={field.required}
        >
          <SelectItem value="" text="" />
          {field.options.map((option) => (
            <SelectItem key={option.id} value={option.id} text={option.name} />
          ))}
        </Select>
      );
    case "date":
      return (
        <DatePicker
          id={`${field.name}-${field.id}`}
          datePickerType="single"
          dateFormat="d/m/Y"
          name={field.name}
          invalidText={field.invalidText}
          locale="pt"
          allowInput={true}
          onChange={(value) => {
            handleChangeField({
              target: {
                name: field.name,
                value: value[0],
              },
            });
          }}
          value={field.value}
        >
          <DatePickerInput
            id={`${field.name}-${field.id}`}
            name={field.name}
            labelText={field.labelText}
            helperText={field.helperText}
            invalid={field.invalid}
            required={field.required}
            placeholder="dd/mm/yyyy"
          />
        </DatePicker>
      );
    case "checkbox":
      return (
        <Checkbox
          id={`${field.name}-${field.id}`}
          name={field.name}
          type={field.type}
          labelText={field.labelText}
          helperText={field.helperText}
          invalidText={field.invalidText}
          invalid={field.invalid}
          checked={field.value}
          onChange={handleChangeField}
          required={field.required}
        />
      );
    case "number":
      return (
        <NumberInput
          id={`${field.name}-${field.id}`}
          name={field.name}
          min={0}
          max={100}
          type={field.type}
          value={field.value}
          label={field.labelText}
          helperText={field.helperText}
          invalidText={field.invalidText}
          invalid={field.invalid}
          checked={field.value}
          onChange={(event, { value, direction }) => {
            event.target.name = field.name;
            event.target.value = value;
            event.target.direction = direction;
            handleChangeField(event);
          }}
          required={field.required}
        />
      );

    default:
      return (
        <TextInput
          id={`${field.name}-${field.id}`}
          name={field.name}
          type={field.type}
          labelText={field.labelText}
          helperText={field.helperText}
          invalidText={field.invalidText}
          invalid={field.invalid}
          value={field.value}
          onChange={handleChangeField}
          required={field.required}
        />
      );
  }
}
