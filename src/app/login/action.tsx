'use server';

import { LoginSchema, LoginFormState } from './loginSchema';

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

  // In a real app, you would authenticate the user against your database.
 
  console.log('User login attempt:', validatedFields.data.email);

  // Simulate successful login
  if (validatedFields.data.email === "admin@example.com" && validatedFields.data.password === "password") {
     return {
        message: 'Login successful! Redirecting...',
        success: true,
      };
  }


  // Simulate failed login for other credentials
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
