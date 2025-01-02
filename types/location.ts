export interface Location {
  address: string;
  count: number;
  groupRequest: {
    _id: string;
    type: "emergency" | "supplies" | "other";
    informantId: string | null;
    description: string;
    title: string;
    contentNeedsRelief: string;
    phone: string;
    // priorityContact: string;
    priorityPhone: string;
    address: string;
    numberOfPeopleNeedingHelp: number;
    images: string[];
    verifierId: string;
    // requiredRescueTime: string; // ISO string
    deletedAt: string | null;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    status: {
      verify: "pending" | "doing" | "closed";
      recipient: "pending" | "doing" | "closed";
      goods: "pending" | "doing" | "closed";
    };
    currentLocation: {
      type: "Point";
      coordinates: [number, number];
    };
    __v: number;
  }[];
}
