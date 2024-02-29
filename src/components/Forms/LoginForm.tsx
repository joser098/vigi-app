import { useForm, type SubmitHandler } from "react-hook-form";
import { login } from "@/services/fetchData";
import { useState } from "react";
import Loader from "../Icons/Loader";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmitLogin: SubmitHandler<IFormInput> = async (data: any) => {
    setIsLoading(true);
    const response = await login(data);
    if (response.success) {
      window.localStorage.setItem("check", response.data.token);
      window.location.href = "/profile";
    }
    if (!response.success) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
    setIsLoading(false);
  };

  return (
    <form
      className="flex flex-col justify-center gap-5 items-center"
      method="post"
      onSubmit={handleSubmit(onSubmitLogin)}
    >
      <h5 className="text-gray-600 text-xl">Ingresar a mi cuenta</h5>
      <fieldset className="w-full flex flex-col items-center gap-6">
        <div className="flex flex-col gap-1 w-full max-w-96">
          <label htmlFor="email" id="email">
            Correo<span className="text-xs text-red-500">*</span>
          </label>
          <input
            className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
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
          <span>
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </span>
        </div>
        <div className="flex flex-col gap-1 w-full max-w-96">
          <label htmlFor="password">
            Contraseña<span className="text-xs text-red-500">*</span>
          </label>
          <input
            className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
            type="password"
            placeholder="*******"
            {...register("password", {
              required: {
                value: true,
                message: "Este campo es requerido",
              },
            })}
          />
          <span>
            {errors.password && (
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </span>
        </div>
        <button className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3 max-w-96">
          {isLoading ? (
            <span className="flex justify-center">
              <Loader />
            </span>
          ) : (
            "Iniciar sesión"
          )}
        </button>
        {showToast && (
          <span className=" bg-red-200 py-1 px-4 rounded-md text-red-600">
            Correo o contraseña son invalidos
          </span>
        )}
        <div className="flex flex-col justify-center items-center">
          <a href="#" className="text-primary hover:underline block">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="/register" className="text-primary hover:underline">
            Registrarme
          </a>
        </div>
      </fieldset>
    </form>
  );
};

export default LoginForm;
