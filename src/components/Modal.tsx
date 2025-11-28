"use client"

// Reusable Modal component
import type React from "react"
import type { ReactNode } from "react"
import { Button } from "./Button"

interface ModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  onSubmit?: () => void
  children: ReactNode
  submitText?: string
  submitDisabled?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  children,
  submitText = "Submit",
  submitDisabled = false,
}) => {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl leading-none">
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer */}
        <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            Cancel
          </button>
          {onSubmit && (
            <Button onClick={onSubmit} disabled={submitDisabled}>
              {submitText}
            </Button>
          )}
        </div>
      </div>
    </>
  )
}
