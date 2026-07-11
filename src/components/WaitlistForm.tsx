import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from '../lib/i18n'
import { addToWaitlist } from '../server/waitlist.functions'

export function WaitlistForm() {
  const { t, locale } = useTranslation()
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastTone, setToastTone] = useState<'success' | 'error' | null>(null)
  const [toastPhase, setToastPhase] = useState<'enter' | 'exit' | null>(null)
  const [showRedText, setShowRedText] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const hideToast = () => {
    if (!toastMessage || toastPhase === 'exit') return
    setToastPhase('exit')
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (toastMessage && toastPhase !== 'exit') {
      const timer = setTimeout(() => {
        hideToast()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage, toastPhase])

  useEffect(() => {
    if (toastPhase === 'exit') {
      const timer = setTimeout(() => {
        setToastMessage(null)
        setToastTone(null)
        setToastPhase(null)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [toastPhase])

  const form = useForm({
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const emailValue = form.getFieldValue('email')
    const normalizedEmail = emailValue.trim().toLowerCase()

    // Validation (Only runs on submit)
    if (!normalizedEmail) {
      setToastTone('error')
      setToastMessage(
        locale === 'en' ? 'Email is required' : 'E-Mail ist erforderlich',
      )
      setToastPhase('enter')
      setShowRedText(true)
      return
    }

    const parse = z.string().email().safeParse(normalizedEmail)
    if (!parse.success) {
      setToastTone('error')
      setToastMessage(
        locale === 'en' ? 'Invalid email address' : 'Ungültige E-Mail-Adresse',
      )
      setToastPhase('enter')
      setShowRedText(true)
      return
    }

    setStatus('loading')
    try {
      const response = await addToWaitlist({ data: { email: normalizedEmail } })
      if (response.success) {
        setStatus('success')
        setToastTone('success')
        setToastMessage(t('formSuccess'))
        setToastPhase('enter')
        form.reset()
      } else {
        setStatus('error')
        setToastTone('error')
        setToastMessage(
          response.errorCode === 'EMAIL_ALREADY_EXISTS'
            ? t('formDuplicateError')
            : t('formError'),
        )
        setToastPhase('enter')
        setShowRedText(true)
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setToastTone('error')
      setToastMessage(t('formError'))
      setToastPhase('enter')
      setShowRedText(true)
    }
  }

  return (
    <div className="w-full max-w-lg">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col sm:flex-row gap-3 w-full"
      >
        <form.Field name="email">
          {(field) => (
            <div className="w-full sm:w-80 sm:flex-none flex flex-col">
              <label htmlFor={field.name} className="sr-only">
                {t('formPlaceholder')}
              </label>
              <input
                id={field.name}
                type="email"
                placeholder={t('formPlaceholder')}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value)
                  // Reset red text styling and dismiss the toast smoothly upon user edit
                  if (showRedText) setShowRedText(false)
                  if (toastMessage) {
                    hideToast()
                  }
                }}
                disabled={status === 'loading'}
                className={`w-full px-8 py-4 bg-white/10 placeholder-zinc-500 rounded-full text-base focus:outline-none focus:bg-white/15 transition-colors duration-200 ${
                  showRedText ? 'text-red-500' : 'text-white'
                }`}
                required
              />
            </div>
          )}
        </form.Field>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-8 py-4 bg-white text-black hover:bg-zinc-200 active:scale-98 transition-all duration-200 rounded-full text-base font-semibold cursor-pointer whitespace-nowrap self-stretch sm:self-auto flex justify-center items-center"
        >
          {status === 'loading' ? (
            <svg
              className="animate-spin h-5 w-5 text-black"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            t('formButton')
          )}
        </button>
      </form>
      <p className="mt-4 text-xs text-zinc-500 font-light text-left leading-normal px-4">
        {locale === 'en' ? (
          <>
            By joining the waitlist, you agree to our{' '}
            <a
              href="https://zakkig.de/en/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-normal"
            >
              Privacy Policy
            </a>
            .
          </>
        ) : (
          <>
            Mit dem Beitreten zur Warteliste stimmst du unserer{' '}
            <a
              href="https://zakkig.de/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline font-normal"
            >
              Datenschutzerklärung
            </a>{' '}
            zu.
          </>
        )}
      </p>

      {/* Radical Minimalist Toast Portal (fixed top-middle) */}
      {isMounted &&
        toastMessage &&
        createPortal(
          <div
            className={`fixed top-6 left-1/2 z-[9999] w-fit max-w-[94vw] pointer-events-none ${
              toastPhase === 'exit' ? 'animate-toast-out' : 'animate-toast-in'
            }`}
          >
            <div
              className={`inline-flex items-center gap-3 sm:gap-4 pointer-events-auto shadow-2xl px-4 sm:px-6 py-3 sm:py-4 rounded-[1.5rem] text-xs sm:text-base font-medium ${
                toastTone === 'error'
                  ? 'bg-red-600 text-white border border-red-700'
                  : 'bg-white text-black'
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  hideToast()
                }}
                className="shrink-0 font-bold select-none cursor-pointer hover:opacity-70 active:scale-95 transition-all duration-150"
              >
                ✕
              </button>
              <span className="shrink-0 whitespace-nowrap leading-tight">
                {toastMessage}
              </span>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
