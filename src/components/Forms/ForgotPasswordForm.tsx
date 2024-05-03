import { useForm, type SubmitHandler } from "react-hook-form";
import Loader from "../Icons/Loader";
import { useState } from "react";
import type { IFormForgotPass } from "@/services/types";
import { forgotPassword } from "@/services/fetchData";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IFormForgotPass>();

  const onSubmit: SubmitHandler<IFormForgotPass> = async (data: any) => {
    setIsLoading(true);
    const response: any = await forgotPassword(data);

    console.log(response)
    reset();
    setMessage(response.message);
    setShowToast(true);
    setIsLoading(false);
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[400px] flex flex-col gap-5 bg-gray-100 px-12 py-8 shadow rounded"
    >
      <fieldset className="w-full flex flex-col">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
          id="email"
          placeholder="correo@email.com"
          type="email"
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
            <span className="text-xs text-red-500">{errors.email.message}</span>
          )}
        </span>
      </fieldset>
      <fieldset className="w-full flex flex-col">
        <label htmlFor="email_confirm">Confirmar correo electrónico:</label>
        <input
          className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
          id="email_confirm"
          placeholder="correo@email.com"
          type="email"
          {...register("email_confirm", {
            required: {
              value: true,
              message: "Este campo es requerido",
            },
            validate: (value) => {
              if (value !== getValues("email")) {
                return "Las contraseñas no coinciden";
              }
            },
          })}
        />
        {errors.email_confirm && (
          <span className="text-xs text-red-500">
            {errors.email_confirm.message}
          </span>
        )}
      </fieldset>
      <fieldset className="flex flex-col">
        <button className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3 max-w-96">
          {isLoading ? (
            <span className="flex justify-center">
              <Loader />
            </span>
          ) : (
            "Enviar"
          )}
        </button>
        {showToast && (
          <span className="py-2 px-4 rounded-md text-center border-2 text-sm border-yellow-400 bg-yellow-200">
            {message}
          </span>
        )}
      </fieldset>
    </form>
  );
};

export default ForgotPasswordForm;
