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
      className="flex w-full max-w-[400px] flex-col gap-5"
    >
      <fieldset className="w-full flex flex-col">
        <label htmlFor="email">Correo electrónico:</label>
        <input
          className="h-12 w-full rounded-xl border-[1.5px] border-line bg-panel px-4 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:bg-white max-w-96"
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
          className="h-12 w-full rounded-xl border-[1.5px] border-line bg-panel px-4 text-sm text-ink outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:bg-white max-w-96"
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
                return "Los correos no coinciden";
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
        <button className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-[15px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40 my-3 max-w-96">
          {isLoading ? (
            <span className="flex justify-center">
              <Loader />
            </span>
          ) : (
            "Enviar"
          )}
        </button>
        {showToast && (
          <span className="rounded-xl border border-urgency-line bg-urgency-soft px-4 py-2.5 text-center text-sm text-urgency">
            {message}
          </span>
        )}
      </fieldset>
    </form>
  );
};

export default ForgotPasswordForm;
