import { Answer } from '@/types/common/database'
import { create } from 'zustand'

interface TestProgress {
  uuid?: string
  userUuid?: string
  testUuid?: string
  round?: number
  answers?: Answer[]
}

type UseTestProgressStore = {
  testProgress: TestProgress
  setTestProgress: (progress: TestProgress, replace?: boolean) => void
}

export const useTestProgress = create<UseTestProgressStore>((set) => ({
  testProgress: {},
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
