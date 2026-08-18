import { type Cart, type CartItem, type RegisterIForm } from "@/services/types";
import { SHIPPING_CUTOFF_HOUR } from "@/services/const";

export const formatItems = (items: Cart) => {
  const arr = Object.entries(items);
  let itemsArr = [];

  for (let i = 0; i < arr.length; i++) {
    itemsArr.push(arr[i][1]);
  }

  return itemsArr;
};

export const calulateTotals = (products: CartItem[]) => {
  let products_total = 0;
  let amount_to_pay = 0;

  products.map((p) => {
    const totalAmount = p.quantity * p.unit_price;
    products_total += p.quantity;
    amount_to_pay += totalAmount;
  });

  return {
    products_total,
    amount_to_pay,
  };
};

export const formatStoreItems = (items: CartItem[]) => {
  if (!Array.isArray(items)) return {};

  let itemsObj: Cart = {};

  for (let i of items) {
    itemsObj[i.id] = i;
  }

  return itemsObj;
};

export const formatUserRegister = (data: RegisterIForm) => {
  const {
    name,
    last_name,
    cod,
    phone,
    province,
    location,
    address,
    address_number,
    department,
    zip_code,
    username,
    email,
    password,
    conditions,
    DNI
  } = data;

  const dataFormated = {
    username,
    email,
    password,
    name,
    last_name,
    phone: `${cod}-${phone}`,
    address: {
      province,
      location,
      address_name: address,
      address_number,
      department,
      zip_code,
    },
    conditions_accepted: conditions,
    DNI
  };

  return dataFormated;
};

export const getToken = (): string => {
  const token = window.localStorage.getItem("check");

  if(token != null){
    return token
  }

  return 'null'
};


// La API devuelve timestamps ISO. Esto cortaba el string asumiendo
// "17/12/2024, 15:10:30", el formato es-AR que el backend armaba a mano.
export const formatDate = (date: string) => {
  if (!date) return "";

  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return "";

  const allMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  return `${parsed.getDate()} de ${allMonths[parsed.getMonth()]} ${parsed.getFullYear()}`;
}

export const getTime = () => {
  const date = new Date();
  
  //Get Day
  const weekDays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  const day = date.getDay();

  //Get Time
  const time_arg = date.toLocaleTimeString("es-AR", { timeZone: "America/Argentina/Buenos_Aires", hour12: false});
  const time = parseInt(time_arg.slice(0, 2));

  //Get Month
  const allMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const month = date.getMonth();

  const obj = {
    day: day,
    dayName: weekDays[day],
    month: month,
    monthName: allMonths[month],
    hour: time,
    minute: parseInt(time_arg.slice(3, 5)),
  }

  return obj;
}

export const calculateShipmentArrives = (date: any): string => {
  if(date.hour < 0) return "";

  return date.hour < SHIPPING_CUTOFF_HOUR
    ? "Llega hoy (CABA)"
    : "Llega mañana (CABA)";
};