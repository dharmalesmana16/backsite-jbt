import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import axios from "axios";
import { readSync } from "fs";
import { FormEventHandler, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const [isSuccess, setSuccess] = useState(2);
    const [validation, setValidation] = useState("");
    const [isLoading, setLoading] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/login", {
                username: data.username,
                password: data.password,
            })
            .then(function (res) {
                // console.log(res.data.token_id.tokenable_id);
                if (res.data.code == 0) {
                    setSuccess(0);
                }
                setSuccess(1);
                setValidation(res.data.msg);
                console.log(res.data);
                // localStorage.setItem("token", res.data.token_id.tokenable_id);
                // localStorage.setItem("username", res.data.username);
                setData("password", "");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            })
            .catch(function (error) {
                console.log(error);
                // setSuccess(0);
                // setValidation(res.response.data.msg);
                // setLoading(false);
            });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {isSuccess == 1 ? (
                <div
                    className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                >
                    {validation}
                </div>
            ) : (
                isSuccess == 0 && (
                    <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                    >
                        {validation}
                    </div>
                )
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="username" value="Username" />

                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData("username", e.target.value)}
                    />

                    <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    "remember",
                                    (e.target.checked || false) as false
                                )
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route("password.request")}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {isLoading == false ? (
                            "Login"
                        ) : (
                            <FaSpinner
                                className="fa-spin animate-spin"
                                size={15}
                                color="white"
                            />
                        )}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
