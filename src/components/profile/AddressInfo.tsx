import type { Customer, Province } from "@/services/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { provinces } from "@/services/const"
import UpdateProfileInfoButton from "../Buttons/UpdateProfileInfoButto";
import { getToken } from "@/services/scripts";
import { updateCustomerData } from "@/services/fetchData";

const AddressInfo = ({ customer }: { customer: Customer }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabledForm, setDisabledForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    // formState: { errors },
    formState,
  } = useForm({ disabled: disabledForm });

  const { dirtyFields } = formState;

  const isAnyFieldDirty = Object.values(dirtyFields).some(Boolean);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const formatForUpdate = {
      address : {
        province: data.province,
        location: data.location,
        address_name: data.address,
        address_number: data.address_number,
        department: data.department,
        zip_code: data.zip_code,
      }
    }

    const token = getToken();
    const res = await updateCustomerData(formatForUpdate, token);

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
    const { address } = customer.user_data
    setValue("province", address.province);
    setValue("location", address.location);
    setValue("address", address.address_name);
    setValue("address_number", address.address_number);
    setValue("department",address.department);
    setValue("zip_code", address.zip_code);
  }, []);

  return (
    <form
      className="flex flex-col gap-10"
      method="PATCH"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="border-b-2 border-gray-400">
        <h6 className="mb-2 text-primary text-xl font-bold">
          Datos Envío
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
            Dirección
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
      <UpdateProfileInfoButton isAnyFieldDirty={isAnyFieldDirty} isLoading={isLoading} />
    </form>
  );
};

export default AddressInfo;
