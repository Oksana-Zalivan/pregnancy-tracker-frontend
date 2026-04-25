export default function ConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        <p>Вы уверены?</p>

        <div className="flex gap-2 mt-4">
          <button onClick={onCancel}>Нет</button>
          <button onClick={onConfirm}>Да</button>
        </div>
      </div>
    </div>
  );
}