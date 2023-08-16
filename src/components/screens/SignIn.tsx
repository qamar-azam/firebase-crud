import { useState } from "react"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from "~/lib/firebase";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const auth = useAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                if (user) {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log(error)
                setErrorMsg(error.code)
            });
    }
    return (
        <div className="max-w-[500px] mx-auto">
            <h1 className="text-2xl text-bold text-center text-slate-100 mb-8">Sign In</h1>
            {errorMsg && <p className="text-red-500 mb-4">{errorMsg}</p>}
            <form className="flex flex-col" onSubmit={handleSubmit} >
                <input type="email" className="mb-4 p-2 rounded" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className="mb-4 p-2 rounded" value={password} placeholder="Password" autoComplete="on" onChange={(e) => setPassword(e.target.value)} />

                <button type="submit" className="btn btn-primary normal-case">Submit</button>
            </form>
        </div>
    )

}

export default SignIn