import Loader from "@/components/Loader";
import styled from "styled-components";
import RInput from "@/components/RInput";
import { getCategories } from "@/features/products/productApi";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Item = styled.article`
  border: 1px solid var(--accent-border);
  border-radius: 1em;
  background-color: var(--accent-bg);
  padding: 1em;

  form {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 2em;
    align-items: center;
    text-align: left;

    img {
      width: 5em;
    }

    div {
      min-width: fit-content;
    }
  }
`;

const FirstRow = styled.div`
  width: 50em;
`;

const Description = styled.div`
  width: 100%;
  height: 100%;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5em;
`;

const CancelButton = styled.button`
  background-color: #aa0000;
  border-radius: 0.5em;
  border-width: 1px;
  border-color: var(--border);
  padding: 0.5em 1em;
  font-weight: bold;
`;

const SaveButton = styled.button`
  background-color: green;
  border-radius: 0.5em;
  border-width: 1px;
  border-color: var(--border);
  padding: 0.5em 1em;
  font-weight: bold;
`;

export default function ProductItemEdit({
  product,
  editing = false,
  onEdit,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { ...product },
    resolver: zodResolver(
      z.object({
        image: z
          .url("This is not a valid URL")
          .nonoptional("The Image URL is required!"),
        title: z.string().nonempty("The Title is required!"),
        category: z.string().nonempty("The Category is required!"),
        description: z.string().nonempty("The Description is required!"),
        price: z.coerce
          .number()
          .multipleOf(0.01)
          .nonnegative("The Price can't be negative")
          .nonoptional("The Price is required!"),
      }),
    ),
    disabled: editing,
  });

  return (
    <Item>
      <Loader
        queryKey={["categories"]}
        fetcher={getCategories}
        renderOnSuccess={(categories) => (
          <form onSubmit={handleSubmit((data) => onEdit(data))}>
            <FirstRow>
              <RInput
                type="text"
                label="Image URL"
                error={errors.image}
                {...register("image")}
              />
              <RInput
                type="text"
                label="Title"
                error={errors.title}
                {...register("title")}
              />
              <RInput
                type="select"
                label="Category"
                error={errors.category}
                options={categories.map((category) => {
                  return { value: category, label: category };
                })}
                {...register("category")}
              />
            </FirstRow>
            <Description>
              <RInput
                type="textarea"
                label="Description"
                error={errors.description}
                {...register("description")}
              />
            </Description>
            <div>
              <RInput
                type="number"
                label="Price"
                error={errors.price}
                step={0.01}
                {...register("price")}
              />
            </div>
            <Buttons>
              <SaveButton disabled={editing}>Save</SaveButton>
              <CancelButton onClick={onCancel} disabled={editing}>
                Cancel
              </CancelButton>
            </Buttons>
          </form>
        )}
      />
    </Item>
  );
}
