import { FormField } from "../FormField";
import { Button } from "../Button";
import "./NoteForm.css";
import { z } from "zod"
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { createNote } from "../../api/Note";
export interface INoteFormProps { }

const CreateNoteSchema = z.object({
  title: z.string().min(5, "Заголовок должен быть не менее 5 символов"),
  text: z.string().min(10, "Текст должен быть не менее 10 символов").max(300, "Текст должен быть не более 300 символов")
});

type CreateNoteForm = z.infer<typeof CreateNoteSchema>;

export const NoteForm: FC<INoteFormProps> = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateNoteForm>({
    resolver: zodResolver(CreateNoteSchema)
  });

  const createNoteMutation = useMutation({
    mutationFn: (data: { title: string, text: string }) => createNote(data.title, data.text),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      reset();
    }
  }, queryClient);

  return (
    <form className="note-form" onSubmit={handleSubmit((data) => {
      createNoteMutation.mutate({ title: data.title, text: data.text });
    })}>
      <FormField label="Заголовок" errorMessage={errors.title?.message}>
        <input type="text"
          {...register("title")}
        />
      </FormField>
      <FormField label="Текст" errorMessage={errors.text?.message}>
        <textarea
          rows={7}
          {...register("text")}
        />
      </FormField>
      {createNoteMutation.error && <span className="note-form__error">{createNoteMutation.error.message}</span>}
      <Button type="submit" isLoading={createNoteMutation.isPending}>Сохранить</Button>
    </form>
  );
};
