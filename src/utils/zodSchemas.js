import { z } from 'zod';

const taskStatusEnum = z.enum(['PENDING', 'COMPLETED']);

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1, 'name is required'),
    email: z.string().trim().email('valid email is required'),
    password: z.string().min(6, 'password must be at least 6 characters')
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email('valid email is required'),
    password: z.string().min(1, 'password is required')
  })
});

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().trim().min(1, 'title is required'),
    description: z.string().trim().optional(),
    status: taskStatusEnum.optional()
  })
});

export const updateTaskSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(1, 'title cannot be empty').optional(),
      description: z.string().trim().optional(),
      status: taskStatusEnum.optional()
    })
    .strict()
});
