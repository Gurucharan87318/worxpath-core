export function getLegacyAuthState() {
  return !!(window as any).__clerk_signed_in__;
}

export const legacyAuth = {
  get isLoggedIn() {
    return !!(window as any).__clerk_signed_in__;
  },
};