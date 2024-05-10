import { removeItemCart } from "@/store/cartStore";
import Delete from "../Icons/Delete";

const DeleteItemButton = ({ product_id }: { product_id: string }) => {
    const onDeleteClick = async () => {
        const res = await removeItemCart(product_id);
        if(res.success){
            window.location.reload(); // change this to a state update
        }
    };

    return (
        <button onClick={onDeleteClick}>
            <Delete/>
        </button>
    )
};

export default DeleteItemButton;