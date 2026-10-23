import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import searchIcon from "@/assets/search.svg";
import styled from "styled-components";

const SSearchBar = styled.div`
  position: relative;
  width: fit-content;

  > input {
    width: 30em;
    border-radius: 5em;
    padding: 1em;
  }

  > button {
    position: absolute;
    border-radius: 5em;
    background-color: darkblue;
    top: 0;
    right: 0;
    margin: 3px;
    height: 3em;
    width: 3em;

    > img {
      width: 100%;
    }
  }
`;

const Error = styled.p`
  color: red;
  font-size: small;
`;

export default function SearchBar({ onSearch }) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        search: z
          .string()
          .min(3, "Please input at least 3 characters")
          .or(z.literal("")),
      }),
    ),
  });

  function onSubmit(data) {
    onSearch(data.search);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="SearchBar">
      <SSearchBar>
        <input
          type="text"
          placeholder="Input your search"
          {...register("search")}
        />
        <button>
          <img src={searchIcon} alt="" />
        </button>
      </SSearchBar>
      {errors.search && <Error>{errors.search.message}</Error>}
    </form>
  );
}
