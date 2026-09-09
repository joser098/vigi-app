import { useForm, type SubmitHandler } from "react-hook-form";
import { navigate } from "astro:transitions/client";
import { useState } from "react";
import { createGuestCustomer, saveCartData } from "@/services/fetchData";
import { calulateTotals } from "@/services/scripts";
import { leerGuestCart, vaciarGuestCart } from "@/store/guestCart";
import { provinces } from "@/services/const";
import Loader from "../Icons/Loader";

interface IFormInput {
  name: string;
  last_name: string;
  email: string;
  phone: string;
  province: string;
  location: string;
  address_name: string;
  address_number: string;
  department: string;
  zip_code: string;
  DNI: string;
  conditions: boolean;
}

const input =
  "h-12 w-full rounded-xl border-[1.5px] border-line bg-panel px-4 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-primary";

// Los datos mínimos para cobrar y despachar, y nada más. El registro pide 16
// campos —usuario, contraseña, repetir contraseña, DNI— y los pide ANTES de
// dejar ver el carrito. Esto son 9, y se piden con el carrito ya armado, que es
// cuando la persona ya decidió comprar.
const GuestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    // La campaña arranca en CABA, que es donde el envío es gratis: es la
    // provincia que va a elegir casi todo el mundo.
    defaultValues: { province: "Ciudad Autónoma de Buenos Aires" },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setError("");

    const items = leerGuestCart();

    if (items.length === 0) {
      navigate("/cart");
      return;
    }

    setIsLoading(true);

    const res = await createGuestCustomer({
      email: data.email.trim(),
      name: data.name.trim(),
      last_name: data.last_name.trim(),
      phone: data.phone.trim(),
      DNI: data.DNI?.trim() || undefined,
      address: {
        province: data.province,
        location: data.location.trim(),
        address_name: data.address_name.trim(),
        address_number: data.address_number.trim(),
        department: data.department?.trim() ?? "",
        zip_code: data.zip_code.trim(),
      },
      conditions_accepted: true,
    });

    if (!res?.success) {
      setIsLoading(false);
      setError(res?.message ?? "No pudimos guardar tus datos. Probá de nuevo.");
      return;
    }

    const token = res.data.token;
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    window.localStorage.setItem("check", token);
    document.cookie = `check=${token}; expires=${expires.toUTCString()}; path=/`;

    // El carrito del navegador se sube entero: /api/cart/add reemplaza los
    // ítems, no los suma. Si esto falla, la sesión ya existe pero el carrito
    // quedaría vacío en el servidor, así que se avisa en vez de seguir.
    const subido = await saveCartData({ items, ...calulateTotals(items) }, token);

    if (!subido?.success) {
      setIsLoading(false);
      setError("Guardamos tus datos pero no el carrito. Recargá y probá de nuevo.");
      return;
    }

    vaciarGuestCart();
    navigate("/cart");
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            className={input}
            placeholder="Juan"
            {...register("name", { required: "Poné tu nombre" })}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="last_name">Apellido</label>
          <input
            id="last_name"
            className={input}
            placeholder="Pérez"
            {...register("last_name", { required: "Poné tu apellido" })}
          />
          {errors.last_name && (
            <span className="text-xs text-red-500">
              {errors.last_name.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            className={input}
            placeholder="correo@email.com"
            {...register("email", {
              required: "Poné tu correo",
              pattern: { value: /^\S+@\S+$/i, message: "Ese correo no parece válido" },
            })}
          />
          <span className="text-xs text-muted">
            Ahí te mandamos el comprobante y el seguimiento.
          </span>
          {errors.email && (
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="phone">Teléfono</label>
          <input
            id="phone"
            type="tel"
            className={input}
            placeholder="11 2603 9243"
            {...register("phone", { required: "Poné un teléfono de contacto" })}
          />
          <span className="text-xs text-muted">Por si el correo no llega.</span>
          {errors.phone && (
            <span className="text-xs text-red-500">{errors.phone.message}</span>
          )}
        </div>
      </div>

      <hr className="border-line" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="province">Provincia</label>
          <select id="province" className={input} {...register("province", { required: true })}>
            {provinces.map((p: { id: string; name: string }) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="location">Localidad o barrio</label>
          <input
            id="location"
            className={input}
            placeholder="Palermo"
            {...register("location", { required: "Poné la localidad" })}
          />
          {errors.location && (
            <span className="text-xs text-red-500">{errors.location.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="address_name">Calle</label>
          <input
            id="address_name"
            className={input}
            placeholder="Av. Santa Fe"
            {...register("address_name", { required: "Poné la calle" })}
          />
          {errors.address_name && (
            <span className="text-xs text-red-500">
              {errors.address_name.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 sm:col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="address_number">Altura</label>
            <input
              id="address_number"
              className={input}
              placeholder="3200"
              {...register("address_number", { required: "Falta la altura" })}
            />
            {errors.address_number && (
              <span className="text-xs text-red-500">
                {errors.address_number.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="department">
              Depto <span className="text-muted">(opcional)</span>
            </label>
            <input
              id="department"
              className={input}
              placeholder="4B"
              {...register("department")}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="zip_code">Código postal</label>
            <input
              id="zip_code"
              className={input}
              placeholder="C1425"
              {...register("zip_code", { required: "Falta el código postal" })}
            />
            {errors.zip_code && (
              <span className="text-xs text-red-500">
                {errors.zip_code.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 sm:col-span-2">
          <label htmlFor="DNI">
            DNI <span className="text-muted">(opcional, para la factura)</span>
          </label>
          <input id="DNI" className={input} placeholder="30123456" {...register("DNI")} />
        </div>
      </div>

      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          className="mt-1 size-4"
          {...register("conditions", { required: "Hay que aceptar los términos" })}
        />
        <span>
          Acepto los{" "}
          <a href="/legales/terminos" className="font-semibold text-primary hover:underline">
            términos y condiciones
          </a>
          .
        </span>
      </label>
      {errors.conditions && (
        <span className="text-xs text-red-500">{errors.conditions.message}</span>
      )}

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="flex h-14 w-full items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        {isLoading ? <Loader /> : "Continuar al pago"}
      </button>

      <p className="text-center text-[13px] text-muted">
        En el paso siguiente vas a ver el costo de envío y elegís cómo pagar.
      </p>
    </form>
  );
};

export default GuestForm;
