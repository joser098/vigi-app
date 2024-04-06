import type { Customer, Province } from "@/services/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { provinces } from "@/services/const"

const AddressInfo = ({ customer }: { customer: Customer }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("province", customer.user_data.address.province);
    setValue("location", customer.user_data.address.location);
    setValue("address", customer.user_data.address.address_name);
    setValue("address_number", customer.user_data.address.address_number);
    setValue("department",customer.user_data.address.department);
    setValue("zip_code", customer.user_data.address.zip_code);
  }, []);

  return (
    <form
      className="flex flex-col gap-10"
      method="PATCH"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="border-b-2 border-gray-400">
        <h6 className="mb-2 text-primary text-xl font-bold">
          Datos Envio
        </h6>
      </div>
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="province">
            Provincia
          </label>
          <select
            className="border-b-2 border-gray-400 bg-transparent"
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
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="location">
            Localidad
          </label>
          <input
            {...register("location")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="text"
            id="location"
            name="location"
          />
        </div>
      </fieldset>
      <fieldset className="flex flex-col gap-10">
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="address">
            Direccion
          </label>
          <input
            {...register("address")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="address"
            id="address"
            name="address"
          />
        </div>
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="address_number">
            Numero
          </label>
          <input
            {...register("address_number")}
            className="border-b-2 border-gray-400 bg-transparent"
            type="tel"
            id="address_number"
            name="address_number"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="department">
            Departamento
          </label>
            <input
              {...register("department")}
              className="border-b-2 border-gray-400 bg-transparent w-full"
              type="tel"
              id="department"
              name="department"
            />
        </div>
      </fieldset>
      <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label className="text-gray-400 my-1" htmlFor="zip_code">
            Codigo postal
          </label>
            <input
              {...register("zip_code")}
              className="border-b-2 border-gray-400 bg-transparent w-full"
              type="tel"
              id="zip_code"
              name="zip_code"
            />
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

export default AddressInfo;
