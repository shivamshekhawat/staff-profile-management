"use client"

import type React from "react"

import { useState , useRef} from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Building } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import {
  Eye,
  EyeOff,
  CalendarIcon,
  X,
  Upload,
  RefreshCw,
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface StaffProfile {
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
profileImage?: string 
}

interface StaffProfileFormProps {
  onSave: (profile: StaffProfile) => void
  initialData?: StaffProfile | null
  onClose: () => void
}

export function StaffProfileForm({ onSave, initialData, onClose }: StaffProfileFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  
  


const fileInputRef = useRef<HTMLInputElement>(null);

  const [birthdayDate, setBirthdayDate] = useState<Date>()
  const [issueDate, setIssueDate] = useState<Date>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(initialData?.profileImage || null)
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState<StaffProfile>({
    staffCode: initialData?.staffCode || "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    gender: initialData?.gender || "",
    birthday: initialData?.birthday || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    workplace: initialData?.workplace || "",
    jobPosition: initialData?.jobPosition || "",
    status: initialData?.status || "",
    role: initialData?.role || "",
    directManager: initialData?.directManager || "",
    academicLevel: initialData?.academicLevel || "",
    hourlyRate: initialData?.hourlyRate || "",
    defaultLanguage: initialData?.defaultLanguage || "",
    direction: initialData?.direction || "",
    emailSignature: initialData?.emailSignature || "",
    otherInformation: initialData?.otherInformation || "",
    twilioPhoneNumber: initialData?.twilioPhoneNumber || "",
    twilioWhatsAppEnabled: initialData?.twilioWhatsAppEnabled || "",
    password: initialData?.password || "",
    domicile: initialData?.domicile || "",
    maritalStatus: initialData?.maritalStatus || "",
    nation: initialData?.nation || "India",
    currentAddress: initialData?.currentAddress || "",
    placeOfBirth: initialData?.placeOfBirth || "",
    religion: initialData?.religion || "",
    citizenIdentification: initialData?.citizenIdentification || "",
    dateOfIssue: initialData?.dateOfIssue || "",
    placeOfIssue: initialData?.placeOfIssue || "",
    resident: initialData?.resident || false,
    bankAccountNumber: initialData?.bankAccountNumber || "",
    bankAccountName: initialData?.bankAccountName || "",
    bankName: initialData?.bankName || "",
    personalTaxCode: initialData?.personalTaxCode || "",
    epfNo: initialData?.epfNo || "",
    socialSecurityNo: initialData?.socialSecurityNo || "",
    facebook: initialData?.facebook || "",
    linkedin: initialData?.linkedin || "",
    skype: initialData?.skype || "",
    profileImage: initialData?.profileImage || "",
  })


  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    // Required fields validation
    if (!formData.staffCode.trim()) newErrors.staffCode = "Staff code is required"
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.password.trim()) newErrors.password = "Password is required"

    // Email format validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};
const handleInputChange = (field: string, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 2MB",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Convert file to base64 for preview
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setProfileImage(result)
        handleInputChange("profileImage", result)

        toast({
          title: "Image uploaded successfully",
          description: "Profile picture has been updated",
        })
      }
      reader.readAsDataURL(file)
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setProfileImage(null)
    handleInputChange("profileImage", "")
    toast({
      title: "Image removed",
      description: "Profile picture has been removed",
    })
  }

  const handleSave = async () => {
    if (validateForm()) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Include profile image in form data
      const finalFormData = {
        ...formData,
        profileImage: profileImage || "",
      }

      onSave(finalFormData)
      setIsSubmitting(false)

      toast({
        title: "Profile saved successfully",
        description: "Staff profile has been created/updated",
      })
    }
  }

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"
    let password = ""
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    handleInputChange("password", password)

    toast({
      title: "Password generated",
      description: "A secure password has been generated",
    })
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl bg-white/80 backdrop-blur-sm border-white/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10 flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Staff Profile Creation
              </CardTitle>
              <p className="text-blue-100 mt-1">
                Build comprehensive employee profiles
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-8 p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-50 to-purple-50 p-1 rounded-xl">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <User className="h-4 w-4 mr-2" />
              Profile Information
            </TabsTrigger>
            <TabsTrigger
              value="related"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-300"
            >
              <Shield className="h-4 w-4 mr-2" />
              Related Information
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-8 mt-8">
            <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              {/* Avatar with preview */}
              <div className="relative group">
                <Avatar className="h-32 w-32 ring-4 ring-white shadow-2xl transition-transform duration-300 group-hover:scale-105">
                  <AvatarImage
                    src={
                      avatarPreview || "/placeholder.svg?height=128&width=128"
                    }
                  />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {formData.firstName.charAt(0)}
                    {formData.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200"
                >
                  <Camera className="h-4 w-4 text-white" />
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              {/* Upload Button */}
              <div className="text-center space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Profile Photo
                </Button>
                <p className="text-sm text-gray-500">
                  Recommended: 400x400px, max 2MB
                </p>
              </div>

              {/* Two Factor Authentication */}
              <div className="flex items-center space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                <Checkbox
                  id="twoFactor"
                  className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-600 data-[state=checked]:to-purple-600"
                />
                <Label
                  htmlFor="twoFactor"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Shield className="h-4 w-4 text-blue-600" />
                  Enable Email Two Factor Authentication
                </Label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="staffCode"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 px-2 py-1"
                  >
                    Required
                  </Badge>
                  Staff Code
                </Label>
                <div className="relative">
                  <Input
                    id="staffCode"
                    value={formData.staffCode}
                    onChange={(e) =>
                      handleInputChange("staffCode", e.target.value)
                    }
                    className={cn(
                      "pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
                      errors.staffCode
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : ""
                    )}
                    placeholder="Enter staff code"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {formData.staffCode && !errors.staffCode && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.staffCode && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.staffCode}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 px-2 py-1"
                  >
                    Required
                  </Badge>
                  First Name
                </Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={cn(
                      "pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
                      errors.firstName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : ""
                    )}
                    placeholder="Enter first name"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {formData.firstName && !errors.firstName && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.firstName && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.firstName}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 px-2 py-1"
                  >
                    Required
                  </Badge>
                  Last Name
                </Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={cn(
                      "pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
                      errors.lastName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : ""
                    )}
                    placeholder="Enter last name"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {formData.lastName && !errors.lastName && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.lastName && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.lastName}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="gender"
                  className="text-sm font-semibold text-gray-700"
                >
                  Gender
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Birthday
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white",
                        !birthdayDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      {birthdayDate
                        ? format(birthdayDate, "PPP")
                        : "Select birthday"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm">
                    <Calendar
                      mode="single"
                      selected={birthdayDate}
                      onSelect={(date) => {
                        setBirthdayDate(date);
                        handleInputChange(
                          "birthday",
                          date ? format(date, "PPP") : ""
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 px-2 py-1"
                  >
                    Required
                  </Badge>
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={cn(
                      "pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : ""
                    )}
                    placeholder="Enter email address"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  {formData.email && !errors.email && (
                    <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-500" />
                  )}
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="phone"
                  className="text-sm font-semibold text-gray-700"
                >
                  Phone Number
                </Label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter phone number"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="workplace"
                  className="text-sm font-semibold text-gray-700"
                >
                  Workplace
                </Label>
                <Select
                  value={formData.workplace}
                  onValueChange={(value) =>
                    handleInputChange("workplace", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select workplace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bengaluru">
                      🏢 Bengaluru Office
                    </SelectItem>
                    <SelectItem value="mumbai">🏢 Mumbai Office</SelectItem>
                    <SelectItem value="delhi">🏢 Delhi Office</SelectItem>
                    <SelectItem value="chennai">🏢 Chennai Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="jobPosition"
                  className="text-sm font-semibold text-gray-700"
                >
                  Job Position
                </Label>
                <div className="relative">
                  <Input
                    id="jobPosition"
                    value={formData.jobPosition}
                    onChange={(e) =>
                      handleInputChange("jobPosition", e.target.value)
                    }
                    className="pl-10 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter job position"
                  />
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="status"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 px-2 py-1"
                  >
                    Required
                  </Badge>
                  Employment Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">✅ Full-time</SelectItem>
                    <SelectItem value="working">💼 Working</SelectItem>
                    <SelectItem value="intern">🎓 Intern</SelectItem>
                    <SelectItem value="contract">📝 Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="role"
                  className="text-sm font-semibold text-gray-700"
                >
                  Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">👤 Employee</SelectItem>
                    <SelectItem value="manager">👨‍💼 Manager</SelectItem>
                    <SelectItem value="admin">⚡ Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="directManager"
                  className="text-sm font-semibold text-gray-700"
                >
                  Direct Manager
                </Label>
                <Select
                  value={formData.directManager}
                  onValueChange={(value) =>
                    handleInputChange("directManager", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">👨‍💼 John Doe</SelectItem>
                    <SelectItem value="jane-smith">👩‍💼 Jane Smith</SelectItem>
                    <SelectItem value="mike-johnson">
                      👨‍💼 Mike Johnson
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="academicLevel"
                  className="text-sm font-semibold text-gray-700"
                >
                  Academic Level
                </Label>
                <Select
                  value={formData.academicLevel}
                  onValueChange={(value) =>
                    handleInputChange("academicLevel", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select academic level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bsc">🎓 B.Sc</SelectItem>
                    <SelectItem value="msc">🎓 M.Sc</SelectItem>
                    <SelectItem value="btech">🎓 B.Tech</SelectItem>
                    <SelectItem value="mtech">🎓 M.Tech</SelectItem>
                    <SelectItem value="mba">🎓 MBA</SelectItem>
                    <SelectItem value="phd">🎓 PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="hourlyRate"
                  className="text-sm font-semibold text-gray-700"
                >
                  Hourly Rate
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    ₹
                  </span>
                  <Input
                    id="hourlyRate"
                    type="number"
                    className="pl-8 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      handleInputChange("hourlyRate", e.target.value)
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="defaultLanguage"
                  className="text-sm font-semibold text-gray-700"
                >
                  Default Language
                </Label>
                <Select
                  value={formData.defaultLanguage}
                  onValueChange={(value) =>
                    handleInputChange("defaultLanguage", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">🇺🇸 English</SelectItem>
                    <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
                    <SelectItem value="tamil">🇮🇳 Tamil</SelectItem>
                    <SelectItem value="bengali">🇮🇳 Bengali</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="direction"
                  className="text-sm font-semibold text-gray-700"
                >
                  Text Direction
                </Label>
                <Select
                  value={formData.direction}
                  onValueChange={(value) =>
                    handleInputChange("direction", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ltr">← Left to Right</SelectItem>
                    <SelectItem value="rtl">→ Right to Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="emailSignature"
                  className="text-sm font-semibold text-gray-700"
                >
                  Email Signature
                </Label>
                <Textarea
                  id="emailSignature"
                  rows={4}
                  value={formData.emailSignature}
                  onChange={(e) =>
                    handleInputChange("emailSignature", e.target.value)
                  }
                  className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Enter email signature..."
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="otherInformation"
                  className="text-sm font-semibold text-gray-700"
                >
                  Other Information
                </Label>
                <Textarea
                  id="otherInformation"
                  rows={4}
                  value={formData.otherInformation}
                  onChange={(e) =>
                    handleInputChange("otherInformation", e.target.value)
                  }
                  className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                  placeholder="Enter additional information..."
                />
              </div>
            </div>

            {/* Twilio Fields */}
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-600" />
                Twilio Integration
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="twilioPhoneNumber"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Twilio Phone Number
                  </Label>
                  <Input
                    id="twilioPhoneNumber"
                    value={formData.twilioPhoneNumber}
                    onChange={(e) =>
                      handleInputChange("twilioPhoneNumber", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="Enter Twilio phone number"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="twilioWhatsAppEnabled"
                    className="text-sm font-semibold text-gray-700"
                  >
                    WhatsApp Integration
                  </Label>
                  <Select
                    value={formData.twilioWhatsAppEnabled}
                    onValueChange={(value) =>
                      handleInputChange("twilioWhatsAppEnabled", value)
                    }
                  >
                    <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-purple-500">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">
                        ✅ Yes, Enable WhatsApp
                      </SelectItem>
                      <SelectItem value="no">
                        ❌ No, Disable WhatsApp
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Security Settings
              </h3>
              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                >
                  <Badge
                    variant="secondary"
                    className="bg-red-100 text-red-700 px-2 py-1"
                  >
                    Required
                  </Badge>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className={cn(
                      "pr-24 h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200",
                      errors.password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : ""
                    )}
                    placeholder="Enter secure password"
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={generatePassword}
                      className="h-8 w-8 p-0 hover:bg-red-100"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    {errors.password}
                  </div>
                )}
                <p className="text-sm text-gray-500 bg-white/60 p-3 rounded-lg">
                  💡 <strong>Note:</strong> If you populate this field, the
                  password will be changed for this member.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related" className="space-y-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="domicile"
                  className="text-sm font-semibold text-gray-700"
                >
                  Domicile
                </Label>
                <Input
                  id="domicile"
                  value={formData.domicile}
                  onChange={(e) =>
                    handleInputChange("domicile", e.target.value)
                  }
                  className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter domicile"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="maritalStatus"
                  className="text-sm font-semibold text-gray-700"
                >
                  Marital Status
                </Label>
                <Select
                  value={formData.maritalStatus}
                  onValueChange={(value) =>
                    handleInputChange("maritalStatus", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">💍 Single</SelectItem>
                    <SelectItem value="married">💑 Married</SelectItem>
                    <SelectItem value="divorced">💔 Divorced</SelectItem>
                    <SelectItem value="widowed">🖤 Widowed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="nation"
                  className="text-sm font-semibold text-gray-700"
                >
                  Nation
                </Label>
                <Input
                  id="nation"
                  value={formData.nation}
                  onChange={(e) => handleInputChange("nation", e.target.value)}
                  className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter nation"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="placeOfBirth"
                  className="text-sm font-semibold text-gray-700"
                >
                  Place of Birth
                </Label>
                <Input
                  id="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={(e) =>
                    handleInputChange("placeOfBirth", e.target.value)
                  }
                  className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter place of birth"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="religion"
                  className="text-sm font-semibold text-gray-700"
                >
                  Religion
                </Label>
                <Input
                  id="religion"
                  value={formData.religion}
                  onChange={(e) =>
                    handleInputChange("religion", e.target.value)
                  }
                  className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter religion"
                />
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="citizenIdentification"
                  className="text-sm font-semibold text-gray-700"
                >
                  Citizen Identification
                </Label>
                <Select
                  value={formData.citizenIdentification}
                  onValueChange={(value) =>
                    handleInputChange("citizenIdentification", value)
                  }
                >
                  <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aadhar">🆔 Aadhar Card</SelectItem>
                    <SelectItem value="pan">🆔 PAN Card</SelectItem>
                    <SelectItem value="passport">📘 Passport</SelectItem>
                    <SelectItem value="driving-license">
                      🚗 Driving License
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-semibold text-gray-700">
                  Date of Issue
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full h-12 justify-start text-left font-normal bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white",
                        !issueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-3 h-4 w-4" />
                      {issueDate
                        ? format(issueDate, "PPP")
                        : "Select issue date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/95 backdrop-blur-sm">
                    <Calendar
                      mode="single"
                      selected={issueDate}
                      onSelect={(date) => {
                        setIssueDate(date);
                        handleInputChange(
                          "dateOfIssue",
                          date ? format(date, "PPP") : ""
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="placeOfIssue"
                  className="text-sm font-semibold text-gray-700"
                >
                  Place of Issue
                </Label>
                <Input
                  id="placeOfIssue"
                  value={formData.placeOfIssue}
                  onChange={(e) =>
                    handleInputChange("placeOfIssue", e.target.value)
                  }
                  className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                  placeholder="Enter place of issue"
                />
              </div>
            </div>

            {/* Current Address */}
            <div className="space-y-3">
              <Label
                htmlFor="currentAddress"
                className="text-sm font-semibold text-gray-700"
              >
                Current Address
              </Label>
              <Textarea
                id="currentAddress"
                rows={3}
                value={formData.currentAddress}
                onChange={(e) =>
                  handleInputChange("currentAddress", e.target.value)
                }
                className="bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none"
                placeholder="Enter complete current address..."
              />
            </div>

            {/* Resident Checkbox */}
            <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
              <Checkbox
                id="resident"
                checked={formData.resident}
                onCheckedChange={(checked) =>
                  handleInputChange("resident", checked as boolean)
                }
                className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-green-600 data-[state=checked]:to-blue-600"
              />
              <Label htmlFor="resident" className="text-sm font-medium">
                🏠 Permanent Resident
              </Label>
            </div>

            {/* Banking Information */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Building className="h-5 w-5 text-green-600" />
                Banking Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="bankAccountNumber"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Bank Account Number
                  </Label>
                  <Input
                    id="bankAccountNumber"
                    type="number"
                    value={formData.bankAccountNumber}
                    onChange={(e) =>
                      handleInputChange("bankAccountNumber", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Enter account number"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="bankAccountName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Bank Account Name
                  </Label>
                  <Input
                    id="bankAccountName"
                    value={formData.bankAccountName}
                    onChange={(e) =>
                      handleInputChange("bankAccountName", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Enter account holder name"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label
                    htmlFor="bankName"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Bank Name
                  </Label>
                  <Input
                    id="bankName"
                    value={formData.bankName}
                    onChange={(e) =>
                      handleInputChange("bankName", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all duration-200"
                    placeholder="Enter bank name"
                  />
                </div>
              </div>
            </div>

            {/* Tax & Social Security */}
            <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-600" />
                Tax & Social Security
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="personalTaxCode"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Personal Tax Code
                  </Label>
                  <Input
                    id="personalTaxCode"
                    value={formData.personalTaxCode}
                    onChange={(e) =>
                      handleInputChange("personalTaxCode", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    placeholder="Enter tax code"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="epfNo"
                    className="text-sm font-semibold text-gray-700"
                  >
                    EPF Number
                  </Label>
                  <Input
                    id="epfNo"
                    value={formData.epfNo}
                    onChange={(e) => handleInputChange("epfNo", e.target.value)}
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    placeholder="Enter EPF number"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label
                    htmlFor="socialSecurityNo"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Social Security Number
                  </Label>
                  <Input
                    id="socialSecurityNo"
                    value={formData.socialSecurityNo}
                    onChange={(e) =>
                      handleInputChange("socialSecurityNo", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
                    placeholder="Enter social security number"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                Social Media & Communication
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label
                    htmlFor="facebook"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Facebook Profile
                  </Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) =>
                      handleInputChange("facebook", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="https://facebook.com/username"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="linkedin"
                    className="text-sm font-semibold text-gray-700"
                  >
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) =>
                      handleInputChange("linkedin", e.target.value)
                    }
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <Label
                    htmlFor="skype"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Skype ID
                  </Label>
                  <Input
                    id="skype"
                    value={formData.skype}
                    onChange={(e) => handleInputChange("skype", e.target.value)}
                    className="h-12 bg-white/80 backdrop-blur-sm border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                    placeholder="Enter Skype username"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="px-8 py-3 h-auto bg-white hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-8 py-3 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Saving Profile...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
