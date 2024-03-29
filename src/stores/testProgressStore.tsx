import { Answer, User } from '@/types/common/database'
import { create } from 'zustand'

interface TestProgress {
  uuid?: string
  user?: User
  testUuid?: string
  round?: number
  answers?: Answer[]
}

type UseTestProgressStore = {
  testProgress: TestProgress
  resetTestProgress: () => void
  setTestProgress: (progress: TestProgress, replace?: boolean) => void
}

export const useTestProgress = create<UseTestProgressStore>((set) => ({
  testProgress: {},
  resetTestProgress: () => {
    set({})
  },
  setTestProgress: (testProgress: TestProgress, replace?: boolean) =>
    set((state) => {
      return {
        ...state,
        testProgress: {
          ...state.testProgress,
          ...testProgress,
        },
      }
    }, replace),
}))
