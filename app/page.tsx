"use client"

import { useState } from "react"
import { StaffProfileForm } from "@/components/staff-profile-form"
import { StaffProfilePreview } from "@/components/staff-profile-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Sparkles } from "lucide-react"

export interface StaffProfile {
  // Profile tab fields
  staffCode: string
  firstName: string
  lastName: string
  gender: string
  birthday: string
  email: string
  phone: string
  workplace: string
  jobPosition: string
  status: string
  role: string
  directManager: string
  academicLevel: string
  hourlyRate: string
  defaultLanguage: string
  direction: string
  emailSignature: string
  otherInformation: string
  twilioPhoneNumber: string
  twilioWhatsAppEnabled: string
  password: string

  // Related Information tab fields
  domicile: string
  maritalStatus: string
  nation: string
  currentAddress: string
  placeOfBirth: string
  religion: string
  citizenIdentification: string
  dateOfIssue: string
  placeOfIssue: string
  resident: boolean
  bankAccountNumber: string
  bankAccountName: string
  bankName: string
  personalTaxCode: string
  epfNo: string
  socialSecurityNo: string
  facebook: string
  linkedin: string
  skype: string
}

export default function Home() {
  const [currentView, setCurrentView] = useState<"form" | "preview">("form")
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null)

  const handleSave = (profile: StaffProfile) => {
    setStaffProfile(profile)
    setCurrentView("preview")
  }

  const handleEdit = () => {
    setCurrentView("form")
  }

  const handleClose = () => {
    setCurrentView("form")
    setStaffProfile(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-orange-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {currentView === "form" ? (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              
              
             
            </div>
            <StaffProfileForm onSave={handleSave} initialData={staffProfile} onClose={handleClose} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={handleEdit}
                  className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white/90 shadow-lg transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Edit
                </Button>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                    Staff Profile Preview
                  </h1>
                 
                </div>
              </div>
            </div>
            <StaffProfilePreview profile={staffProfile!} onEdit={handleEdit} onClose={handleClose} />
          </div>
        )}
      </div>
    </div>
  )
}
