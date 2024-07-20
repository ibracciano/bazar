import { useState } from "react";
import {
    GiLoincloth,
    GiPayMoney,
    GiReceiveMoney,
    GiCloudUpload,
} from "react-icons/gi";

import { db, storage } from "../../config/firebase";
import SimpleLoader from "../../components/SimpleLoader";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { BiLoader } from "react-icons/bi";
import { addDoc, collection } from "firebase/firestore";

const AddProduct = () => {
    const [title, setTitle] = useState(""); // => pour le champ title
    const [description, setDescription] = useState(""); // =>  pour le champ description

    const [category, setCategory] = useState(null); // =>  pour le champ category
    const [rating, setRating] = useState(null); // =>  pour le champ rating
    const [isNew, setIsNew] = useState(null); // =>  pour le champ isNew
    const [oldPrice, setOldPrice] = useState(""); // =>  pour le champ oldPrice
    const [price, setPrice] = useState(""); // =>  pour le champ price
    const [isLoading, setIsLoading] = useState(false); // =>  pour afficher un loader lorsqu’on est entrain de stocker une image sur firebase
    const [pending, setPending] = useState(false); // =>  pour afficher un message à l’admin en attendant que le nouveau produit ne soit ajouté sur firestore
    const [imageAsset, setImageAsset] = useState(null); // =>  pour stocker l’URL de l’image après qu’elle ait été stockée sur storage firebase

    function uploadImage(e) {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log(snapshot);
            },
            (error) => {
                toast.error(error);
                setTimeout(() => {
                    setIsLoading(false);
                }, 4000);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageAsset(downloadURL);
                    const nameFile = uploadTask.snapshot.ref.name;
                    toast.success(`${nameFile} added successfully`);
                    setIsLoading(false);
                });
            }
        );
    }
    // Supprimer l'image de puis firestore
    const deleteImage = () => {
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            toast.warning("Image deleted successfully!");
            setImageAsset(null);
            setIsLoading(false);
        });
    };

    // vider le formulaire après l'envoi du formulaire
    const clearData = () => {
        setTitle("");
        setDescription("");
        setCategory("");
        setRating("");
        setIsNew("");
        setOldPrice("");
        setPrice("");
        setImageAsset(null)
    }

    // sauvegarder les informations dans la base de données
    async function saveItem(data) {
        setPending(true);
        const itemsCollectionRef = collection(db, "items");

        try {
            await addDoc(itemsCollectionRef, data);
            toast.success("Item Added Successfully 😊");
            setPending(false);
            clearData();
        } catch (error) {
            setPending(false);
            toast.error(error);
        }
    }


    // soumettre le formulaire
    function handleSubmit(e) {
        e.preventDefault();
        if (
            !title ||
            !description ||
            !category ||
            !rating ||
            !isNew ||
            !oldPrice ||
            !price ||
            !imageAsset
        ) {
            toast.warn("Required fields can't be empty");
        } else {
            const data = {
                title: title,
                description: description,
                category: category,
                rating: rating,
                isNew: isNew === "no" ? false : true,
                oldPrice: oldPrice,
                price: price,
                image: imageAsset,
            }
            saveItem(data);
        }

    }



    return (
        <div className="w-full h-auto mt-[15vh] my-10 flex flex-col items-center justify-center">
            {pending && (
                <div className='flex w-[500px] bg-orange-500 items-center justify-center mb-2 rounded'>
                    <BiLoader className='text-xl text-white' />
                    <span className=' text-white text-center   p-1 text-lg font-[600]  '>
                        Pending ...
                    </span>
                </div>
            )}

            <form className=" w-[500px]  shadow-lg p-10 rounded-xl border border-slate-200 space-y-5"
                onSubmit={handleSubmit}>
                <h1 className="text-center font-[600]  text-2xl ">Add New Item</h1>

                <div className="flex items-center w-full gap-1 border-b border-slate-300">
                    <GiLoincloth className="text-xl" />
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Product's Title"
                        className="p-1 rounded placeholder:text-lg focus:outline-none"
                        type="text"
                    />
                </div>

                <div className="flex items-center gap-1">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        rows={4}
                        className="w-full p-1 border rounded focus:outline-none border-slate-300"
                    ></textarea>
                </div>
                <div className="flex justify-between gap-6">
                    <select
                        className="flex-1 p-2 bg-gray-100 rounded shadow focus:outline-none "
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Category </option>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kids">Kids</option>
                    </select>

                    <select
                        className="flex-1 p-2 bg-gray-100 rounded shadow focus:outline-none"
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value="">Rating </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <select
                        className="flex-1 p-2 bg-gray-100 rounded shadow focus:outline-none"
                        onChange={(e) => setIsNew(e.target.value)}
                    >
                        <option value="">Is New </option>
                        <option value="no">False</option>
                        <option value="yes">True</option>
                    </select>
                </div>

                <div className="flex justify-between gap-10">
                    <div className="flex items-center gap-1 border-b border-slate-300">
                        <GiPayMoney className="text-xl" />
                        <input
                            value={oldPrice}
                            className="w-full focus:outline-none"
                            type="number"
                            placeholder="Old Price"
                            onChange={(e) => setOldPrice(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-1 border-b border-slate-300">
                        <GiReceiveMoney className="text-xl" />
                        <input
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full focus:outline-none"
                            type="number"
                            placeholder="Price"
                        />
                    </div>
                </div>

                {!imageAsset ? ( // Si imageAsset est faux fait ci ou ça //
                    <>
                        <label
                            htmlFor="upFile"
                            className="flex justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-60 bg-gray-50 hover:bg-gray-100 "
                        >
                            <div className="flex flex-col items-center justify-center">
                                {isLoading ? (
                                    <SimpleLoader />
                                ) : (
                                    <>
                                        <GiCloudUpload className="text-4xl" />

                                        <p className="text-base text-gray-500 ">
                                            <span className="font-semibold">
                                                Click here to upload
                                            </span>
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                id="upFile"
                                type="file"
                                className="hidden"
                                onChange={uploadImage}
                            />
                        </label>
                    </>
                ) : (
                    <>
                        <div className="relative w-full h-60 ">
                            <img
                                src={imageAsset}
                                alt="uploaded image"
                                className="object-cover w-full h-full rounded"
                            />
                            <button
                                type="button"
                                className="absolute p-3 text-xl transition-all duration-500 ease-in-out bg-red-500 rounded-full outline-none cursor-pointer bottom-3 right-3 hover:shadow-md "
                                onClick={deleteImage}
                            >
                                <MdDelete className="text-white" />
                            </button>
                        </div>
                    </>
                )}
                <div className="flex justify-end">
                    <input
                        type="submit"
                        value={"Save"}
                        className="px-12 py-2 text-lg font-semibold text-white transition-all duration-300 border-none rounded-lg cursor-pointer bg-emerald-500 hover:bg-emerald-600 "
                    />
                </div>

            </form>
        </div>
    );
};

export default AddProduct
