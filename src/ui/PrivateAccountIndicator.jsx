import { GoLock } from "react-icons/go";
import Card from "./Card";
export default function PrivateAccountIndicator({ username }) {
  return (
    <Card>
      <div className="flex items-center justify-center gap-2 p-14 text-xl font-semibold">
        This account is private <GoLock className="h-[40px] w-[40px]" />
      </div>
    </Card>
  );
}
