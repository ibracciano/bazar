import { TbTrashXFilled } from "react-icons/tb";
import Swal from "sweetalert2";

const AllProducts = ({ products, deleteProduct }) => {
    function handleClick(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
            }
        });
    }


    return (
        <div className="relative grid grid-cols-3 gap-4 px-10 py-5 ">
            {products &&
                products.map((product) => (
                    <div
                        key={product.id}
                        className="overflow-hidden border rounded-lg shadow"
                    >
                        <table className="w-full ">
                            <thead>
                                <tr className="text-[13px] uppercase p-1 text-blue-900 ">
                                    <th className="p-2 ">Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th className="p-2">Price</th>
                                    <th>Rating</th>
                                    <th className="p-2">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t-[1.5px] border-blue-900 text-sm  capitalize font-[500]  hover:bg-slate-100 duration-300 transition-all ">
                                    <td className="h-20 w-18">
                                        <img
                                            src={product.image}
                                            className="object-cover w-full h-full"
                                        />
                                    </td>
                                    <td>
                                        <p>{product.title.substring(0, 9)}.</p>
                                    </td>
                                    <td>
                                        <p>{product.category}</p>
                                    </td>
                                    <td>
                                        <p>${product.price}</p>
                                    </td>
                                    <td>
                                        <p>{product.rating}</p>
                                    </td>
                                    <td>
                                        <TbTrashXFilled
                                            onClick={() => handleClick(product.id)}
                                            className="text-2xl text-red-600 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
        </div>
    );
};

export default AllProducts;
