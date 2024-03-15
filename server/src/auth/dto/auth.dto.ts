import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'Password should be between 3 to 20 characters' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: 'First Name should be between 1 to 20 characters' })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 20, { message: 'Last Name should be between 1 to 20 characters' })
  lastname: string;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 20, { message: 'Password should be between 3 to 20 characters' })
  password: string;
}
