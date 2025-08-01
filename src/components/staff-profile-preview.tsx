"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  User,
  Building,
  GraduationCap,
  DollarSign,
  Facebook,
  Linkedin,
  MessageSquare,
  Edit,
  X,
  Calendar,
  Shield,
  Heart,
  Globe,
  CreditCard,
  FileText,
  Sparkles,
  Star,
  Award,
  Briefcase,
} from "lucide-react";
import type { StaffProfile } from "../App";

interface StaffProfilePreviewProps {
  profile: StaffProfile;
  onEdit: () => void;
  onClose: () => void;
}

export function StaffProfilePreview({
  profile,
  onEdit,
  onClose,
}: StaffProfilePreviewProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "full-time":
        return "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg";
      case "working":
        return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg";
      case "intern":
        return "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg";
      case "contract":
        return "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg";
      case "manager":
        return "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg";
      case "employee":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Main Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Summary */}
        <Card className="lg:col-span-1 bg-gradient-to-br from-white via-blue-50 to-purple-50 shadow-2xl border-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
          <CardContent className="p-8 relative z-10">
            <div className="text-center space-y-6">
              <div className="relative">
                <Avatar className="h-32 w-32 mx-auto ring-4 ring-white shadow-2xl">
                  <AvatarImage
                    src={profile?.profileImage || "/placeholder.svg"}
                  />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {(profile?.firstName?.charAt(0) || "") +
                      (profile?.lastName?.charAt(0) || "")}
                  </AvatarFallback>
                </Avatar>

                <div className="absolute -top-2 -right-2 p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg">
                  <Star className="h-4 w-4 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-lg text-gray-600 font-medium mt-1">
                  {profile.jobPosition}
                </p>
                <p className="text-sm text-gray-500">
                  Staff ID: {profile.staffCode}
                </p>
              </div>

              <div className="flex justify-center space-x-3">
                <Badge className={getStatusColor(profile.status)}>
                  {profile.status}
                </Badge>
                <Badge className={getRoleColor(profile.role)}>
                  {profile.role}
                </Badge>
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Contact Information */}
              <div className="space-y-4 text-left">
                {profile.email && (
                  <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg">
                      <Mail className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Email</p>
                      <p className="text-sm font-medium">{profile.email}</p>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg">
                      <Phone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Phone</p>
                      <p className="text-sm font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile.workplace && (
                  <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                      <Building className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Workplace
                      </p>
                      <p className="text-sm font-medium">{profile.workplace}</p>
                    </div>
                  </div>
                )}

                {profile.academicLevel && (
                  <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                    <div className="p-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Education
                      </p>
                      <p className="text-sm font-medium">
                        {profile.academicLevel}
                      </p>
                    </div>
                  </div>
                )}

                {profile.hourlyRate && (
                  <div className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/40">
                    <div className="p-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Hourly Rate
                      </p>
                      <p className="text-sm font-medium">
                        ₹{profile.hourlyRate}/hour
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

              {/* Social Links */}
              <div className="flex justify-center space-x-3">
                {profile.facebook && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm hover:bg-blue-50 border-blue-200"
                  >
                    <Facebook className="h-4 w-4 text-blue-600" />
                  </Button>
                )}
                {profile.linkedin && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm hover:bg-blue-50 border-blue-200"
                  >
                    <Linkedin className="h-4 w-4 text-blue-700" />
                  </Button>
                )}
                {profile.skype && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 backdrop-blur-sm hover:bg-blue-50 border-blue-200"
                  >
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                  </Button>
                )}
              </div>

              {profile.directManager && (
                <>
                  <Separator className="bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-100">
                    <p className="text-sm text-gray-600 mb-3 font-medium">
                      Direct Manager
                    </p>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10 ring-2 ring-white shadow-md">
                        <AvatarFallback className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm">
                          {profile.directManager.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">
                          {profile.directManager}
                        </p>
                        <p className="text-xs text-gray-500">Manager</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <User className="h-5 w-5" />
                </div>
                <span className="text-xl">General Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Staff Code
                    </p>
                    <p className="text-lg font-bold text-blue-800">
                      {profile.staffCode}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Staff Name
                    </p>
                    <p className="text-lg font-bold text-purple-800">
                      {profile.firstName} {profile.lastName}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Gender
                    </p>
                    <p className="text-lg font-bold text-green-800 capitalize">
                      {profile.gender}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Birthday
                    </p>
                    <p className="text-lg font-bold text-orange-800">
                      {profile.birthday}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Phone
                    </p>
                    <p className="text-lg font-bold text-cyan-800">
                      {profile.phone}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Workplace
                    </p>
                    <p className="text-lg font-bold text-indigo-800">
                      {profile.workplace}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Status
                    </p>
                    <Badge
                      className={
                        getStatusColor(profile.status) + " text-sm px-3 py-1"
                      }
                    >
                      {profile.status}
                    </Badge>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <Briefcase className="h-4 w-4" />
                      Job Position
                    </p>
                    <p className="text-lg font-bold text-rose-800">
                      {profile.jobPosition}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Academic Level
                    </p>
                    <p className="text-lg font-bold text-amber-800">
                      {profile.academicLevel}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Hourly Rate
                    </p>
                    <p className="text-lg font-bold text-teal-800">
                      ₹{profile.hourlyRate}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Religion
                    </p>
                    <p className="text-lg font-bold text-violet-800">
                      {profile.religion}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Nation
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {profile.nation}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border border-pink-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Marital Status
                    </p>
                    <p className="text-lg font-bold text-pink-800 capitalize">
                      {profile.maritalStatus}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Information */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <span className="text-xl">Related Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Citizen Identification
                    </p>
                    <p className="text-lg font-bold text-blue-800">
                      {profile.citizenIdentification}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Date of Issue
                    </p>
                    <p className="text-lg font-bold text-green-800">
                      {profile.dateOfIssue}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Place of Birth
                    </p>
                    <p className="text-lg font-bold text-orange-800">
                      {profile.placeOfBirth}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Bank Account Number
                    </p>
                    <p className="text-lg font-bold text-purple-800">
                      {profile.bankAccountNumber}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Bank Account Name
                    </p>
                    <p className="text-lg font-bold text-cyan-800">
                      {profile.bankAccountName}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Bank Name
                    </p>
                    <p className="text-lg font-bold text-rose-800">
                      {profile.bankName}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Personal Tax Code
                    </p>
                    <p className="text-lg font-bold text-amber-800">
                      {profile.personalTaxCode}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      EPF Number
                    </p>
                    <p className="text-lg font-bold text-teal-800">
                      {profile.epfNo}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Social Security Number
                    </p>
                    <p className="text-lg font-bold text-violet-800">
                      {profile.socialSecurityNo}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Facebook
                    </p>
                    <p className="text-lg font-bold text-indigo-800">
                      {profile.facebook}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      LinkedIn
                    </p>
                    <p className="text-lg font-bold text-emerald-800">
                      {profile.linkedin}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-slate-100">
                    <p className="text-sm font-semibold text-gray-600 mb-1">
                      Skype
                    </p>
                    <p className="text-lg font-bold text-slate-800">
                      {profile.skype}
                    </p>
                  </div>
                </div>
              </div>

              {profile.currentAddress && (
                <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl border border-gray-200">
                  <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Current Address
                  </p>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-base text-gray-800 leading-relaxed">
                      {profile.currentAddress}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(profile.emailSignature || profile.otherInformation) && (
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="text-xl">Additional Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                {profile.emailSignature && (
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                    <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Signature
                    </p>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-200">
                      <pre className="text-sm whitespace-pre-wrap text-gray-800 font-mono">
                        {profile.emailSignature}
                      </pre>
                    </div>
                  </div>
                )}

                {profile.otherInformation && (
                  <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                    <p className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Other Information
                    </p>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-purple-200">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        {profile.otherInformation}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4 pt-8">
        <Button
          variant="outline"
          onClick={onClose}
          className="px-8 py-3 h-auto bg-white/80 backdrop-blur-sm hover:bg-white border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <X className="h-4 w-4 mr-2" />
          Close
        </Button>
        <Button
          onClick={onEdit}
          className="px-8 py-3 h-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
