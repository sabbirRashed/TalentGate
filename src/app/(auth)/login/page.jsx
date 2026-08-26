import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import LoginForm from "./LoginForm";


export default function LoginPage() {
    return (
        <Suspense
            fallback={
                <div className="flex h-screen items-center justify-center bg-[#09090B]">
                    <Spinner size="lg" color="white" />
                </div>
            }
        >
            <LoginForm />
        </Suspense>
    );
}