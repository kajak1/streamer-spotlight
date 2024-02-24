import { Input, Label } from "../FormFields";
import { FieldError } from "../FormFields/FieldError";
import { useStreamerForm } from "./use-streamer-form";

export interface StreamerFormProps {
  onSubmit?: () => void;
}

export function StreamerForm(props: StreamerFormProps): JSX.Element {
  const {
    handleSubmit,
    register,
    trigger,
    formState: { errors },
  } = useStreamerForm(props);

  return (
    <aside className="grid w-[22rem] self-start rounded-md bg-white px-9 pb-7 pt-12">
      <h3 className="mb-6 text-xl">Add your own!</h3>
      <form
        onSubmit={handleSubmit}
        className="grid dark:bg-gray-800 dark:text-gray-200"
      >
        <div className="mb-6 grid gap-2">
          <Label htmlFor="name" text="Name" />
          <FieldError
            when={Boolean(errors.name)}
            message={errors.name?.message}
          />
          <Input
            register={register}
            id="name"
            className="h-8 rounded-md border-1 border-neutral-200 pl-1 text-black"
            // className="inline-block h-7 rounded-md border-2 border-gray-200 p-2 text-black dark:border-gray-600  dark:bg-gray-700 dark:text-gray-200"
          />
        </div>
        <div className="mb-6 grid gap-2">
          <Label htmlFor="platform" text="Platform" />
          <FieldError
            when={Boolean(errors.platform)}
            message={errors.platform?.message}
          />
          <select
            id="platform"
            className="h-8 rounded-md pl-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            {...register("platform")}
          >
            <option value="Twitch">Twitch</option>
            <option value="Kick">Kick</option>
            <option value="YouTube">YouTube</option>
            <option value="TikTok">TikTok</option>
            <option value="Rumble">Rumble</option>
          </select>
        </div>
        <div className="mb-6 grid gap-2">
          <Label htmlFor="Description" text="Description" />
          <FieldError
            when={Boolean(errors.description)}
            message={errors.description?.message}
          />
          <textarea
            id="Description"
            className="max-h-32 min-h-fit py-1 scroll-thin rounded-md border-1 border-gray-200 px-2 text-black dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
            {...register("description")}
          />
        </div>

        <button
          onClick={() => trigger()}
          className="hover:font-regular b-2 mt-4 h-12 rounded-md border-2 border-gray-800 bg-gray-800 px-3 py-1 text-sm font-semibold tracking-wider text-white hover:border-gray-700 hover:bg-gray-700 active:font-thin"
          // className="b-2 mt-4 w-full rounded-md border-gray-300 bg-gray-200 px-3 py-1 hover:bg-gray-300 dark:bg-blue-800 dark:hover:bg-blue-900"
        >
          SUBMIT
        </button>
      </form>
    </aside>
  );
}
