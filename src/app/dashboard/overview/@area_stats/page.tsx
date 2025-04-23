import { AreaGraph } from "../components/area-graph";

export default async function AreaStats() {
  await await delay(2000);
  return <AreaGraph />;
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
