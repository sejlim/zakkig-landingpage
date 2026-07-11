import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from '../lib/i18n'
import { addToWaitlist } from '../server/waitlist'

export function WaitlistForm() {
  const { t, locale } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'alreadyExists' | 'error'>('idle')
  const [toastError, setToastError] = useState<string | null>(null)
  const [showRedText, setShowRedText] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (toastError) {
      const timer = setTimeout(() => {
        setToastError(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [toastError])

  const form = useForm({
    defaultValues: {
      email: '',
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const emailValue = form.getFieldValue('email')

    // Validation (Only runs on submit)
    if (!emailValue) {
      setToastError(locale === 'en' ? 'Email is required' : 'E-Mail ist erforderlich')
      setShowRedText(true)
      return
    }

    const parse = z.string().email().safeParse(emailValue)
    if (!parse.success) {
      setToastError(locale === 'en' ? 'Invalid email address' : 'Ungültige E-Mail-Adresse')
      setShowRedText(true)
      return
    }

    setStatus('loading')
    try {
      const response = await addToWaitlist({ email: emailValue })
      if (response.success) {
        if (response.alreadyExists) {
          setStatus('alreadyExists')
        } else {
          setStatus('success')
        }
        form.reset()
      } else {
        setStatus('error')
        setToastError(locale === 'en' ? 'An error occurred' : 'Ein Fehler ist aufgetreten')
        setShowRedText(true)
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setToastError(locale === 'en' ? 'An error occurred' : 'Ein Fehler ist aufgetreten')
      setShowRedText(true)
    }
  }

  return (
    <div className="w-full max-w-lg">
      {status === 'success' && (
        <div className="p-4 bg-zinc-900 text-white text-sm rounded-full text-center font-medium animate-fade-in">
          ✓ {t('formSuccess')}
        </div>
      )}
      {status === 'alreadyExists' && (
        <div className="p-4 bg-zinc-900 text-white text-sm rounded-full text-center font-medium animate-fade-in">
          ✓ {t('formAlreadyExists')}
        </div>
      )}
      {status !== 'success' && status !== 'alreadyExists' && (
        <>
          <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-3 w-full">
            <form.Field name="email">
              {(field) => (
                <div className="flex-1 flex flex-col">
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
                      // Reset red text styling and clear toast immediately upon user edit
                      if (showRedText) setShowRedText(false)
                      if (toastError) setToastError(null)
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
                <svg className="animate-spin h-5 w-5 text-black" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
        </>
      )}

      {/* Radical Minimalist Error Toast Portal (fixed top-middle with difference mix-blend) */}
      {isMounted &&
        toastError &&
        createPortal(
          <div className="fixed top-8 left-1/2 z-[9999] pointer-events-none animate-toast-in mix-blend-difference">
            <div className="bg-white text-black px-6 py-4 rounded-full text-sm font-medium flex items-center gap-3 pointer-events-auto">
              <button
                type="button"
                onClick={() => setToastError(null)}
                className="font-bold select-none cursor-pointer hover:opacity-70 active:scale-95 transition-all duration-150"
              >
                ✕
              </button>
              <span>{toastError}</span>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}
