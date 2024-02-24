import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { FieldError, Input, Label } from "../components/FormFields";
import { authService } from "../services/auth.service";
import Router from "next/router";

const RegisterSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, {
      message: "Username must contain at least 1 character",
    })
    .max(64, {
      message: "Username cannot exceed 64 characters",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(64, {
      message: "Password cannot exceed 64 characters",
    }),
});

type RegisterSchema = z.infer<typeof RegisterSchema>;

export default function Register(): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterSchema) {
    try {
      const resposne = await authService.register(data);
      console.log("Register response:", resposne.data);
      toast.success("Registerd successfully!");
      Router.replace("/");
    } catch (e) {
      if (isAxiosError(e)) {
        console.error("Failed to register", e.response?.data);
      }
      toast.error("Failed to register");
    }
  }

  return (
    <section className="box-content grid w-64 rounded-md bg-slate-50 p-6 shadow-xl ">
      <h2 className="mb-2 text-xl dark:text-white">Create account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid">
        <Label htmlFor="username" text="username" />
        <FieldError
          when={Boolean(errors.username)}
          message={errors.username?.message}
        />
        <Input
          id="username"
          register={register}
          className={`my-2 h-8 rounded-md border-1 border-neutral-200 pl-1 text-black`}
        />
        <Label htmlFor="password" text="password" />
        <FieldError
          when={Boolean(errors.password)}
          message={errors.password?.message}
        />
        <Input
          type="password"
          id="password"
          register={register}
          className={`my-2 h-8 rounded-md border-1 border-neutral-200 pl-1 text-black`}
        />
        <button
          type="submit"
          className="hover:font-regular mt-6 self-stretch rounded-md border-2 border-gray-800 bg-gray-800 py-1 text-white hover:border-gray-700 hover:bg-gray-700 active:font-thin"
        >
          Register
        </button>
      </form>
      <Link
        href="/login"
        className="mt-3 justify-self-center hover:font-medium hover:text-blue-500 dark:hover:text-blue-500 "
      >
        Already have an account? Log in
      </Link>
    </section>
  );
}

/*
empty outlined button
			<button
					type="submit"
					className="self-stretch py-1 mt-6 rounded-sm border-black border-2 active:bg-gray-800 active:text-white active:font-medium"
				>
					Register
				</button>
*/
