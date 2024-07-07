import fetchWrapper from "@/utils/fetchWrapper";

const fetcher = (url: string) => fetchWrapper(url).then((res) => res.json());
export default fetcher;