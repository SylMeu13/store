import LoadingFrame from "./LoadingFrame";
import ErrorFrame from "./ErrorFrame";
import { useQuery } from "@tanstack/react-query";

export default function Loader({
  queryKey,
  fetcher,
  renderOnSuccess,
  renderOnLoading = () => <LoadingFrame />,
  renderOnError = (error) => <ErrorFrame error={error} />,
}) {
  const { data, status, error } = useQuery({ queryKey, queryFn: fetcher });

  return (
    <>
      {status == "pending" && renderOnLoading()}
      {status == "error" && renderOnError(error)}
      {status == "success" && renderOnSuccess(data)}
    </>
  );
}
