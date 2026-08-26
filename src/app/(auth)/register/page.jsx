import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import RegisterForm from "./RegisterForm";


export default function RegisterPage() {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center bg-[#09090B]">
                    <Spinner size="lg" color="white" />
                </div>
            }
        >
            <RegisterForm />
        </Suspense>
    );
}