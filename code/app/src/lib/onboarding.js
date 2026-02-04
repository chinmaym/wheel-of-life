const ONBOARDING_KEY = 'wol_onboarding_complete'

export function isOnboardingComplete() {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === 'true'
  } catch {
    return false
  }
}

export function completeOnboarding() {
  localStorage.setItem(ONBOARDING_KEY, 'true')
}
