import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCarDto {
  @IsNotEmpty({ message: 'Field name must be added' })
  @IsString()
  readonly name: string;
  
  @IsNotEmpty({ message: 'Field price must be added' })
  @IsInt({message: 'Price must be of type number'})
  @IsPositive()
  readonly price: number;
  
  @IsNotEmpty({ message: 'Field color must be added' })
  @IsString()
  readonly color: string;
}
