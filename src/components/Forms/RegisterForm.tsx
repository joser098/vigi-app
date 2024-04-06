import { useForm, type SubmitHandler } from "react-hook-form";
import { registerCustomer } from "@/services/fetchData";
import { formatUserRegister } from "@/services/scripts";
import { type Province, type RegisterIForm } from "@/services/types";
import { useState } from "react";
import Loader from "../Icons/Loader";
import { provinces } from "@/services/const"

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    show: false,
    message: "",
    status: ""
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<RegisterIForm>();

  const onSubmitRegister: SubmitHandler<RegisterIForm> = async (data: any) => {
    setIsLoading(true);
    const formatData = formatUserRegister(data);
    const response = await registerCustomer(formatData);
    if(response.success){
      setToastConfig({
        show: true,
        message: `Registro completado con éxito!`,
        status: "success"
      });
      reset();
      setTimeout(() => {
        window.location.href = "/login"
      }, 4000);
    }

    if(!response.success){
      setToastConfig({
        show: true,
        message: response.message,
        status: "error"
      });
    }
    setIsLoading(false);
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
            {...register("province", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          >
            {provinces.map((province: Province) => (
              <option key={province.id} value={province.name}>
                {province.name}
              </option>
            ))}
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
          <input
            type="text"
            placeholder="Caballito"
            className="w-full p-2 border-[.5px] border-black rounded-md"
            {...register("location", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
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
            type="text"
            placeholder="Av Rivadavia"
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
              Numero<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
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
          <div>
            <label htmlFor="DNI">
              DNI<span className="text-xs text-red-500">*</span>
            </label>
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md"
              type="text"
              placeholder="12345678"
              {...register("DNI", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                minLength: {
                  value: 8,
                  message: "DNI debe tener 8 digitos",
                },
                maxLength: {
                  value: 8,
                  message: "DNI debe tener 8 digitos",
                }
              })}
            />
            {errors.DNI && (
              <span className="text-xs text-red-500">{errors.DNI.message}</span>
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
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
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
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d).{6,}$/,
                  message: "La contraseña debe tener al menos 6 caracteres, una letra y un número",
                }
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
                validate: (value) => {
                  if (value !== getValues("password")) {
                    return "Las contraseñas no coinciden";
                  }
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
            {isLoading ? (
            <span className="flex justify-center">
                <Loader />
              </span>
            ) : (
              "Registrar"
            )}
          </button>
          {toastConfig.show && (
            <span className={toastConfig.status == "error" ? "bg-red-200 py-2 px-4 rounded-md text-red-600 text-center" : "bg-green-200 py-3 px-4 rounded-md text-green-600 text-center flex justify-center gap-5"}>
              {toastConfig.message} {toastConfig.status == "error" ? "⚠️" : <Loader/>}
            </span>
          )}
          <a
            href="/login"
            className="text-primary hover:underline block text-center"
          >
            Ya tengo cuenta
          </a>
        </div>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
