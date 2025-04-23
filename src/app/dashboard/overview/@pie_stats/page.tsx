import { PieGraph } from "../components/pie-graph";

export default async function Stats() {
  await delay(1000);
  return <PieGraph />;
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
