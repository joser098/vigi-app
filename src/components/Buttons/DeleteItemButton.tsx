import { removeItemCart } from "@/store/cartStore";
import Delete from "../Icons/Delete";
import { navigate } from "astro/virtual-modules/transitions-router.js";

const DeleteItemButton = ({ product_id }: { product_id: string }) => {
    const onDeleteClick = async () => {
        const res = await removeItemCart(product_id);
        if(res.success){
            navigate("/cart")
        }
    };

    return (
        <button onClick={onDeleteClick}>
            <Delete/>
        </button>
    )
};

export default DeleteItemButton;