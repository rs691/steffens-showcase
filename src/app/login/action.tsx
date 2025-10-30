'use server';

import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});


export type LoginFormState = {
  message: string;
  errors?: z.ZodIssue[];
  success: boolean;
};

export async function loginUser(
  formData: FormData
): Promise<LoginFormState> {
  
  const data = Object.fromEntries(formData.entries());
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.issues,
      success: false,
    };
  }

  console.log('User login attempt:', validatedFields.data.email);

  if (validatedFields.data.email === "admin@example.com" && validatedFields.data.password === "password") {
     return {
        message: 'Login successful! Redirecting...',
        success: true,
      };
  }


  if (validatedFields.data.email !== "test@example.com" || validatedFields.data.password !== "password123") {
     return {
        message: 'Invalid email or password.',
        success: false,
        errors: [
          { code: 'custom', path: ['email'], message: 'Invalid credentials' },
          { code: 'custom', path: ['password'], message: 'Invalid credentials' }
        ] 
      };
  }
  
  return {
    message: 'Login successful! Redirecting...',
    success: true,
  };
}
