export default function ConfirmModal({ show, onConfirm, onCancel }) {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <p>Delete this task?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}
