import { updateCustomerData } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { Customer } from "@/services/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UpdateProfileInfoButton from "../Buttons/UpdateProfileInfoButto";

const CustomerInfo = ({ customer }: { customer: Customer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

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
    setDisabledForm(true);
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
            disabled={disabledForm}
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
            disabled={disabledForm}
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
            className="border-b-2 border-gray-400 bg-transparent opacity-40"
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
            className="border-b-2 border-gray-400 bg-transparent opacity-40"
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
              disabled={disabledForm}

            />
            <input
              {...register("phone")}
              className="border-b-2 border-gray-400 bg-transparent w-full"
              type="tel"
              id="phone"
              name="phone"
              disabled={disabledForm}
            />
          </div>
        </div>
      </fieldset>
      <UpdateProfileInfoButton isAnyFieldDirty={isAnyFieldDirty} isLoading={isLoading} />
    </form>
  );
};

export default CustomerInfo;
