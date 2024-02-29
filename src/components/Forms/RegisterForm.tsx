import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Loader from "../Icons/Loader";

interface IFormInput {
  name: string;
  last_name: string;
  cod: number;
  phone: number;
  province: string;
  location: string;
  address: string;
  address_number: string;
  zip_code: string;
  email: string;
  password: string;
  confirm_password: string;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmitRegister: SubmitHandler<IFormInput> = async (data: any) => {
    console.log(data);
  };
  return (
    <form
      className="gap-10 bg-white m-auto shadow-xl p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 max-w-[1100px]"
      method="post"
      onSubmit={handleSubmit(onSubmitRegister)}
    >
      <fieldset className="w-full flex flex-col gap-6">
        <h5 className="text-gray-700 text-xl">Mis datos</h5>
        <div className="flex flex-col gap-1 w-full max">
          <label htmlFor="name">
            Nombre<span className="text-xs text-red-500">*</span>
          </label>
          <input
            className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
            name="name"
            type="text"
            placeholder="Juan"
            {...register("name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {errors.name && (
            <span className="text-xs text-red-500">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full max">
          <label htmlFor="last_name">
            Apellido<span className="text-xs text-red-500">*</span>
          </label>
          <input
            className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
            name="last_name"
            type="text"
            placeholder="Perez"
            {...register("last_name", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {errors.last_name && (
            <span className="text-xs text-red-500">
              {errors.last_name.message}
            </span>
          )}
        </div>
        <div className="flex gap-1 w-full max">
          <div className="max-xs">
            <label htmlFor="cod">
              Cod<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              name="cod"
              type="number"
              placeholder="11"
              {...register("cod", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.cod && (
              <span className="text-xs text-red-500">{errors.cod.message}</span>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="phone">
              Telefono<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              name="phone"
              type="number"
              placeholder="12344321"
              {...register("phone", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full max">
          <label htmlFor="password">
            Provincia<span className="text-xs text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border-[.5px] border-black rounded-md"
            name="province"
            {...register("province", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          >
            <option value="CABA">Capital Federal</option>
            <option value="BA">Buenos Aires</option>
          </select>
          {errors.province && (
            <span className="text-xs text-red-500">
              {errors.province.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full max">
          <label htmlFor="city">
            Localidad<span className="text-xs text-red-500">*</span>
          </label>
          <select
            className="w-full p-2 border-[.5px] border-black rounded-md"
            name="location"
            {...register("location", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          >
            <option value="Caballito">Caballito</option>
            <option value="flores">Flores</option>
          </select>
          {errors.location && (
            <span className="text-xs text-red-500">
              {errors.location.message}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-1 w-full max">
          <label htmlFor="address">
            Direccion<span className="text-xs text-red-500">*</span>
          </label>
          <input
            className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
            name="address"
            type="text"
            placeholder="San Martin"
            {...register("address", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          {errors.address && (
            <span className="text-xs text-red-500">
              {errors.address.message}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 w-full max">
          <div>
            <label htmlFor="address_number">
              Altura<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              name="address_number"
              type="number"
              placeholder="1324"
              {...register("address_number", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.address_number && (
              <span className="text-xs text-red-500">
                {errors.address_number.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="department">Departamento</label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              name="department"
              type="text"
              placeholder="8C"
              {...register("department")}
            />
            {errors.department && (
              <span className="text-xs text-red-500">
                {errors.department.message}
              </span>
            )}
          </div>
          <div>
            <label htmlFor="zip_code">
              Codigo postal<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              name="zip_code"
              type="text"
              placeholder="C1723"
              {...register("zip_code", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.zip_code && (
              <span className="text-xs text-red-500">
                {errors.zip_code.message}
              </span>
            )}
          </div>
        </div>
      </fieldset>
      <fieldset className="w-full flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-6">
          <h5 className="text-gray-700 text-xl">Mi cuenta</h5>
          <div className="flex flex-col gap-1 w-full max">
            <label htmlFor="username" id="username">
              Usuario<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              name="username"
              type="text"
              placeholder="usuario123"
              {...register("username", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full max">
            <label htmlFor="email" id="email">
              Correo<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              type="email"
              placeholder="correo@email.com"
              {...register("email", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Correo no válido",
                },
              })}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full max">
            <label htmlFor="password">
              Contraseña<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              type="password"
              placeholder="*******"
              {...register("password", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full max">
            <label htmlFor="check-password">
              Confirmar contraseña
              <span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              type="password"
              placeholder="*******"
              {...register("confirm_password", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            {errors.confirm_password && (
              <span className="text-xs text-red-500">
                {errors.confirm_password.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex justify-center items-center gap-3 text-center">
            <input
              type="checkbox"
              name="conditions"
              {...register("conditions", {
                required: {
                  value: true,
                  message: "Debe aceptar los Términos",
                },
              })}
            />
            <label htmlFor="conditions" className="text-xs block">
              Acepto los
              <a href="/legales/terminos" className="text-primary font-bold">
                Términos y condiciones{" "}
              </a>
              y autorizo el uso de mis datos de acuerdo a la
              <a href="/legales/privacidad" className="text-primary font-bold">
                {" "}
                Declaración de Privacidad
              </a>
              .
            </label>
          </div>
          {errors.conditions && (
            <span className="text-xs text-red-500 block text-center">
              {errors.conditions.message}
            </span>
          )}
          <button className="w-full bg-primary border-2 border-primary text-white h-1o p-2 rounded-md hover:opacity-70 transition-opacity max">
            Registrar
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
