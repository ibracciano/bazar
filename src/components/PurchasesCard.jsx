const PurchasesCard = ({ purchases }) => {
    // console.log(purchases);
    return (
        <div className='mx-auto w-[1000px] mt-[15vh]
   my-20'>
            {purchases && (
                <div className='w-full'>
                    <table className='w-full border rounded-xl'>
                        <thead>
                            <tr className='border-b-2 border-slate-500 '>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Items Purchased</th>
                                <th>Total Amount</th>
                                <th>Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases &&
                                purchases.map((purchase) => (
                                    <tr key={purchase.id} className='text-center border '>
                                        <td className='capitalize font-[600] text-md'>
                                            {purchase.buyer.name}
                                        </td>
                                        <td>{purchase.buyer.email}</td>
                                        <td>
                                            {purchase.products.map((product) => (
                                                <div
                                                    key={product.id}
                                                    className='flex items-center gap-1 my-2 '
                                                >
                                                    <p className='w-10 h-10 '>
                                                        <img
                                                            className='object-cover w-full h-full '
                                                            src={product.image}
                                                            alt=''
                                                        />
                                                    </p>
                                                    <p>{product.title}</p>
                                                </div>
                                            ))}
                                        </td>

                                        <td>
                                            <p className='font-[600]'>
                                                $
                                                {Math.round(
                                                    purchase.products.reduce(
                                                        (accumulator, currentValue) =>
                                                            accumulator +
                                                            currentValue.price * currentValue.quantity,
                                                        0
                                                    )
                                                )}
                                            </p>
                                        </td>
                                        <td>
                                            {purchase.timestamp.toDate().toLocaleDateString("fr")}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PurchasesCard;
