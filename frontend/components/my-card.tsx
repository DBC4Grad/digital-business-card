import { Share2, Smile, FileText, Smartphone, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import tmpProfile from '@/public/icons/tmp-profile.png';
import { useState } from 'react';
import { UserData } from '@/types/type';

export default function MyCard({ userData }: { userData: UserData }) {
  const { username, personal } = userData;
  const [showQRCode, setShowQRCode] = useState(false); // State to toggle QR code visibility

  return (
    <>
      {/* Main Card */}
      <div className="w-[90%] max-w-md bg-white rounded-[30px] h-[700px] shadow-primary-strong shadow-2xl p-14 pt-10 flex flex-col items-center gap-8 mt-4">
        {/* Share Button */}
        <div className="flex justify-end w-full">
          <button
            onClick={() => setShowQRCode((prev) => !prev)} // Toggle QR code visibility
            className="bg-[#6a8d5d] text-white rounded-full p-2 shadow-md hover:shadow-lg transition"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
        {/* QR Code Modal */}
        {showQRCode && personal?.qrHash && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg relative">
              <button
                onClick={() => setShowQRCode(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${personal.qrHash}`}
                alt="QR Code"
                className="img-fluid p-2"
                width={200}
                height={200}
              />
            </div>
          </div>
        )}
        <div className="flex justify-start w-full">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-[#f5e6e6] mb-2 flex justify-center items-center">
            <Image src={tmpProfile} alt="Profile" width={128} height={128} className="object-cover" priority />
          </div>
        </div>
        <div className="w-full space-y-10">
          {/* Name */}
          <div className="flex items-center gap-3">
            <Smile className="w-6 h-6 text-[#6a8d5d]" />
            <span className="text-lg font-bold">{username}</span>
          </div>

          {/* 소속 */}
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-[#6a8d5d]" />
            <span className="font-semibold">
              {personal?.company} / {personal?.position}
            </span>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-[#6a8d5d]" />
            <span className="font-semibold">{personal?.phoneContact}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-[#6a8d5d]" />
            <span className="font-semibold">{personal?.officeContact}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-[#6a8d5d]" />
            <span className="font-semibold">{personal?.email}</span>
          </div>
        </div>
      </div>
    </>
  );
}
