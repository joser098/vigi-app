// type ProductDetails = AlarmsDetails | CameraDetails;

export interface Product {
  _id: string;
  thumbnail: string;
  provider: string;
  model: string;
  description: string;
  category: string;
  price: number;
  details: CameraDetails;
  has_promotion: boolean;
  others: string;
  tags: string[];
}

export interface CameraDetails {
  resolution: string; // Full HD, 4K, 8K
  resolution_type: string; // 2MP, 4MP, 8MP
  lens: string;
  audio: string; // monodirectional, bidirectional
  wifi: boolean;
  ip: boolean;
  anlogue: boolean;
  POE: boolean;
  motorized: boolean;
  type: string; // bullet, dome, ptz
  connection_types: string; // cable, winreless
  location: string; // indoor, outdoor
  visual_field: string;
  motion_type: string; // PAN, TILT, ZOOM
  motion_sensor: boolean;
  night_vision: boolean;
  min_temperature: string; // -10 degrees
  max_temperature: string; // 45 degrees
  microfone: boolean;
  max_fps: string;
  control_types: string; // app, nvr, dvr
  usb_port: boolean;
  dimensions: Dimensions;
  conectivity: string; // Lan, Wifi
  video_compression: string;
  power_type: string; // AC, Battery
  mobile_alert: boolean;
  alarm: boolean;
  live_stream: boolean;
  night_range_distance: string;
  storage_type: string; // MicroSD, Cloud, NVR
  storage_capacity: string; // 32GB, 64GB, 128GB
  color_night_vision: boolean;
  accessories: string[]; 
}

interface Dimensions {
    width: string;
    height: string;
    depth: string;
    weight: string;
}

// export interface AlarmsDetails {
//   type: string;
//   power_type: string;
//   conectivity: string;
//   mobile_alert: boolean;
//   alarm: boolean;
//   live_stream: boolean;
//   storage_type: string;
//   storage_capacity: string;
//   color_night_vision: boolean;
//   anti_vandal: boolean; 
//   others: string;
// }

export interface ItemsQuantity {
  id: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export interface Cart {
  [key: string]: CartItem;
}

export interface CartModel {
  cart_id: string;
  products: CartItem[];
  products_total: number;
  amount_to_pay: number;
}