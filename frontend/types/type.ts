export interface UserData {
  username: string;
  personal: {
    firstName: string;
    lastName: string;
    company: string;
    position: string;
    phoneContact: string;
    officeContact: string;
    email: string;
  };
  savedCards?: Array<CardData>;
}

export interface CardData {
  id: number;
  firstName: string;
  lastName: string;
  company?: string;
  position?: string;
  email?: string;
  phoneContact?: string;
  officeContact?: string;
  sourceQrHash?: string;
  profileImage?: string;
  createdAt?: string; // ISO string format for LocalDateTime
}
