import Button from "./Button";

export default function ConfirmModal({
  resourceName,
  onConfirm,
  onClose,
  disabled,
}) {
  return (
    <div className="flex min-h-52 flex-col justify-evenly">
      <p className="text-center">
        Are you sue you want to delete this {resourceName} permanently?
      </p>
      <p className="text-center font-bold">
        If you delete this {resourceName}, it will be deleted forever.
      </p>
      <div className="flex justify-between">
        <Button
          variant="outline"
          className="rounded-full text-sm font-semibold hover:bg-gray-50"
          size="lg"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          variant="fill"
          size="lg"
          className="rounded-lg text-sm font-semibold hover:bg-indigo-950"
          onClick={onConfirm}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
