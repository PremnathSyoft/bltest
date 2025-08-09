export type ToastType = 'success' | 'error' | 'info'

type ToastFn = (message: string, type: ToastType) => void

let notifier: ToastFn | null = null

export function setToastNotifier(fn: ToastFn) {
  notifier = fn
}

export function notifyToast(message: string, type: ToastType) {
  if (notifier) {
    notifier(message, type)
  } else if (typeof window !== 'undefined') {
    // Fallback: simple alert if provider not mounted yet (should not happen in normal flow)
    if (type === 'error') {
      alert(message)
    } else {
      console.log(`[toast:${type}]`, message)
    }
  }
}


