import { RecentSales } from "../components/recent-sales";

export default async function Sales() {
  await delay(3000);
  return <RecentSales />;
}
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
