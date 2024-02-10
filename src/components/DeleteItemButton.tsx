import { deleteItem } from "@/services/fetchData";

const DeleteItemButton = ({ id, product_id }: { id: string, product_id: string }) => {
    const onDeleteClick = async () => {
        const res = await deleteItem(id, product_id);
        if(res.success){
            window.location.reload(); // change this to a state update
        }
    };

    return (
        <button onClick={onDeleteClick} className="bg-gray-200 p-3 rounded hover:opacity-75 transition-opacity w-full">Eliminar</button>
    )
};

export default DeleteItemButton;