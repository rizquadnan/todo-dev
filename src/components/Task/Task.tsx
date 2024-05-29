import clsx from "clsx";
import { useForm } from "react-hook-form";
import { RxCheck, RxCross2, RxPencil2, RxPlus, RxTrash } from "react-icons/rx";
import { match } from "ts-pattern";
import { Form, Props } from "./Task.model";

export const Task = (props: Props) => {
  const form = useForm<Form>();

  return (
    <div
      className={clsx(
        "group transition-all border border-neutral rounded px-4 py-2 h-[49px] flex gap-2 items-center",
        {
          "hover:border-primary": props.variant === "notDone",
          "opacity-40": props.variant === "done",
        }
      )}
    >
      <button
        className={clsx("border w-4 h-4 rounded-full", {
          "bg-white": props.variant === "done",
        })}
        onClick={props.onClickToggle}
      />

      {props.variant === "inEdit" ? (
        <form
          onSubmit={form.handleSubmit((v) => props.onSubmitEdit?.(v.newValue))}
          className="flex gap-2"
        >
          <label hidden htmlFor="editTaskTitle">
            Title
          </label>
          <input
            className="input input-sm input-bordered border w-full"
            id="editTaskTitle"
            defaultValue={props.title}
            {...form.register("newValue", {
              required: true,
            })}
          />
          <button type="submit" className="hover:text-primary">
            <RxCheck />
          </button>
        </form>
      ) : (
        <span
          className={clsx({
            "line-through": props.variant === "done",
          })}
        >
          {props.title}
        </span>
      )}

      <div
        className={clsx("ml-auto flex items-center gap-2 opacity-0", {
          "group-hover:opacity-100": props.variant === "notDone",
          "opacity-100": props.variant === "inEdit",
        })}
      >
        <button className="hover:text-primary" onClick={props.onClickDelete}>
          <RxTrash />
        </button>

        {props.hasAddBtn && (
          <button className="hover:text-primary" onClick={props.onClickAdd}>
            <RxPlus />
          </button>
        )}

        {match(props.variant)
          .with("inEdit", () => (
            <button
              className="hover:text-primary"
              onClick={props.onClickCancelEdit}
            >
              <RxCross2 />
            </button>
          ))
          .otherwise(() => (
            <button
              className="hover:text-primary"
              onClick={props.onClickTriggerEdit}
            >
              <RxPencil2 />
            </button>
          ))}
      </div>
    </div>
  );
};