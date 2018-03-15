import { Store } from 'laco'

export const UIStore = new Store(
  {
    showMobileNav: false
  },
  'UI',
)

export const toggleMobileNav = () => UIStore.set({ showMobileNav: !UIStore.get().showMobileNav }, 'Toggle Mobile Nav')
