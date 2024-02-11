import { removeItemCart } from "@/store/cartStore";

const DeleteItemButton = ({ cart_id, product_id }: { cart_id: string, product_id: string }) => {
    const onDeleteClick = async () => {
        const res = await removeItemCart(cart_id, product_id);
        if(res.success){
            window.location.reload(); // change this to a state update
        }
    };

    return (
        <button onClick={onDeleteClick} className="bg-gray-200 p-3 rounded hover:opacity-75 transition-opacity w-full">Eliminar</button>
    )
};

export default DeleteItemButton;