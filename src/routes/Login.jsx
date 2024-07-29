import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { logIn, logOut, reset } from "../redux/slices/cartSlice";


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loginGoogle = async () => {
        // e.preventDefault();
        await signInWithPopup(auth, googleProvider).then(async (result) => {

            // stocker le resulta dans une variable USER
            const user = result.user;

            // Faire une reference 
            const docRef = doc(db, "users", user.uid)
            // Ecrire les données dans la base de données
            const docSnap = await getDoc(docRef)
            // console.log("DOCSNAP--------------------", docSnap)

            // verifier s'il existe 
            if (docSnap.exists()) {
                const userInDb = { ...docSnap.data(), id: docSnap.id }
                dispatch(logIn(userInDb))
                toast.success('Welcom back 👏')
                setTimeout(() => {
                    navigate('/')
                }, 1500)
                return;
            } else {
                const newUser = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    role: 'client'
                };
                dispatch(logIn({ ...newUser, id: user.uid }))
                await setDoc(docRef, newUser)
                toast.success('Welcom here 🤚😀')
                setTimeout(() => {
                    navigate('/')
                }, 1500)
            }

        }).catch((error) => {
            toast.error(error.message);
        })

    };
    async function logoutGoogle() {
        await signOut(auth)
            .then(() => {
                toast.success("Bye");
                dispatch(logOut());
                dispatch(reset())
            })
            .catch((err) => {
                toast.error(err.message);
            });
    }
    return (
        <div className="flex flex-col items-center justify-center h-full gap-10 py-20 ">
            <div className="w-full flex items-center justify-center gap-10 mt-[10vh]  ">
                <div className="text-base w-60 h-12 tracking-wide border-[1px] border-gray-400 rounded-md flex items-center justify-center gap-2 hover:border-blue-600 cursor-pointer duration-300 ">
                    <img
                        className="w-8"
                        src="https://bazar.reactbd.com/static/media/googleLogo.7dbc7ea39eb97007c7f4.png"
                        alt="googleLogo"
                    />
                    <span className="text-sm text-gray-900" onClick={() => loginGoogle()}>
                        Sign in with Google
                    </span>
                </div>
                <button
                    className="px-8 py-3 text-base tracking-wide text-white duration-300 bg-black rounded-md hover:bg-gray-800 "
                    onClick={() => logoutGoogle()}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Login;