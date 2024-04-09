type ProductDetails = CameraDetails | DvrDetails;

export interface Product {
  _id: string;
  thumbnail: string;
  provider: string;
  model: string;
  description: string;
  category: string;
  price: number;
  details: CameraDetails;
  dvr_details: DvrDetails;
  has_promotion: boolean;
  others: string;
  tags: string[];
  favorites: string[];
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

export interface DvrDetails {
  resolution: string;
  resolution_type: string;
  channels: string;
  audio: boolean;
  output_connectors: string[];
  input_connectors: string[];
  supported_operating_systems: string[];
  type: string;
  storage_type: string[];
  storage_capacity: string;
  connection_types: string[];
  recording_modes: string;
  motion_sensor: boolean;
  live_stream: boolean;
  video_compression: string;
  min_temperature: string;
  max_temperature: string;
  max_fps: string;
  control_types: string;
  usb_port: boolean;
  dimensions: Dimensions;
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
  picture_url: string;
  title: string;
  quantity: number;
  unit_price: number;
}

export interface Cart {
  [key: string]: CartItem;
}

export interface CartModel {
  items: CartItem[];
  products_total: number;
  amount_to_pay: number;
}

export interface RegisterIForm {
  name: string;
  last_name: string;
  cod: number;
  phone: number;
  province: string;
  location: string;
  address: string;
  address_number: string;
  department: string;
  zip_code: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  conditions: boolean;
  DNI: string;
}

export interface Customer {
  _id: string;
  username: string;
  email: string;
  password: string;
  profile_image: string;
  user_data: {
    name: string;
    last_name: string;
    phone: string;
    DNI: string;
    address: {
      province: string;
      location: string;
      address_name: string;
      address_number: string;
      department: string;
      zip_code: string;
    };
  };
  conditions_accepted: boolean;
  has_order_active: boolean;
  register_date: string;
  isActive: boolean;
  last_login: string;
  cart_id: string;
}

export interface Province {
  id: string;
  name: string;
  coordinates: {
    lon: number;
    lat: number;
  };
  iso_id: string;
}

// PAYMENT TYPES
export interface Payment {
  _id: string;
  id: number;
  additional_info: AdditionalInfo;
  authorization_code: string;
  card: Card;
  charges_detail: any;
  cuotas: number;
  date_approved: string;
  date_created: string;
  date_last_updated: string;
  description: string;
  fee_details: FeeDetail[];
  marketplace_details: MarketplaceDetails;
  money_details: MoneyDetails;
  operation_type: string;
  order: Order;
  payer: Payer2;
  payment_method: PaymentMethod;
  point_of_interaction: PointOfInteraction;
  refunds: any[];
  status: string;
  status_detail: string;
  transaction_details: TransactionDetails;
  updatedAt: string;
}

export interface AdditionalInfo {
  authentication_code: any;
  available_balance: any;
  ip_address: string;
  items: Item[];
  nsu_processadora: any;
  payer: Payer;
}

export interface Item {
  name: string;
  quantity: string;
  unit_price: string;
}

export interface Payer {
  first_name: string;
}

export interface Card {
  cardholder: Cardholder;
  date_created: string;
  date_last_updated: string;
  expiration_month: number;
  expiration_year: number;
  first_six_digits: string;
  id: any;
  last_four_digits: string;
}

export interface Cardholder {
  identification: Identification;
  name: string;
}

export interface Identification {
  number: string;
  type: string;
}

export interface FeeDetail {
  amount: number;
  fee_payer: string;
  type: string;
}

export interface MarketplaceDetails {
  marketplace_owner: any;
  merchant_account_id: any;
}

export interface MoneyDetails {
  money_release_date: string;
  money_release_status: string;
  money_release_schema: any;
}

export interface Order {
  id: string;
  type: string;
}

export interface Payer2 {
  identification: Identification2;
  entity_type: any;
  phone: Phone;
  last_name: any;
  id: string;
  type: any;
  first_name: any;
  email: string;
}

export interface Identification2 {
  number: string;
  type: string;
}

export interface Phone {
  number: any;
  extension: any;
  area_code: any;
}

export interface PaymentMethod {
  data: Data;
  id: string;
  issuer_id: string;
  type: string;
}

export interface Data {
  routing_data: RoutingData;
}

export interface RoutingData {
  merchant_account_id: string;
}

export interface PointOfInteraction {
  business_info: BusinessInfo;
  transaction_data: TransactionData;
  type: string;
}

export interface BusinessInfo {
  branch: any;
  sub_unit: string;
  unit: string;
}

export interface TransactionData {
  e2e_id: any;
}

export interface TransactionDetails {
  acquirer_reference: any;
  external_resource_url: any;
  financial_institution: any;
  installment_amount: number;
  net_received_amount: number;
  overpaid_amount: number;
  payable_deferral_period: any;
  payment_method_reference_id: any;
  total_paid_amount: number;
}
