import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class IsPostiveDecimalConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args?: ValidationArguments): boolean {
    return parseFloat(value) > 0;
  }
  defaultMessage?(args?: ValidationArguments): string {
    return `${args.property} is not a positive decimal`;
  }
}

export function IsPositiveDecimal(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPostiveDecimalConstraint,
    });
  };
}
