import { decodeSettings } from "@/animation/settings";
import { Review } from "./Review";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ReviewPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const draft = first(params.d);
  const settings = draft ? decodeSettings(draft) : null;
  return <Review settings={settings} draft={Boolean(draft)} />;
}
