import { FieldError, Input, Label } from "@/src/components/FormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import Router from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { mutate } from "swr";
import { z } from "zod";
import { authService } from "../../services/auth.service";
import { SWR_KEYS } from "../../swr-keys";

export interface ErrorShape {
  error: {
    message: string;
  };
}

const LoginSchema = z.object({
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

type LoginSchema = z.infer<typeof LoginSchema>;

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: LoginSchema) {
    try {
      const resposne = await authService.login(data);
      console.log("Login response:", resposne.data);
      Router.replace("/");
    } catch (e) {
      console.error(e);
      if (isAxiosError<ErrorShape>(e)) {
        if (e.response?.data) toast.error(`${e.response.data.error.message}`);
      }
    }

    mutate(SWR_KEYS.USER);
  }

  return (
    <section className="grid w-64">
      <h2 className="mb-2 text-xl dark:text-white">Log in</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid"
        autoComplete="off"
      >
        <Label htmlFor="username" text="username" />
        <FieldError
          when={Boolean(errors.username)}
          message={errors.username?.message}
        />
        <Input
          id="username"
          label="username"
          register={register}
          className={`my-2 h-7 rounded-sm pl-1 text-black`}
        />
        <Label htmlFor="password" text="password" />
        <FieldError
          when={Boolean(errors.password)}
          message={errors.password?.message}
        />
        <Input
          type="password"
          id="password"
          label="password"
          register={register}
          className={`my-2 h-7 rounded-sm pl-1 text-black`}
        />
        <button
          type="submit"
          className="mt-6 self-stretch rounded-sm border-2 border-gray-800 bg-gray-800 py-1 text-white hover:border-gray-700 hover:bg-gray-700 hover:font-medium active:font-thin"
        >
          Log in
        </button>
      </form>
      <Link
        href="/register"
        className="mt-3 justify-self-center hover:font-medium hover:text-blue-500 dark:hover:text-blue-500"
      >
        Create account
      </Link>
    </section>
  );
}
