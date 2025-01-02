export interface RequestData {
  status: {
    verify: string;
    recipient: string;
    // goods: string;
  };
  currentLocation: Location;
  _id: string;
  type: string;
  informantId: {
    _id: string;
    phone: string;
    name: string;
  } | null;
  wardCode: string;
  description: string;
  title: string;
  contentNeedsRelief: string;
  phone: string;
  senderType: String;
  // priorityContact: string;
  priorityPhone: string;
  address: string;
  numberOfPeopleNeedingHelp: number;
  images: string[];
  verifierId: {
    _id: string;
    phone: string;
    name: string;
  } | null;
  requiredRescueTime: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
