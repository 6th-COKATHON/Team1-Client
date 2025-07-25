import { useState, useRef, useEffect } from 'react'

export const useBottomSheet = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)
  const sheetRef = useRef<HTMLDivElement>(null)

  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  //   useEffect(() => {
  //     const handleClickOutside = (e: MouseEvent | PointerEvent) => {
  //       const target = e.target as Node

  //       if (sheetRef.current && sheetRef.current.contains(target)) return
  //       close()
  //     }

  //     if (isOpen) {
  //       document.addEventListener('pointerdown', handleClickOutside)
  //     }

  //     return () => {
  //       document.removeEventListener('pointerdown', handleClickOutside)
  //     }
  //   }, [isOpen])

  return { isOpen, open, close, sheetRef }
}
