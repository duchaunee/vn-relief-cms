export interface Location {
  name: string;
  count: number;
  coordinates: {
    lat: number;
    lng: number;
  };
  groupRequest: [
    {
      id: string;
      name: string;
      status: string;
      address: string;
      description: string;
      imageUrl?: string;
    }
  ];
}
