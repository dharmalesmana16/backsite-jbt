import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { FormEventHandler, useState } from "react";

export default function Register() {
    const [isSuccess, setSuccess] = useState(2);
    const [validation, setValidation] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        axios
            .post("/signup", {
                username: data.username,
                password: data.password,
            })
            .then(function (res) {
                console.log(res.data.code);

                if (res.data.code == 0) {
                    setSuccess(0);
                }
                setSuccess(1);
                setValidation(res.data.msg);
                setData("password", "");
                setTimeout(() => {
                    window.location.href = "/signin";
                }, 2000);
            });
        // post('/signup', {
        //     onSuccess: (res) => {
        //         console.log(res)
        //     },
        //     onFinish: () => reset('password'),
        // });
    };

    return (
        <>
            <AuthLayout>
                {isSuccess == 0 ? (
                    <div
                        className=" p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        Gagal Buat Akun, Hubungi Adminstrator
                    </div>
                ) : (
                    isSuccess == 1 && (
                        <div
                            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                            role="alert"
                        >
                            {validation}
                        </div>
                    )
                )}

                <Head title="Register" />

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="username" value="Username" />

                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-end">
                        {/* <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link> */}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Register
                        </PrimaryButton>
                    </div>
                </form>
            </AuthLayout>
        </>
    );
}
