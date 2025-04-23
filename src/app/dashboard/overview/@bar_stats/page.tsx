import { BarGraph } from "../components/bar-graph";

export default async function BarStats() {
  await await delay(1000);

  return <BarGraph />;
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
