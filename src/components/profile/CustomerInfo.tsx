import { updateCustomerData } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { Customer } from "@/services/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Loader from "../Icons/Loader";

const CustomerInfo = ({ customer }: { customer: Customer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
  } = useForm();

  const { dirtyFields } = formState;

  const isAnyFieldDirty = Object.values(dirtyFields).some(Boolean);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const fomartForUpdate = {
      name: data.name,
      last_name: data.lastname,
      phone: `${data.cod}-${data.phone}`,
    };

    const token = getToken();
    const res = await updateCustomerData(fomartForUpdate, token);

    if (res.success) {
      const message = document.getElementById("message");
      const btn = document.getElementById("Btn");
      btn?.classList.add("hidden");
      message?.classList.remove("hidden");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const phone = customer.user_data.phone.split("-");

    setValue("name", customer.user_data.name);
    setValue("lastname", customer.user_data.last_name);
    // setValue("username", customer.username);
    setValue("email", customer.email);
    setValue("cod", phone[0]);
    setValue("phone", phone[1]);
    setValue("DNI", customer.user_data.DNI);
  }, []);

  return (
    <form
      className="flex flex-col gap-10"
      method="PATCH"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="border-b-2 border-gray-400">
        <h6 className="mb-2 text-primary text-xl font-bold">
          Datos personales
        </h6>
      </div>
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="name">
            Nombre
          </label>
          <input
            {...register("name")}
            required
            className="border-b-2 border-gray-400 bg-transparent"
            type="text"
            id="name"
            name="name"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="lastname">
            Apellido
          </label>
          <input
            {...register("lastname")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="text"
            id="lastname"
            name="lastname"
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-10">
        {/* <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="username">
            Usuario
          </label>
          <input
            {...register("username")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="username"
            id="username"
            name="username"
          />
        </div> */}
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="email">
            Correo electrónico
          </label>
          <input
            {...register("email")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="email"
            id="email"
            name="email"
            disabled
          />
        </div>
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="DNI">
            DNI
          </label>
          <input
            {...register("DNI")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="tel"
            id="DNI"
            name="DNI"
            disabled
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="phone">
            Teléfono
          </label>
          <div className="flex gap-3">
            <input
              {...register("cod")}
              type="number"
              className="border-b-2 border-gray-400 bg-transparent max-w-14"
            />
            <input
              {...register("phone")}
              className="border-b-2 border-gray-400 bg-transparent w-full"
              type="tel"
              id="phone"
              name="phone"
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="flex justify-center items-center">
        <button
          id="Btn"
          className={`w-full flex justify-center bg-primary border-2 border-primary text-white p-3 rounded-md transition-opacity max-w-40 ${
            !isAnyFieldDirty ? "opacity-65" : "opacity-100 hover:opacity-75"
          }`}
          disabled={!isAnyFieldDirty}
        >
          {isLoading ? <Loader /> : "Actualizar"}
        </button>
        <p
          id="message"
          className="text-center bg-green-300 w-full py-2 rounded-sm hidden"
        >
          Datos actualizados ✅
        </p>
      </fieldset>
    </form>
  );
};

export default CustomerInfo;
