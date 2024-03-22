import { useSearchFriend } from "../../contexts/FriendsSearchContext";

export default function SearchBox() {
  const { search, onSearch } = useSearchFriend();
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">
        Search for user by his username!
      </h1>
      <input
        value={search}
        onChange={onSearch}
        className="w-full max-w-[30rem] rounded-md bg-gray-200 px-2 py-2 text-lg dark:text-black"
      />
    </div>
  );
}
