import { useForm, type SubmitHandler } from "react-hook-form";
import { navigate } from "astro:transitions/client";
import { login } from "@/services/fetchData";
import { useState } from "react";
import Loader from "../Icons/Loader";
import { setItemsAfterLog } from "@/store/cartStore";
import Eye from "../Icons/Eye";

interface IFormInput {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmitLogin: SubmitHandler<IFormInput> = async (data: any) => {
    setIsLoading(true);
    const response = await login(data);
    if (response.success) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);

      window.localStorage.setItem("check", response.data.token);
      document.cookie = `check=${response.data.token}; expires=${expires.toUTCString()}; path=/`;
      setItemsAfterLog(false);
      navigate("/");
    }
    if (!response.success) {
      setMessage(response.message);
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
          <div className="relative">
            <input
              className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              {...register("password", {
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              })}
            />
            <div className={`absolute top-[10px] right-3 hover:scale-105 transition-transform rounded-full ${showPassword && "opacity-70"}`} onMouseUp={() => setShowPassword(false)} onMouseDown={() => setShowPassword(true)}>
              <Eye color="#1E053F"/>
            </div>
          </div>
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
            {message}
          </span>
        )}
        <div className="flex flex-col justify-center items-center">
          <a
            href="/forgot-password"
            className="text-primary hover:underline block"
          >
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
