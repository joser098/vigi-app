import { updateCustomerData } from "@/services/fetchData";
import { getToken } from "@/services/scripts";
import type { Customer } from "@/services/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CustomerInfo = ({ customer }: { customer: Customer }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const fomartForUpdate = {
      name: data.name,
      last_name: data.lastname,
      phone: `${data.cod}-${data.phone}`,
    }

    const token = getToken();
    const res = await updateCustomerData(fomartForUpdate, token);
    //TODO: Show success message
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
    <form className="flex flex-col gap-10" method="PATCH" onSubmit={handleSubmit(onSubmit)}>
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
      <fieldset className="flex justify-center">
        <button className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity max-w-40">
          Actualizar
        </button>
      </fieldset>
    </form>
  );
};

export default CustomerInfo;
