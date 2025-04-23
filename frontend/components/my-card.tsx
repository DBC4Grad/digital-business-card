import { Smile, FileText, Smartphone, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import tmpProfile from '@/public/icons/tmp-profile.png';
import { UserData } from '@/types/type';

export default function MyCard({ userData }: { userData: UserData }) {
  const { username, personal } = userData;

  return (
    <>
      {/* Main Card */}
      <div className="w-[90%] max-w-md bg-white rounded-[30px] h-[700px] shadow-primary-strong shadow-2xl p-14 pt-20 flex flex-col items-center gap-10 mt-4">
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
