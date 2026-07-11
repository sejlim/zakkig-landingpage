import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '../lib/db'

const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
})

type WaitlistResponse =
  | { success: true }
  | { success: false; errorCode: 'EMAIL_ALREADY_EXISTS' | 'DATABASE_ERROR'; error?: string }

export const addToWaitlist = createServerFn({ method: 'POST' })
  .validator((data: unknown) => waitlistSchema.parse(data))
  .handler(async ({ data }): Promise<WaitlistResponse> => {
    const existingLead = db.prepare('SELECT 1 FROM leads WHERE email = ? LIMIT 1').get(data.email)

    if (existingLead) {
      return { success: false, errorCode: 'EMAIL_ALREADY_EXISTS' }
    }

    try {
      const stmt = db.prepare('INSERT INTO leads (email) VALUES (?)')
      stmt.run(data.email)
      return { success: true }
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return { success: false, errorCode: 'EMAIL_ALREADY_EXISTS' }
      }

      return {
        success: false,
        errorCode: 'DATABASE_ERROR',
        error: error instanceof Error ? error.message : 'Database error',
      }
    }
  })