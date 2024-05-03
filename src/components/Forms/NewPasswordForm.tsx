import { useForm, type SubmitHandler } from "react-hook-form";
import Loader from "../Icons/Loader";
import { useState } from "react";
import type { IFormNewPass } from "@/services/types";
import { newPassword } from "@/services/fetchData";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const NewPasswordForm = ({ hash }: { hash: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IFormNewPass>({ disabled: disableForm });

  const onSubmit: SubmitHandler<IFormNewPass> = async (data: any) => {
    setIsLoading(true);

    const response: any = await newPassword(hash, data);

    setIsLoading(false);
    setMessage(response.message);
    setShowToast(true);

    if(response.success){
      reset();
      setDisableForm(true);
      setTimeout(() => {
        navigate("/login");
      }, 8000)
    }
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[400px] flex flex-col gap-5 bg-gray-100 px-12 py-8 shadow rounded"
    >
      <fieldset className="w-full flex flex-col">
        <label htmlFor="password">Nueva contraseña:</label>
        <input
          className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
          id="password"
          placeholder="**********"
          type="password"
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
        <span>
          {errors.password && (
            <span className="text-xs text-red-500">{errors.password.message}</span>
          )}
        </span>
      </fieldset>
      <fieldset className="w-full flex flex-col">
        <label htmlFor="password_confirm">Confirmar nueva contraseña:</label>
        <input
          className="w-full h-10 p-3 border-[.5px] border-black rounded-md max-w-96"
          id="password_confirm"
          placeholder="**********"
          type="password"
          {...register("password_confirm", {
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
        {errors.password_confirm && (
          <span className="text-xs text-red-500">
            {errors.password_confirm.message}
          </span>
        )}
      </fieldset>
      <fieldset className="flex flex-col">
        <button disabled={disableForm} className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3 max-w-96">
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

export default NewPasswordForm;
